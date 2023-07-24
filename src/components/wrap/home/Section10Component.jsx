import React from 'react';
import axios from 'axios';

export default function Section10Component() {

    const slideWrap = React.useRef();
    const [carCnt, setcarCnt] = React.useState(0);
    const [state, setState] = React.useState({
        car: [],
        carLength: 0
    });

    // get data
    React.useEffect(() => {
        axios({
            url: './data/home/section9.json',
        })
        .then((res) => {
            if(res.status === 200) {
                setState({
                    car: res.data.car,
                    carLength: res.data.car.length
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [state]);

    // slide wrap width setting
    React.useEffect(() => {
        slideWrap.current.style.width = `${state.carLength/4 * 100}%`;
        slideWrap.current.style.gridTemplateColumns = `repeat(${state.carLength},1fr)`;
    }, [state.carLength]);

    React.useEffect(() => {
        if( carCnt < 0){
            setcarCnt(0);
        }
        else if( carCnt > Math.floor(state.carLength / 4)){
            setcarCnt(Math.floor(state.carLength / 4));
        }
        else{
            slideWrap.current.style.transition = `all 0.3s ease-in-out`;
            slideWrap.current.style.transform = `translateX(${-carCnt * 100 / 3}%)`;
        }
    }, [carCnt, state.carLength]);

    // prev btn click
    const onClickPrev = (e) => {
        e.preventDefault();
        setcarCnt(carCnt - 1);
    };

    // next btn click
    const onClickNext = (e) => {
        e.preventDefault();
        setcarCnt(carCnt + 1);
    };


  return (
    <section id="section9">
        <div className="container">
            <div className="title">
                <h2>자동차를 부탁해</h2>
            </div>
            <div className="slide__container">
                <div className="slide__gap">
                    <ul className="slide__wrap" ref={slideWrap}>
                        {
                            state.car.map((item, idx) => {
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
                        <button type='button' onClick={onClickPrev} className={carCnt !== 0 ? null : 'hide'}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' onClick={onClickNext} className={carCnt !== Math.floor(state.carLength/4) ? null : 'hide'}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
