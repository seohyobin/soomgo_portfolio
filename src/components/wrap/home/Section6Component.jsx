import React from 'react';
import axios from 'axios';

export default function Section6Component() {

    const portfolioWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);
    const [state, setState] = React.useState({
        portfolios: [],
        portfoliosLength: 0
    });

    React.useEffect(() => {
        axios({
            url: './data/home/section6.json',
            method: 'GET'
        })
        .then((res) => {
            if(res.status === 200){
                setState({
                    ...state,
                    portfolios: res.data.portfolios,
                    portfoliosLength: res.data.portfolios.length
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [state]);

    // slide wrap width setting
    React.useEffect(() => {
        portfolioWrap.current.style.width = `${state.portfoliosLength / 4 * 100}%`;
        portfolioWrap.current.style.gridTemplateColumns = `repeat(${state.portfoliosLength},1fr)`;
    }, [state.portfoliosLength]);

    // slide animation
    React.useEffect(() => {
        if( cnt < 0){
            setCnt(0);
        }
        else if( cnt > state.portfoliosLength / 4 ){
            setCnt(state.portfoliosLength / 4);
        }
        else{
            portfolioWrap.current.style.transition = `all 0.3s ease-in-out`;
            portfolioWrap.current.style.transform = `translateX(${-cnt * 100 / 4}%)`;
        }
    }, [cnt, state.portfoliosLength]);

    // btn prev click
    const onClickPrev = (e) => {
        e.preventDefault();
        setCnt(cnt - 1);
        console.log(cnt);
    };
    // btn next click
    const onClickNext = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
    };

  return (
    <section id="section6">
        <div className="container">
            <div className="title">
                <h2>숨은고수 포트폴리오</h2>
                <a href="!#" className='show__all'>
                    <span>전체보기</span>
                    <img src="./images/chev-right.svg" alt="오른쪽 화살표" />
                </a>
            </div>
            <div className="content">
                <div className="portfolio__box">
                    <ul className="portfolio__wrap" ref={portfolioWrap}>
                        {
                            state.portfolios.map((item, idx) => {
                                return(
                                    <li className="portfolio__item" key={idx}>
                                        <a href="!#" className="portfolio__content">
                                            <div className="portfolio__img">
                                                <img src={item.img} alt="포트폴리오 이미지" />
                                            </div>
                                            <div className="portfolio__desc">
                                                <h3>{item.title}</h3>
                                                <p>{item.job}</p>
                                            </div>
                                        </a>
                                        <a href="!#" className="portfolio__profile">
                                            <div className="portfolio__profile__img">
                                                <img src={item.profile} alt="유저 프로필 이미지" />
                                            </div>
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="portfolio__btn">
                    <div className="btn__item--prev">
                        <button type='button' onClick={onClickPrev} className={cnt !== 0 ? null : 'hide'}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' onClick={onClickNext} className={cnt !== state.portfoliosLength/4 ? null : 'hide'}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
