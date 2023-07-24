import React from 'react';
import axios from 'axios';

export default function Section5Component() {

    const [state, setState] = React.useState({
        curations: [],
        knowhows: []
    });

    // get data
    React.useState(() => {
        axios({
            url: './data/home/section5.json',
            method: 'GET'
        })
        .then((res) => {
            if(res.status === 200){
                setState({
                    ...state,
                    curations: res.data.curations,
                    knowhows: res.data.knowhows
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [state]);

  return (
    <section id="section5">
        <div className="container">
            <div className="title">
                <h2>숨고 커뮤니티에 물어보세요</h2>
                <a href="!#" className='show__all'>
                    <span>전체보기</span>
                    <img src="./images/chev-right.svg" alt="오른쪽 화살표" />
                </a>
            </div>
            <div className="content">
                <div className="main-community__wrap">
                    <div className="curation__container">
                        <ul className="curation__list">
                            {
                                state.curations.map((item, idx) => {
                                    if(idx < 3){
                                        return(
                                            <li className="curation__item" key={idx}>
                                                <a href="!#" className="curation__link">
                                                    <div className="curation__content">
                                                        <p className="curation__topic">{item.topic}</p>
                                                        <p className="curation__title">{item.title}</p>
                                                        <p className="curation__text">{item.text}</p>
                                                        <div className="curation__reaction">
                                                            <span className="view__counts">{item.view}</span>
                                                            <span className="comment__counts">{item.comment}</span>
                                                        </div>
                                                    </div>
                                                    <div className="curation__img">
                                                        <img src={item.img} alt="큐레이션 이미지" />
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    }
                                    else{
                                        return null;
                                    }
                                })
                            }
                        </ul>
                    </div>
                    <div className="knowhow__container">
                        <ul className="knowhow__list">
                            {
                                state.knowhows.map((item, idx) => {
                                    if(idx < 2){
                                        return (
                                            <li className="knowhow__item" key={idx}>
                                                <a href="!#" className="knowhow__link">
                                                    <div className="knowhow__img">
                                                        <img src={item.img} alt="노하우 이미지" />
                                                    </div>
                                                    <div className="knowhow__content">
                                                        <p className="knowhow__service">{item.service}</p>
                                                        <div className="knowhow__title">
                                                            <p>{item.title}</p>
                                                        </div>
                                                        <p className="knowhow__author">{item.author}</p>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    }
                                    else{
                                        return null;
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
