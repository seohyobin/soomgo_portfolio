import React from 'react';
import axios from 'axios';

export default function Section11Component() {

    const slideWrap = React.useRef();
    const [houseCnt, sethouseCnt] = React.useState(0);
    const [state, setState] = React.useState({
        house: [],
        houseLength: 0
    });

    // get data
    React.useEffect(() => {
        axios({
            url: './data/home/section9.json',
        })
        .then((res) => {
            if(res.status === 200) {
                setState({
                    house: res.data.house,
                    houseLength: res.data.house.length
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [state]);

    // slide wrap width setting
    React.useEffect(() => {
        slideWrap.current.style.width = `${state.houseLength/4 * 100}%`;
        slideWrap.current.style.gridTemplateColumns = `repeat(${state.houseLength},1fr)`;
    }, [state.houseLength]);

    React.useEffect(() => {
        if( houseCnt < 0){
            sethouseCnt(0);
        }
        else if( houseCnt > Math.floor(state.houseLength / 4)){
            sethouseCnt(Math.floor(state.houseLength / 4));
        }
        else{
            slideWrap.current.style.transition = `all 0.3s ease-in-out`;
            slideWrap.current.style.transform = `translateX(${-houseCnt * 100 / 3}%)`;
        }
    }, [houseCnt, state.houseLength]);

    // prev btn click
    const onClickPrev = (e) => {
        e.preventDefault();
        sethouseCnt(houseCnt - 1);
    };

    // next btn click
    const onClickNext = (e) => {
        e.preventDefault();
        sethouseCnt(houseCnt + 1);
    };


  return (
    <section id="section9">
        <div className="container">
            <div className="title">
                <h2>내 맘대로 집 꾸미기</h2>
            </div>
            <div className="slide__container">
                <div className="slide__gap">
                    <ul className="slide__wrap" ref={slideWrap}>
                        {
                            state.house.map((item, idx) => {
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
                        <button type='button' onClick={onClickPrev} className={houseCnt !== 0 ? null : 'hide'}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' onClick={onClickNext} className={houseCnt !== Math.floor(state.houseLength/4) ? null : 'hide'}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
