import React from 'react';
import axios from 'axios';

export default function Section13Component() {

    const slideWrap = React.useRef();
    const [eduCnt, seteduCnt] = React.useState(0);
    const [state, setState] = React.useState({
        edu: [],
        eduLength: 0
    });

    // get data
    React.useEffect(() => {
        axios({
            url: './data/home/section9.json',
        })
        .then((res) => {
            if(res.status === 200) {
                setState({
                    edu: res.data.edu,
                    eduLength: res.data.edu.length
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [state]);

    // slide wrap width setting
    React.useEffect(() => {
        slideWrap.current.style.width = `${state.eduLength/4 * 100}%`;
        slideWrap.current.style.gridTemplateColumns = `repeat(${state.eduLength},1fr)`;
    }, [state.eduLength]);

    React.useEffect(() => {
        if( eduCnt < 0){
            seteduCnt(0);
        }
        else if( eduCnt > Math.floor(state.eduLength / 4)){
            seteduCnt(Math.floor(state.eduLength / 4));
        }
        else{
            slideWrap.current.style.transition = `all 0.3s ease-in-out`;
            slideWrap.current.style.transform = `translateX(${-eduCnt * 100 / 3}%)`;
        }
    }, [eduCnt, state.eduLength]);

    // prev btn click
    const onClickPrev = (e) => {
        e.preventDefault();
        seteduCnt(eduCnt - 1);
    };

    // next btn click
    const onClickNext = (e) => {
        e.preventDefault();
        seteduCnt(eduCnt + 1);
    };


  return (
    <section id="section9">
        <div className="container">
            <div className="title">
                <h2>오늘부터 갓생살기</h2>
            </div>
            <div className="slide__container">
                <div className="slide__gap">
                    <ul className="slide__wrap" ref={slideWrap}>
                        {
                            state.edu.map((item, idx) => {
                                return(
                                    <li className="slide__item" key={idx}>
                                        <a href="!#" className="slide__link">
                                            <div className="slide__img">
                                                <img src={item.img} alt="" />
                                            </div>
                                            <div className="slide__text">
                                                <p>{item.category}</p>
                                            </div>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="slide-btn__wrap">
                    <div className="btn__item--prev">
                        <button type='button' onClick={onClickPrev} className={eduCnt !== 0 ? null : 'hide'}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' onClick={onClickNext} className={eduCnt !== Math.floor(state.eduLength/4) ? null : 'hide'}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
