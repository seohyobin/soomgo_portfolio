import React from 'react';
import axios from 'axios';

export default function Section9Component() {

    const slideWrap = React.useRef();
    const [cleanCnt, setCleanCnt] = React.useState(0);
    const [state, setState] = React.useState({
        clean: [],
        cleanLength: 0
    });

    // get data
    React.useEffect(() => {
        axios({
            url: './data/home/section9.json',
        })
        .then((res) => {
            if(res.status === 200) {
                setState({
                    clean: res.data.clean,
                    cleanLength: res.data.clean.length
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [state]);

    // slide wrap width setting
    React.useEffect(() => {
        slideWrap.current.style.width = `${state.cleanLength/4 * 100}%`;
        slideWrap.current.style.gridTemplateColumns = `repeat(${state.cleanLength},1fr)`;
    }, [state.cleanLength]);

    React.useEffect(() => {
        if( cleanCnt < 0){
            setCleanCnt(0);
        }
        else if( cleanCnt > Math.floor(state.cleanLength / 4)){
            setCleanCnt(Math.floor(state.cleanLength / 4));
        }
        else{
            slideWrap.current.style.transition = `all 0.3s ease-in-out`;
            slideWrap.current.style.transform = `translateX(${-cleanCnt * 100 / 3}%)`;
        }
    }, [cleanCnt, state.cleanLength]);

    // prev btn click
    const onClickPrev = (e) => {
        e.preventDefault();
        setCleanCnt(cleanCnt - 1);
    };

    // next btn click
    const onClickNext = (e) => {
        e.preventDefault();
        setCleanCnt(cleanCnt + 1);
    };


  return (
    <section id="section9">
        <div className="container">
            <div className="title">
                <h2>쓱싹쓱싹 청소하는 날</h2>
            </div>
            <div className="slide__container">
                <div className="slide__gap">
                    <ul className="slide__wrap" ref={slideWrap}>
                        {
                            state.clean.map((item, idx) => {
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
                        <button type='button' onClick={onClickPrev} className={cleanCnt !== 0 ? null : 'hide'}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' onClick={onClickNext} className={cleanCnt !== Math.floor(state.cleanLength/4) ? null : 'hide'}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
