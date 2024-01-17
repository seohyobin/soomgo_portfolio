import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import CommunityComponent from './wrap/community/CommunityComponent'
import FindingComponent from './wrap/finding/FindingComponent'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Component List
import FooterComponent from './wrap/FooterComponent'
import HeaderComponent from './wrap/HeaderComponent'
import HomeComponent from './wrap/HomeComponent'
import MarketComponent from './wrap/market/MarketComponent'
import RequestComponent from './wrap/request/RequestComponent'
import ExpertJoinComponent from './wrap/user/ExpertJoinComponent'
import JoinComponent from './wrap/user/JoinComponent'
import LoginComponent from './wrap/user/LoginComponent'
import ConfirmModal from './wrap/ConfirmModal'

// context
import { GlobalContext } from './wrap/context/GlobalContext'
import { ConfirmContext } from './wrap/context/ConfirmContext'
import CommunityQuestionComponent1 from './wrap/community/community_component/CommunityQuestionComponent1'
import CommunityHowMuchComponent1 from './wrap/community/community_component/CommunityHowMuchComponent1'
import CommunityFindComponent1 from './wrap/community/community_component/CommunityFindComponent1'
import CommunityTogetherComponent1 from './wrap/community/community_component/CommunityTogetherComponent1'

export default function WrapComponent() {

  const [login,setLogin]=React.useState({
    user_email:''
  })
  
  React.useEffect(() => {
    const storedData = localStorage.getItem('SOOMGOUSERLOGIN');
  
    if (storedData) {
      const { user_email } = JSON.parse(storedData);
  
      setLogin(prevLogin => ({
        ...prevLogin,
        user_email
      }));
      console.log(login.user_email)
    }
  }, []);
  
   const [signIn, setSignIn] = React.useState({
    signinKey: 'SOOMGOUSERLOGIN',
    user_email:'',
    expires: ''
  });
  
  const{signinKey,user_email,expires} = signIn;
  
  React.useEffect(()=>{
    // 로컬스토리지 로그인 정보 가져오기
    let result = '';
    if(localStorage.getItem(signinKey)!==null){
      result = JSON.parse(localStorage.getItem(signinKey));
      // if(new Date() > result.expires){
      //   setSignIn({
      //     ...signIn,
      //       user_email: '',
      //       expires: ''
      //     })
      //     localStorage.removeItem(signinKey); // 로그인 정보 모두 삭제
      // }
      // else{
      //   setSignIn({
      //     ...signIn,
      //       user_email: result.user_email,
      //       expires: result.expires
      //     })
      // }
     
    }
    },[user_email, expires, signinKey]);
  
  
  // 모달창
  const [modal, setModal]  =  React.useState({
    confirmMsg: '',
    isConfirmModal: false, // true 모달열기  false 모달닫기    
  });
  
  const {confirmMsg,isConfirmModal} = modal;
  
  const confirmModalOpen=(msg)=>{
    setModal({
        ...modal,
        confirmMsg: msg,
        isConfirmModal: true
    });
  }
  
  const confirmModalClose=()=>{
  setModal({
      ...modal,
      isConfirmModal: false
  });
  }

  return (
    <div id="wrap">
      <GlobalContext.Provider value={{signIn, setSignIn}}>
          <ConfirmContext.Provider value={{confirmModalOpen,confirmModalClose,confirmMsg,isConfirmModal}}>

          <HashRouter>
            <Routes>
              <Route path='' element={<HeaderComponent />}>
                <Route index element={<HomeComponent />} />
                <Route path='/home' element={<HomeComponent />} />
                <Route path='/request' element={<RequestComponent />} />
                <Route path='/market' element={<MarketComponent />} />
                <Route path='/finding/*' element={<FindingComponent />} />
                <Route path='/community/*' element={<CommunityComponent />} />
                <Route path='/question' element={<CommunityQuestionComponent1 />}/>
                <Route path='/howMuch' element={<CommunityHowMuchComponent1 />}/>
                <Route path='/find' element={<CommunityFindComponent1/>}/>
                <Route path='/together' element={<CommunityTogetherComponent1/>}/>
                <Route path='/login' element={<LoginComponent />} />  
                <Route path='/join' element={<JoinComponent />} />
                <Route path='/expertJoin' element={<ExpertJoinComponent />} />
              </Route>
            </Routes>
          </HashRouter>
          <FooterComponent />
        {
            modal.isConfirmModal && <ConfirmModal/>
        }
        </ConfirmContext.Provider>
        </GlobalContext.Provider>
    </div>
  )
}
