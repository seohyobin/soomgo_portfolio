import React from 'react';
import'./scss/c_together.scss';
import $ from 'jquery';
import './scss/c_question.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default  function CommunityTogetherComponent(){
    const [state,setState]=React.useState({
        listData1:[],
        test:{},
        question:[]
    });
    const [key,setKey] =React.useState({
        key:'COMMUNITY',
        list1 :[]
    });
    const setList=(value)=>{
        let arr=[];
        if(localStorage.getItem('COMMUNITY')!==null){
            arr=JSON.parse(localStorage.getItem('COMMUNITY'));
            arr=[value, ...arr]
            localStorage.setItem('COMMUNITY',JSON.stringify(arr));
            setKey({
                ...key,
                list1:arr
            })
        }
        else{
            arr=[value]
            localStorage.setItem('COMMUNITY',JSON.stringify(arr));
            setKey({
                ...key,
                list1:arr
            })
        }
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
    };

   
    const {content,subject,title,question}=state;

    const getList=()=>{
        try {
            axios({
                url:'http://rlaqjawh46.cafe24.com/JSP/listAction.jsp',
                method:'GET', 
                dataType:'json' 
            })
            .then((res)=>{
            let listData1 =res.data.result.filter(item => item.subject === '함께해요')
                setState({
                    ...state,
                    listData1:listData1
                    
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
    
    return (
        <div id='c-all'>
            <div className="content">
                    <div className="input">
                        <img src="./images/community/content/icon-search.svg" alt="" /><input type="text" name='' id='' placeholder='키워드와 #태그 모두 검색할 수 있어요.' />
                    </div>
                    <div className="banner">
                        <div className="banner-wrap4">
                            <p><span>글 작성팁</span>  과외 친구부터 공동구매 그룹까지 함께 할 사람을 찾아보세요</p>
                            <img src="./images/community/content/together_banner.svg" alt="" />
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <button className='blind'><span>초기화</span></button>
                        <button className='service'><span>서비스<img src="./images/community/content/icon-arrow-down.svg" alt="" /></span></button>
                        <button className='location'><span>지역<img src="./images/community/content/icon-arrow-down.svg" alt="" /></span></button>
                        <button className='blind'><span>지역이름</span></button>
                    </div>
                    <ul className="feed-list">
                        {state.listData1.map((item)=>{
                            return(
                            <li className="feed" key={item.idx} onClick={(e)=>onClickList(e,item)}>
                                <Link to={`./view/${item.idx}`}>
                                        <div className="wrap-wrap">
                                            <div className="text-wrap">
                                                <div className="feed-content">
                                                    <h4>{item.subject}</h4>
                                                    <h3>{item.title}</h3>
                                                    <p className='c'>{item.content}</p>
                                                    <p className='l'>{item.location}</p>
                                                </div>
                                            </div>
                                            <div className="img-wrap">
                                                <img src={item.file1}  alt="" />
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
                        })

                        }
                    </ul>
            </div>
        </div>
    );
};

