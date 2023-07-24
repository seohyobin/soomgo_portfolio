import React from 'react';
import axios from 'axios';

export default function Section3Component() {
    
    // slide animation setting
    const [state, setState] = React.useState({
        mainServices: [],
        mainServicesLength: 0
    });
    const [cnt, setCnt] = React.useState(0);
    const mainServiceWrap = React.useRef();
    // get data
    React.useEffect(() => {
        axios({
            url: './data/home/section3.json',
            method: 'GET'
        })
        .then((res) => {
            if(res.status === 200){
                setState({
                    ...state,
                    mainServices: res.data.mainServices,
                    mainServicesLength: res.data.mainServices.length
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [state]);

    // slide wrap width setting
    React.useEffect(() => {
        mainServiceWrap.current.style.width = `${state.mainServicesLength / 4 * 100}%`;
        mainServiceWrap.current.style.gridTemplateColumns = `repeat(${state.mainServicesLength},1fr)`;
    }, [state.mainServicesLength]);

    // slide animation
    React.useEffect(() => {
        if(cnt < 0){
            setCnt(0);
        }
        else if(cnt > state.mainServicesLength / 4){
            setCnt(state.mainServicesLength / 4);
        }
        else{
            mainServiceWrap.current.style.transition = `all 0.3s ease-in-out`;
            mainServiceWrap.current.style.transform = `translateX(${-cnt * 100 / 4}%)`;
        }
    }, [cnt, state.mainServicesLength]);

    // btn prev click
    const onClickPrev = (e) => {
        e.preventDefault();
        setCnt(cnt - 1);
    };

    // btn next click
    const onClickNext = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
    };

    // comma function
    const commaFn=(nums)=>{
        let value = nums.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        }        
    }
  return (
    // main-section3 main services
      <section id="section3">
        <div className="container">
            <div className="title">
                <h2>숨고 인기 서비스</h2>
            </div>
            <div className="content">
                <div className="main-service__box">
                    <ul className="main-services__wrap" ref={mainServiceWrap}>
                        {
                            state.mainServices.map((item, idx) => {
                                return(
                                    <li className="main-services__item" key={idx}>
                                        <a href="!#" className="main-services__link">
                                            <div className="main-services__content">
                                                <img src={item.imgSrc} alt={item.name} />
                                            </div>
                                            <div className="main-services__title">
                                                <p>{item.name}</p>
                                            </div>
                                            <div className="main-services__icon">
                                                <img src="./images/home/section3/mail.svg" alt="메일 아이콘" />
                                                <span>{commaFn(item.request)}</span> 명 요청
                                            </div>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="main-services__btn">
                    <div className="btn__item--prev">
                        <button type='button' className={cnt!==0 ? null : 'hide'} onClick={onClickPrev}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' className={cnt!==state.mainServicesLength/4 ? null : 'hide'} onClick={onClickNext}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
