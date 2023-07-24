import React from 'react';
import './scss/c_view.scss';
import $ from 'jquery';
import axios from 'axios';
import { json, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmContext } from '../../context/ConfirmContext';
import { GlobalContext } from '../../context/GlobalContext';

export default  function ComViewListComponent(){
    const {confirmModalOpen,confirmModalClose,confirmMsg,isConfirmModal} = React.useContext(ConfirmContext);
    const {signIn, setSignIn} = React.useContext(GlobalContext);
    const [state,setState]=React.useState({
        listData:[],
        viewList:[],
      
    })
    const [data, setData] = useState({
        view:{}
       
    });
    const {view,updata}=data;
    const {id} = useParams();
    
    const {listData}=state;
      
    React.useEffect(()=>{
        if (localStorage.getItem('COMMUNITY') !== null) {
            let result = JSON.parse(localStorage.getItem('COMMUNITY'));
            setData({
                ...data,
                view: result[0]
            })
        }
    },[]);

    const getList= async()=>{
        try {
            axios({
                url:'/JSP/listAction.jsp',
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
      
        
    },[]);


    const onClickUpdate=(e)=>{
        e.preventDefault();
        window.location.href='/community/update';



    }


    const onClickDelete=(e)=>{
        e.preventDefault();
        console.log(view.idx);

        let formData = new URLSearchParams();
        formData.append("idx", view.idx)
        axios({
            url:'/JSP/deleteAction.jsp',
            method:'POST',  
            data:{},
            params:formData
        })
        .then((res)=>{
            console.log('AJAX 성공');
            console.log(res);
            alert('삭제되었습니다');
            window.location.href='/community'
        })
        .catch((err)=>{
            console.log('AJAX 실패'+err);
        })  
        
    }

    React.useEffect(()=>{
        $('.img2').on({
            click(e){
                e.preventDefault();
                $('.del-upd').toggleClass('on');
            }
        })
    },[])

    return (
        <div id='view'>
            <div className="container" key={id}>
                <div className="header">
                    <div className="header-row1">
                        <span>커뮤니티</span>
                        <span><img src="http://localhost:3000/images/community/view/icon_arrow_right.svg" alt="" /></span>
                        <span>{view.subject}</span>
                    </div>
                    <div className="header-row2">
                        <ul>
                            <li>
                                <p>{view.service}</p>
                            </li>
                            <li> 
                                <h3>{view.title}</h3>
                             </li>
                             <li>
                                <h4>{view.location}</h4>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-info">
                    <div className="left">
                        <div className="img">
                            <img className='userimg' style={(view.file1==='undefined' ? {display:'none'}:{} )} src={view.file1} alt="" />
                        </div>
                        <div className="info" style={(view.file1==='undefined' ? {marginLeft:'-12px'}:{} )}>
                            <h5>{signIn.user_email}</h5>
                            <h4 >{view.writeDate}</h4>  
                        </div>
                    </div>
                    <div className="right">
                        <img className='img1' src="http://localhost:3000/images/community/view/icon-save.svg" alt="" />
                        <img className='img2' src="http://localhost:3000/images/community/view/icon-3dots.svg" alt="" />
                    </div>

                    <div className="del-upd">
                        <div>   
                            <a className='a1' href="!#" onClick={onClickUpdate}>수정하기</a>
                            <a className='a2' href="!#" onClick={onClickDelete}>삭제하기</a>
                        </div>
                    </div>
                

                </div>  
                <div className="body-content">
                    <div className="textarea">
                        <p>{view.content}</p>
                    </div>
                    <div className="imgarea">
                        <ul>
                            <li><img src={view.file1} style={(view.file1==='undefined' ? {display:'none'}:{} )}alt="" /></li>
                            <li><img src={view.file2} style={(view.file2==='undefined' ? {display:'none'}:{} )}alt="" /></li>
                            <li><img src={view.file3} style={(view.file3==='undefined' ? {display:'none'}:{} )}alt="" /></li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-icon">
                    <div className="icon1">
                        <img src="http://localhost:3000/images/community/view/icon-thumbs.svg" alt="" />
                        <span>좋아요 0</span>
                    </div>
                    <div className="icon2">
                        <img src="http://localhost:3000/images/community/view/icon-comment.svg" alt="" />
                        <span>댓글 1</span>
                    </div>

                </div>
            </div>
            

        </div>
    );
};

