import React from 'react';
import axios from 'axios';

export default function Section12Component() {

    const slideWrap = React.useRef();
    const [fixCnt, setfixCnt] = React.useState(0);
    const [state, setState] = React.useState({
        fix: [],
        fixLength: 0
    });

    // get data
    React.useEffect(() => {
        axios({
            url: './data/home/section9.json',
        })
        .then((res) => {
            if(res.status === 200) {
                setState({
                    fix: res.data.fix,
                    fixLength: res.data.fix.length
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [state]);

    // slide wrap width setting
    React.useEffect(() => {
        slideWrap.current.style.width = `${state.fixLength/4 * 100}%`;
        slideWrap.current.style.gridTemplateColumns = `repeat(${state.fixLength},1fr)`;
    }, [state.fixLength]);

    React.useEffect(() => {
        if( fixCnt < 0){
            setfixCnt(0);
        }
        else if( fixCnt > Math.floor(state.fixLength / 4)){
            setfixCnt(Math.floor(state.fixLength / 4));
        }
        else{
            slideWrap.current.style.transition = `all 0.3s ease-in-out`;
            slideWrap.current.style.transform = `translateX(${-fixCnt * 100 / 3}%)`;
        }
    }, [fixCnt, state.fixLength]);

    // prev btn click
    const onClickPrev = (e) => {
        e.preventDefault();
        setfixCnt(fixCnt - 1);
    };

    // next btn click
    const onClickNext = (e) => {
        e.preventDefault();
        setfixCnt(fixCnt + 1);
    };


  return (
    <section id="section9">
        <div className="container">
            <div className="title">
                <h2>무엇이든 고치는 고수들</h2>
            </div>
            <div className="slide__container">
                <div className="slide__gap">
                    <ul className="slide__wrap" ref={slideWrap}>
                        {
                            state.fix.map((item, idx) => {
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
                        <button type='button' onClick={onClickPrev} className={fixCnt !== 0 ? null : 'hide'}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' onClick={onClickNext} className={fixCnt !== Math.floor(state.fixLength/4) ? null : 'hide'}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
