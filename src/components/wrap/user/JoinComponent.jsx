import React from 'react'
import axios from 'axios';
import { ConfirmContext } from '../context/ConfirmContext';
import { Link } from 'react-router-dom';
import {useNavigate}  from 'react-router-dom';

export default function JoinComponent({join}) {
  const navigate = useNavigate();

  const {confirmModalOpen} = React.useContext(ConfirmContext);

  const [state, setState] = React.useState(join);   
  const [pwType, setpwType] = React.useState({
    type: "password",
    visible: false,
  });

      // 비밀번호 숨김/표시 이벤트
      const handlePasswordType = (e) => {
        e.preventDefault();
        setpwType(() => {
        // 만약 현재 pwType.visible이 false 라면
          if (!pwType.visible) {
            return { type: "text", visible: true };

        //현재 pwType.visible이 true 라면
          } else {
            return { type: "password", visible: false };
          }
        });
      };

      // 이름 입력상자  onChange  이벤트
      const onChangeUserName=(e)=>{
        const {value}=e.target;
        // const regExp1 = /^(.){2,}$/g; 

        let isNameError = false;
        let isNameMsg = '';

        if(value===''){
          isNameError=true;
          isNameMsg='이름을 입력해 주세요.';
        }
        // else if(regExp1.test(value===false){
        //   isNameError=true;
        //   isNameMsg='최소 2자 이상 입력해주세요.';
        // }
        else{
          isNameError=false;
          isNameMsg='';
        }
        
        setState({
            ...state,
            isNameError: isNameError,
            isNameMsg: isNameMsg,
            name: value
        })

      }

    // 이메일 입력상자  onChange  이벤트
    const onChangeUserEmail=(e)=>{
      const {value}=e.target;
      let isEmailError = false;
      let isEmailMsg = '';
      const regExp = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/\.?]+\.[a-z]{3,}$/gi; 

      if(value===''){
          isEmailError=true;
          isEmailMsg='이메일 주소를 입력해 주세요.';
      }
      else if(regExp.test(value)===false){
          isEmailError=true;
          isEmailMsg='이메일 형식으로 입력해 주세요.';
      }
      else{
      //   axios({ 
      //     // 이메일을 보내서 비교한 결과를 반환받는다.
      //     url:'/JSP/emailCheckAction.jsp',
      //     method: 'POST',
      //     data:{},
      //     params: {
      //         "user_email": state.email
      //     }
      // })
      // .then((res)=>{
      //     try {
      //         console.log( res );
      //         console.log( res.data );
             
      //         if( res.data === true ){ // true 이면 중복된것임.                   
      //             setState({
      //                 ...state,
      //                 isEmailOk: false
      //             })
      //             confirmModalOpen('사용 불가능한 이메일 입니다.');
      //         }
      //         else{
      //             setState({
      //                 ...state,
      //                 isEmailOk: true
      //             })
      //             confirmModalOpen('사용 가능한 이메일 입니다.');
      //         }
      //     } catch (error) {
      //         console.log( error );
      //     }
      // })
      // .catch((err)=>{
      //     console.log(`AXIOS 실패! ${err} `)
      // });    
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

const onChangeCheckAll=(e)=>{
  let agree = [];
  let isAgreeError = false
  let isAgreeMsg = ''

  if(e.target.checked===true){
    agree = state.agreeAll
    isAgreeError = true;
    isAgreeMsg = ''
  }
  else{
    agree = [];
    
    isAgreeError = false;
    isAgreeMsg = '이용약관에 동의해주세요.'
  }
  setState({
    ...state,
    agree:agree,
    isAgreeError:isAgreeError,
    isAgreeMsg:isAgreeMsg

  })
}

const onChangeUserCheck=(e)=>{
  let isAgreeError = false
  let isAgreeMsg = ''
  if(e.target.checked===true){
    setState({
      ...state,
      isAgreeError: true,
      isAgreeMsg : '',
      agree:[...state.agree, e.target.value]
    })
  }
  else{
    isAgreeError = false;
    isAgreeMsg = '이용약관에 동의해주세요.'
    setState({
      ...state,
      agree:state.agree.filter((item)=>item!==e.target.value),
      isAgreeError:isAgreeError,
      isAgreeMsg:isAgreeMsg
    })
  }
}

const onSubmitSignupEvent=(e)=>{

  e.preventDefault();

  let cnt=0;
  state.agree.map((item)=>{
      if(item.indexOf('필수')!==-1){
          cnt++;
      }
  });

  if(state.name===''){
    confirmModalOpen('이름을 입력해주세요');
  }
  else if(state.email===''){
    confirmModalOpen('이메일을 입력해주세요');
  }
  else if(state.pw===''){
    confirmModalOpen('비밀번호를 입력해주세요');
  }
  else if(cnt<3){
    confirmModalOpen('이용약관동의 필수항목 3개를 선택해야합니다.');
  }
  else{
    let 약관동의 = '';
    state.agree.map((item, idx)=>{
        if(idx===state.agree.length-1){
            약관동의 += item
        }
        else{
            약관동의 += item + ', '
        }
        
    })
      
      let formData = {
      "user_name":state.name,
      "user_email":state.email,
      "user_pw":state.pw,
      "user_service": 약관동의
    }

      axios({
        url: 'http://rlaqjawh46.cafe24.com/JSP/soomgo_user_signup_action.jsp',
        method: 'POST', // GET
        data: {},
        params:formData
       
    })
    .then((res)=>{
      confirmModalOpen('회원가입에 성공하였습니다!');
      setTimeout(function(){
        navigate('/login');
       
    }, 1000);    
    })
    .catch((err)=>{
        console.log( 'AXIOS 실패!' + err );
    });
    }
  }




  return (
    <div id="join">
        <div className="container">
          <div className="gap">
            <div className="title">
              <h1>숨고에 오신 것을 환영합니다</h1>
            </div>
            <div className="content">
              <form onSubmit={onSubmitSignupEvent} action="/JSP/soomgo_user_signup_action.jsp">
                <ul>
                  <li>
                    <div className='user_name'>
                      <label htmlFor="userName">이름</label>
                      <input 
                      autoComplete='off'
                      maxLength={8}
                      type="text" 
                      name='user_name' 
                      id='userName' 
                      placeholder='이름(실명)을 입력해주세요' 
                      value={state.name}
                      onChange={onChangeUserName}
                      />
                       <p className={`error-msg${state.isNameError?' on':''}`}>{state.isNameMsg}</p>
                    </div>                 
                  </li>
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
                        type={pwType.type}
                        name='user_pw' 
                        id='userPw' 
                        placeholder='영문+숫자 조합 8자리 이상 입력해주세요' 
                        value={state.pw}
                        onChange={onChangeUserPw}
                        />
                        <span onClick={handlePasswordType}>
                            {pwType.visible ? "숨김" : "표시"}
                        </span>
                        <p className={`error-msg${state.isPwError?' on':''}`}>{state.isPwMsg}</p>
                    </div>   
                  </li>
                  <li>
                    <div className='all_check'>
                      <input 
                      type="checkbox" 
                      name='all_check' 
                      id='allCheck' 
                      onChange={onChangeCheckAll}
                      checked={state.agree.length===3}
                      value={'전체동의'}
                      />
                      <label htmlFor="allCheck">전체동의</label>
                    </div> 
                  </li>
                  <div className='terms-container'></div>
                  <div className="check-box">
                    <ul>
                      <li>
                      <div className="space-between-box">
                      <div className="left-box">
                        <input 
                          type="checkbox" 
                          name='check1' 
                          id='check1' 
                          value={'(필수) 이용약관 동의'}
                          checked={state.agree.includes('(필수) 이용약관 동의')}
                          onChange={onChangeUserCheck}
                          />
                          <label htmlFor="check1">(필수) 이용약관 동의</label></div>
                          <div className="right-box"><span>보기</span></div>
                      </div>
                      </li>
                      <li>
                      <div className="space-between-box">
                      <div className="left-box">
                        <input 
                          type="checkbox" 
                          name='check2' 
                          id='check2'
                          value={'(필수) 개인정보 수집 및 이용 동의'}
                          checked={state.agree.includes('(필수) 개인정보 수집 및 이용 동의')}
                          onChange={onChangeUserCheck} 
                          />
                          <label htmlFor="check2">(필수) 개인정보 수집 및 이용 동의</label></div>
                          <div className="right-box"><span>보기</span></div>
                      </div>
                      </li>
                      <li>
                      <div className="space-between-box">
                      <div className="left-box">
                        <input 
                          type="checkbox" 
                          name='check3' 
                          id='check3'
                          value={'(필수) 14세 이상입니다'}
                          checked={state.agree.includes('(필수) 14세 이상입니다')}
                          onChange={onChangeUserCheck} 
                          />
                          <label htmlFor="check3">(필수) 14세 이상입니다</label></div>
                      </div>
                      </li>
                    </ul>
                  </div>
                  <p className={`error-msg${state.isAgreeError?' on':''}`}>{state.isAgreeMsg}</p>
                  <div className="button-box">
                   <button type='submit'>회원가입</button>
                  </div>    
                  <div className="facebook-box">
                    <button><img src="./images/join/icon-login-facebook-btn.svg" alt="" />Facebook으로 가입하기</button>
                  </div>
                  <Link to="/expertJoin">고수로 가입하시나요?</Link>        
                </ul>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};
JoinComponent.defaultProps = {
  join : {
    name: '',         
    isNameError: false, 
    isNameMsg: '',

    email:'',
    isEmailError: false,
    isEmailMsg: '',

    pw:'',
    isPwError: false,
    isPwMsg: '',

    agreeAll: [
      "(필수) 이용약관 동의",
      "(필수) 개인정보 수집 및 이용 동의",
      "(필수) 14세 이상입니다"
    ],
    agree : [],

    isAgreeError:false,
    isAgreeMsg:'',

    isEmailOk:false

    
  }
}
