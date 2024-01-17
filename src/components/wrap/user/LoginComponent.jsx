import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { ConfirmContext } from '../context/ConfirmContext';
import { GlobalContext } from '../context/GlobalContext';
import {useNavigate}  from 'react-router-dom';

export default function LoginComponent({join}) {

  const [state, setState] = React.useState(join);
  const {confirmModalOpen} = React.useContext(ConfirmContext);
  const {signIn, setSignIn} = React.useContext(GlobalContext);
  const navigate = useNavigate();

   // 이메일 입력상자  onChange  이벤트
   const onChangeUserEmail=(e)=>{
    const {value}=e.target;
    let isEmailError = false;
    let isEmailMsg = '';
    const regExp = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/\.?]+\.[a-z]{2,3}$/gi; 

    if(value===''){
        isEmailError=true;
        isEmailMsg='이메일 주소를 입력해 주세요.';
    }
    else if(regExp.test(value)===false){
        isEmailError=true;
        isEmailMsg='이메일 형식으로 입력해 주세요.';
    }
    else{
        isEmailError=false;
        isEmailMsg='';
    }
    
    setState({
        ...state,
        isEmailError: isEmailError,
        isEmailMsg: isEmailMsg,
        email: value
    })

}


const onChangeUserPw=(e)=>{
  const {value} = e.target;
  let isPwError = false;
  let isPwMsg = '';
  const regExp1 = /^(.){8,16}$/g; 
  const regExp2 = /([A-Za-z]+[0-9]+)+|([0-9]+[A-Za-z]+)+|([A-Za-z]+[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+)+|([`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+[A-Za-z]+)+|([0-9]+[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+)+|([`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+[0-9]+)+/g;   // true 정상
  const regExp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
  const regExp4 = /\s/g;

  if(value===''){
    isPwError=true;
    isPwMsg='비밀번호를 입력해 주세요.';
  }
  else if(regExp1.test(value)===false || regExp2.test(value)===false || regExp3.test(value)===true  || regExp4.test(value)===true){
      isPwError = true;
      isPwMsg = '영문+숫자 조합 8자리 이상 입력해주세요.';
  }
  else {
      isPwError = false;
      isPwMsg = '';
  }

  setState({
      ...state,
      isPwError: isPwError,
      isPwMsg: isPwMsg,
      pw: value
  })
}

const onClickLog=(e)=>{
  e.preventDefault();
  if(state.email===''){
    confirmModalOpen('이메일을 입력해주세요');
  }
  else if(state.pw===''){
    confirmModalOpen('비밀번호를 입력해주세요');
  }
  else{
    axios({
      url:'http://janeseo0530.cafe24.com//JSP/soomgo_user_signin_action.jsp',
      method: 'POST',
      data:{},
      params: {
          "user_email": state.email,
          "user_pw": state.pw
      }
  })
  .then((res)=>{
      const result = res.data;
      try {                    
          if( result === -1 ){ // -1 이면 가입회원이 아닙니다. 회원가입하세요                      
              confirmModalOpen('가입회원이 아닙니다. 회원가입하세요. ');
              setTimeout(function(){
                navigate('/join');
               
            }, 1000);    
            
          }
         else if( result === 0 ){ // 0 이면 비밀번호 오류                      
              confirmModalOpen('비밀번호를 확인 후 다시 시도해주세요.');
          }
          else{
              confirmModalOpen('로그인 되었습니다.');   
              // 라우터 네비게이트 사용 구현

              let toDay = new Date();
              toDay.setDate(toDay.getDate()+3); // 로그인 3일 후 로그아웃 시간은 setHour getHour
              const obj = {
                  user_email:state.email,
                  expires: toDay.getTime()
              }
              localStorage.setItem('SOOMGOUSERLOGIN',JSON.stringify(obj));
              navigate('/home'); 
              setSignIn({
                user_email:state.email,
                expires: toDay.getTime()
            })
          }
      } catch (error) {
          console.log( error );
      }
  

  })
  .catch((err)=>{
      console.log(`AXIOS 실패! ${err} `)
  });  
   
  }
 
}









  return (
    <>
    <div id="login">
        <div className="container">
          <div className="gap">
            <div className="title">
              <h1>로그인</h1>
            </div>
            <div className="content">
              <form action="">
                <ul>
                  <li>
                    <div className='user_email'>
                      <label htmlFor="userEmail">이메일</label>
                      <input 
                      autoComplete='off'
                      maxLength={30}
                      type="text" 
                      name='user_email' 
                      id='userEmail' 
                      placeholder='example@soomgo.com' 
                      value={state.email}
                      onChange={onChangeUserEmail}
                      />
                      <p className={`error-msg${state.isEmailError?' on':''}`}>{state.isEmailMsg}</p>
                    </div>                   
                  </li>           
                  <li>
                      <div className='user_pw'>
                        <label htmlFor="userPw">비밀번호</label>
                        <input 
                        type='password'
                        name='user_pw' 
                        id='userPw' 
                        placeholder='영문+숫자 조합 8자리 이상 입력해주세요' 
                        value={state.pw}
                        onChange={onChangeUserPw}
                        />
                        <p className={`error-msg${state.isPwError?' on':''}`}>{state.isPwMsg}</p>
                    </div>   
                  </li>
                  <div className="button-box">
                    <button onClick={onClickLog}>이메일 로그인</button>
                  </div>    
                  <div className="sign-box">
                    <a href="!#">비밀번호 찾기</a>
                    <div className="line"></div>
                    <Link to="/join">회원가입</Link>  
                  </div>   
                  <div className="kakao-box">
                    <button><img src="./images/login/icon-login-kakaotalk-btn.svg" alt="" />카카오로 시작</button>  
                  </div>    
                  <div className="naver-box">
                    <button><img src="./images/login/icon-login-naver-btn.svg" alt="" />네이버로 시작</button>  
                  </div>    
                  <div className="facebook-box">
                    <button><img src="./images/login/icon-login-facebook-btn.svg" alt="" />페이스북으로 시작</button>  
                  </div>    
                </ul>
              </form>
            </div>
          </div>
        </div>
    </div>
    <Outlet/>
    </>
  );
};
LoginComponent.defaultProps = {
  join : {
    email:'',
    isEmailError: false,
    isEmailMsg: '',

    pw:'',
    isPwError: false,
    isPwMsg: '',
  }
}

