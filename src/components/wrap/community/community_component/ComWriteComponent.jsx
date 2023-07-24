import React,{useRef} from 'react';
import './scss/c_write.scss';
import $, { css } from 'jquery';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { ConfirmContext } from '../../context/ConfirmContext';
import { GlobalContext } from '../../context/GlobalContext';
import {useNavigate}  from 'react-router-dom';

export default function ComWriteComponent(){

    const navigate = useNavigate();
    const {confirmModalOpen,confirmModalClose,confirmMsg,isConfirmModal} = React.useContext(ConfirmContext);
    const {signIn, setSignIn} = React.useContext(GlobalContext);

    const [state,setState]=React.useState({
        subject:'',
        file1:'',
        file2:'',
        file3:'',
        title:'',
        service:'',
        location:'',
        content:'',
        writeDate:''
    });
    const [login,setLogin]=React.useState({
        user_email:''
    })
    const {content,subject,title}=state;

    const [img,setImg]=React.useState({
        file:[],
        ImgUrl:[]
    })

    const {file,ImgUrl}=img;

    const ImgFile=useRef();


    React.useEffect(() => {
        const storedData = localStorage.getItem('SOOMGOUSERLOGIN');
    
        if (storedData) {
          const { user_email } = JSON.parse(storedData);
    
          setLogin(prevLogin => ({
            ...prevLogin,
            user_email
          }));
        }
      }, []);
    
      console.log(login.user_email);
      
    
   
    
    
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            subject:e.target.value
        })
    }
    const onChangeContent=(e)=>{
        setState({
            ...state,
            content:e.target.value
        })
    }
    const onChangeTitle=(e)=>{
        setState({
            ...state,
            title:e.target.value
        })
    }
    const onChangeService=(e)=>{
        setState({
            ...state,
            service:e.target.value
        })
    }
    const onChangeLocation=(e)=>{
        setState({
            ...state,
            location:e.target.value
        })
    }

    React.useEffect(()=>{
        if(content!=='' && subject !==''&& title!==''){
         $('.save').addClass('on');
        }
        else{
        $('.save').removeClass('on');
        }
    },[content,title,subject]);  


    const handleImageUpload = (event) => {
        const files = event.target.files;
        const updatedImgUrl = [...img.ImgUrl];
      
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          const file = files[i];
      
          reader.onload = (ev) => {
            updatedImgUrl.push(ev.target.result);
            setImg({ ...img, ImgUrl: updatedImgUrl });
          };
      
          reader.readAsDataURL(file);
        }
      };

      const handleImageDelete = (index) => {
        const updatedImgUrl = [...img.ImgUrl];
        updatedImgUrl.splice(index, 1);
        setImg({ ...img, ImgUrl: updatedImgUrl });
      };
      


    React.useEffect(()=>{
        if(img.ImgUrl!==''){
            $('.img-upload').addClass('on');
        }
        else{
            $('.img-upload').removeClass('on');
        }
    
    },[ImgUrl])

    const onClickImage=(e)=>{
        e.target.value = null;

    }
    const onClickImageUpload=(e)=>{
        e.preventDefault();
        ImgFile.current.click();
    }

    const onClickSubmit=(e)=>{
        e.preventDefault();

        let formData = new URLSearchParams();   

        formData.append("userId", login.user_email)
        formData.append("subject",state.subject);
        formData.append("file1",state.file1);
        formData.append("file2",state.file2);
        formData.append("file3",state.file3);
        formData.append("title",state.title);
        formData.append("service", state.service);
        formData.append("location",state.location);
        formData.append("content", state.content);
        console.log(formData);
        axios({
            url:'http://rlaqjawh46.cafe24.com/JSP/writeAction.jsp',
            method:'POST',
            data:{},
            params:formData,
           
           
        })
        .then((res)=>{
            console.log(res.data);
            confirmModalOpen('글 작성이 완료되었습니다.');
        
            navigate('/community');
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    
    React.useEffect(()=>{
        setImg({
            ...img,
            ImgUrl:''
        })
    },[])

    React.useEffect(()=>{
        if(ImgUrl.length===1){
            $('.img-del .img1').css({"display":"block"})
            $('.img-del .img2').css({"display":"none"})
            $('.img-del .img3').css({"display":"none"})
        }
        else if(ImgUrl.length===2){
            $('.img-del .img1').css({"display":"block"})
            $('.img-del .img2').css({"display":"block"})
            $('.img-del .img3').css({"display":"none"})
        }
        else if(ImgUrl.length===3){
            $('.img-del .img1').css({"display":"block"})
            $('.img-del .img2').css({"display":"block"})
            $('.img-del .img3').css({"display":"block"})
        }
        else{
            $('.img-del .img1').css({"display":"none"})
            $('.img-del .img2').css({"display":"none"})
            $('.img-del .img3').css({"display":"none"})
            $('.img-upload').removeClass('on');
        }
   
    },[ImgUrl])

    const imgURLf=(e) =>ImgUrl.map((item, idx)=>{
        return( 
            <img key={idx} className={`img-up${idx+1}`} src={item} alt="" />
        )
     });

     React.useEffect(()=>{
        setState({
            ...state,
            file1:img.ImgUrl[0],
            file2:img.ImgUrl[1],
            file3:img.ImgUrl[2]
        })
        console.log(ImgUrl[0]);
        console.log(ImgUrl[1]);
        console.log(ImgUrl[2]);
     },[img])


    return (
        <div id='write'>
            <div className="container3">
                    <div className="title3">
                        <div className="title-header">
                            <div className="select-box">
                                
                                <select name="subject" id="subject" onChange={onChangeSubject}>
                                    <option selected disabled value='' >주제 선택</option>
                                    <option value="궁금해요">궁금해요</option>
                                    <option value="얼마예요">얼마예요</option>
                                    <option value="고수찾아요">고수찾아요</option>
                                    <option value="함께해요">함께해요</option>
                                </select>
                                <img src="../images/community/write/다운로드.svg" alt="" />
                            </div>
                            <div className="button">
                                <button type='submit' onClick={onClickSubmit} className='save'>등록</button>
                            </div>
                        </div>
                    </div>
                    <div className="row1-wrap">
                            <div className="row1">
                                {/* <img src="../images/community/write/icon-camera.svg" alt="" /> */}
                                    <div className="img-input">
                                        <input type="file" multiple name='file' id='file' ref={ImgFile} onChange={handleImageUpload} />
                                        <button className='imgButton' onClick={onClickImageUpload}>
                                            <img src="../images/community/write/icon-camera.svg" alt="" />
                                        </button>
                                    </div>
                                    <div className="imglength-div">
                                        <span className='imglength'>{ ImgUrl.length }</span> <span className='imglength'> /  </span><span>3</span>

                                    </div>
                                    
                            </div>
                        </div>
                    <div className="content">

                        <div className="row2">
                            <label htmlFor=""></label> 
                            <input type="text" name='title' id='title' placeholder='제목을 입력해주세요.' onChange={onChangeTitle} onClick={onClickImage} />
                        </div>
                        <div className="row3">
                            <div className="select-box">
                                <div className="select1">
                                    <select name="service" id="service"   onChange={onChangeService}>
                                        <option disabled value='' selected >(선택)서비스</option>
                                        <option value="레슨">레슨</option>
                                        <option value="홈/리빙">홈/리빙</option>
                                        <option value="이벤트">이벤트</option>
                                        <option value="비지니스">비지니스</option>
                                        <option value="디자인/개발">디자인/개발</option>
                                        <option value="건강/미용">건강/미용</option>
                                        <option value="알바">알바</option>
                                        <option value="기타">기타</option>
                                    </select>
                                </div> 
                                <div className="select2">
                                    <select name="location" id="location"  onChange={onChangeLocation}>
                                        <option disabled  value='' selected >(선택)지역</option>
                                        <option value="서울">서울</option>
                                        <option value="세종">세종</option>
                                        <option value="강원">강원</option>
                                        <option value="경기">경기</option>
                                        <option value="인천">인천</option>
                                        <option value="충북">충북</option>
                                        <option value="충남">충남</option>
                                        <option value="경북">경북</option>
                                        <option value="대전">대전</option>
                                        <option value="대구">대구</option>
                                        <option value="전북">전북</option>
                                        <option value="경남">경남</option>
                                        <option value="울산">울산</option>
                                        <option value="광주">광주</option>
                                        <option value="부산">부산</option>
                                        <option value="전남">전남</option>
                                        <option value="제주">제주</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="img-upload">
                            <div className="img-place">
                                <div className="img-list">
                                    <div className="img-area">
                                        {
                                            ImgUrl.length === 0 ?
                                                (<></>) 
                                                :
                                                (
                                                    imgURLf()
                                                )
                                        
                                        }

                                        {/* <img className='img-up1' src={img.ImgUrl[0]} alt="" />
                                        <img className='img-up2 on' src={img.ImgUrl[1]} alt="" />
                                        <img className='img-up3' src={img.ImgUrl[2]} alt="" /> */}


                                    </div>
                                    <div className="img-del" >
                                        <img className='img1'onClick={()=>handleImageDelete(0)} src="../images/community/write/icon-del.svg" alt="" />
                                        <img className='img2'onClick={()=>handleImageDelete(1)} src="../images/community/write/icon-del.svg" alt="" />
                                        <img className='img3'onClick={()=>handleImageDelete(2)} src="../images/community/write/icon-del.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row4">
                            <div className="text">
                        <textarea name="content" id="content" placeholder=" ※ 주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 신고의 대상이 됩니다.
                            ※ 일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다." onChange={onChangeContent}></textarea>
                                {/* <span style={state.content!==''? {display : 'none'} : {display:'block'}}>
                                ※ 주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 신고의 대상이 됩니다.<br/>
                                ※ 일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다.
                                </span> */}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

