import React,{useRef} from 'react';
import $, { css } from 'jquery';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './scss/c_updata.scss';
import { ConfirmContext } from '../../context/ConfirmContext';
import { GlobalContext } from '../../context/GlobalContext';
import {useNavigate}  from 'react-router-dom';

export default function ComUpdateComponent(){
    const navigate = useNavigate();
    const {confirmModalOpen,confirmModalClose,confirmMsg,isConfirmModal} = React.useContext(ConfirmContext);
    const {signIn, setSignIn} = React.useContext(GlobalContext);

    const [list,setList] =React.useState({
        idx:'',
        update:[],
        subject:'',
        file1:'',
        file2:'',
        file3:'',
        title:'',
        service:'',
        location:'',    
        content:'',
        writeDate:'',
    })
    const {view}=list;
    const [state,setState]=React.useState({
        idx:'',
        subject:'',
        file1:'',
        file2:'',
        file3:'',
        title:'',
        service:'',
        location:'',    
        content:'',
        writeDate:'',
        listData:[]
    });
    const {content,subject,title,listData}=state;

    const [img,setImg]=React.useState({
        file:[],
        ImgUrl:[]
    })

    React.useEffect(()=>{
        if (localStorage.getItem('COMMUNITY') !== null) {
            let result = JSON.parse(localStorage.getItem('COMMUNITY'));
            setList({
                ...list,
                idx: result[0].idx,     
                subject: result[0].subject,     
                file1: result[0].file1,     
                file2: result[0].file2,     
                file3: result[0].file3,     
                title: result[0].title,     
                service: result[0].service,     
                location: result[0].location,     
                content: result[0].content,
                writeDate: result[0].writeDate
            })
        }
    },[]);


    const {file,ImgUrl}=img;

    const ImgFile=useRef();

    const getList=()=>{

        // let formData = new URLSearchParams();
        // formData.append("idx", list.idx);
        let formData = {
            "idx" : list.idx
        }
        $.ajax({
            url : 'http://rlaqjawh46.cafe24.com/JSP/getListUpdate.jsp',
            type : 'POST',
            data : formData,
            dataType : 'json',
            success(res){
                console.log('ajax 성공');
                console.log(res.data);
                //alert('리스트출력');
                setState({
                    ...state,
                    idx:res.result.idx,
                    subject:res.result.subject,
                    file1:res.result.file1,
                    file2:res.result.file2,
                    file3:res.result.file3,
                    title:res.result.title,
                    service:res.result.service,
                    location:res.result.location,    
                    content:res.result.content,
                    writeDate:res.result.writeDate
                })
            },
            error(err){
                console.log('ajax 실패');
                console.log(err);
            }
        })
    }

    React.useEffect(()=>{
        getList();
    },[list.idx])
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
    const onClickUpdataSubmit=(e)=>{
        e.preventDefault();
        let formData = new URLSearchParams(); 
        formData.append("idx",list.idx);
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
            url:'http://rlaqjawh46.cafe24.com/JSP/updataAction.jsp',
            method:'post',  
            data:{},
            params:formData
        })
        .then((res)=>{
            console.log('axios 성공');
            console.log(res);
            alert('글 수정이 완료되었습니다.');
            navigate('/community');
        })
        .catch((err)=>{
            console.log('axios 실패'+err);
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
            <img key={idx} className={`img-up${idx+1}`} src={item} alt=""/>
        )
     });
    React.useEffect(()=>{
        setState({
            ...state,
            file1:img.ImgUrl[0],
            file2:img.ImgUrl[1],
            file3:img.ImgUrl[2]
        })

    },[img])

    return (
        <div id='write'>
            <div className="container">
                    <div className="title">
                        <div className="title-header">
                            <div className="select-box">
                                
                                <select name="subject" id="subject" onChange={onChangeSubject} value={state.subject}>
                                    <option selected disabled value='' >주제 선택</option>
                                    <option value="궁금해요">궁금해요</option>
                                    <option value="얼마예요">얼마예요</option>
                                    <option value="고수찾아요">고수찾아요</option>
                                    <option value="함께해요">함께해요</option>
                                </select>
                                <img src="../images/community/write/다운로드.svg" alt="" />
                            </div>
                            <div className="button">
                                <button type='submit' onClick={onClickUpdataSubmit} className='save'>수정</button>
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
                            <input type="text" name='title' id='title' placeholder='제목을 입력해주세요.' onChange={onChangeTitle} onClick={onClickImage} value={state.title} />
                        </div>
                        <div className="row3">
                            <div className="select-box">
                                <div className="select1">
                                    <select name="service" id="service"   onChange={onChangeService} value={state.service} >
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
                                    <select name="location" id="location" onChange={onChangeLocation} value={state.location}>
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
                            ※ 일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다." onChange={onChangeContent} value={state.content}></textarea>
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

