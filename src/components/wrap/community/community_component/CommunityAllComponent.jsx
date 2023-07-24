import React from 'react';
import'./scss/c_all.scss';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { ConfirmContext } from '../../context/ConfirmContext';
import { GlobalContext } from '../../context/GlobalContext';

export default  function CommunityAllComponent(){
    const {confirmModalOpen,confirmModalClose,confirmMsg,isConfirmModal} = React.useContext(ConfirmContext);
    const {signIn, setSignIn} = React.useContext(GlobalContext);


    const [state,setState]=React.useState({
        listData:[],
        test:{},
        user_name:''

    });
    const [cnt,setCnt]=React.useState(1);

    const [key,setKey] =React.useState({
        key:'COMMUNITY',
        list :[]
    });
      
    const setList=(value)=>{
        let arr=[];
        if(localStorage.getItem('COMMUNITY')!==null){
            arr=JSON.parse(localStorage.getItem('COMMUNITY'));
            arr=[value, ...arr]
            localStorage.setItem('COMMUNITY',JSON.stringify(arr));
            setKey({
                ...key,
                list:arr
            })
        }
        else{
            arr=[value]
            localStorage.setItem('COMMUNITY',JSON.stringify(arr));
            setKey({
                ...key,
                list:arr
            })
        }
    }
    const onClickCnt=(e)=>{
        e.preventDefault();
        setCnt(cnt+1)
    }
    const onClickCntMinu=(e)=>{
        e.preventDefault();
        setCnt(cnt-1)
    }
  
    const onClickList=(e, item)=>{
       
        let obj ={
            idx:item.idx,
            userId:item.userId,
            subject:item.subject,
            file1:item.file1,
            file2:item.file2,
            file3:item.file3,
            title:item.title,
            service:item.service,
            location:item.location,
            content:item.content,
            writeDate:item.writeDate,
        }
        console.log(obj);   
        setList(obj);
            

    }


    const {content,subject,title}=state;

    const [img,setImg]=React.useState({
        file:[],
        ImgUrl:[]
    })

    const {file,ImgUrl}=img;

    React.useEffect(()=>{
        const $slideContainer=$('.slide-container');
        const $slideWrap=$('.slide-wrap');
        const $slide=$('.slide');
        const $arrowBtnNext = $('.arrow-btn-next');
        const $arrowBtnPrev = $('.arrow-btn-prev');

        let cnt=0;
        let n =($slide.length)/2

      
    

        function mainSlide(){
            $slideWrap.stop().animate({left:`${-100*cnt}%`},400,function(){
                if(cnt===1){
                    $arrowBtnNext.hide();
                    $arrowBtnPrev.css('display', 'block');
                }
                if(cnt===0){
                    $arrowBtnPrev.hide();
                    $arrowBtnNext.css('display', 'block');

                }
                
            })
        }

        function nextCount(){
            cnt++;
            mainSlide();
        }
        function prevCount(){
            cnt--;
            mainSlide();
        }



        $arrowBtnNext.on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        })

        $arrowBtnPrev.on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        })

    },[])



    const getList=()=>{
        try {
            axios({
                url:'http://rlaqjawh46.cafe24.com/JSP/listAction.jsp',
                method:'GET', 
                dataType:'json' 
            })
            .then((res)=>{
                setState({
                    ...state,
                    listData:res.data.result

                    
                });
                console.log(res);  
              
            })
            .catch((err)=>{
                console.log(err);  

            })
    
 
            
        } catch (err) {
            console.log(err);   

        }
    }
    React.useEffect(()=>{
        getList();
       
        
    },[])


    
    const dataSlice = (e)=>
        state.listData.slice(0,5).map((item)=>{
            return(
            <li className="slide" key={item.idx}>
                <Link to={`./view/${item.idx}`}>
                    <div className="slide-item">
                        <h3>{item.subject}</h3>
                        <p>{item.title}</p>
                        <div className="p-wrap">
                            <p className='feed-p1'>246</p>
                            <p className='feed-p2'>13</p>
                        </div>
                    </div>
                </Link>
            </li>
            )
        })
    
    return (
        <div id='c-all'>
            <div className="content">
                    <div className="input">
                        <img src="./images/community/content/icon-search.svg" alt="" /><input type="text" name='' id='' placeholder='키워드와 #태그 모두 검색할 수 있어요.' />
                    </div>
                    <div className="slide-box">
                        <div className='pp'>
                            <strong>지금 가장 뜨거운 숨고픽🔥</strong>
                            <span>  
                                <em>{cnt}</em>
                                <i>/</i>
                                <em>2</em>
                            </span>

                        </div>
                        <div className="slide-container">
                            <div className="slide-view">
                                <ul className="slide-wrap">
                                    <li className="slide slide1">
                                        <a href="!#">
                                            <div className="slide-item">
                                                <h3>공지사항</h3>
                                                <p>숨고생활 가이드라인 🤝</p>
                                                <div className="p-wrap">
                                                    <p>Soomgo</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    {
                                        state.listData.length < 5 ?
                                        (<></>)
                                        :
                                        (dataSlice())
                                    }
                                </ul>
                            </div>
                        </div>
                        <a href="!#" className='arrow-btn-next' onClick={onClickCnt}><img src="./images/community/content/icon-arrow-right.svg" alt=""/></a>
                        <a href="!#" className='arrow-btn-prev' onClick={onClickCntMinu}><img src="./images/community/content/icon-arrow-left.svg" alt=""/></a>
                    </div>
                    <div className="btn-wrap">
                        <button className='blind'><span>초기화</span></button>
                        <button className='service'><span>서비스<img src="./images/community/content/icon-arrow-down.svg" alt="" /></span></button>
                        <button className='location'><span>지역<img src="./images/community/content/icon-arrow-down.svg" alt="" /></span></button>
                        <button className='blind'><span>지역이름</span></button>
                    </div>
                    <ul className="feed-list">


                        {
                        state.listData!==undefined && state.listData!==null? 
                        state.listData.map((item)=>{
                            return(
                                <li className="feed" key={item.idx} onClick={(e)=>onClickList(e,item)}>
                                    <Link to={`./view/${item.idx}`}>
                                        <div className="wrap-wrap">
                                            <div className="text-wrap">
                                                <div className="feed-content">
                                                    <h4>{item.subject}</h4>
                                                    <h3>{item.title}</h3>
                                                    
                                                    <p className='c'>{item.content}</p>

                                                   { 
                                                        item.location==="null" || item.location==='nu'?
                                                        (<></>)
                                                        :
                                                        (<p className='l'>{item.location}</p>)
                                                        
                                                   }
                                                   {/* <p className='user_id'>{item.userId}</p> */}
                                                    
                                                </div>
                                            </div>
                                            <div className="img-wrap">
                                                <img src={item.file1} alt="" />
                                            </div>
                                        </div>
                                        <div className="feed-footer">
                                                <div className="span-wrap">
                                                    <span className='span1'>0</span>
                                                    <span className='span2'>2</span>
                                                </div>
                                                <span className='span3'>{item.writeDate}</span>
                                        </div>
                                    </Link>
                            </li>
                            )
                        }) : <h2>로딩중....</h2>
                        }
                    </ul>
            </div>
        </div>
    );
};

