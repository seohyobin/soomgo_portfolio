import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Section1Component() {
    
    // slide animation setting
    const slideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);
    const [state, setState] = React.useState({
        slide: [],
        slideLength: 0
    });

    // get data
    React.useEffect(() => {
        axios({
            url: './data/home/section1.json',
            method: 'GET'
        })
        .then((res) => {
            if(res.status === 200) {
                setState({
                    ...state,
                    slide: res.data.slide,
                    slideLength: res.data.slide.length-2
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [state]);

    // slide animation
    React.useEffect(() => {
        slideWrap.current.style.width = `${(state.slideLength + 2) * 100}%`;
    }, [state.slideLength]);

    // slide animation
    React.useEffect(() => {
        if(cnt < 0){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.transform = `translateX(-${100 / (state.slideLength + 2) * state.slideLength}%)`;
            setCnt(state.slideLength - 1);
        }
        else if(cnt > state.slideLength ){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.transform = `translateX(0%)`;
            setCnt(1);
        }
        else{
            slideWrap.current.style.transition = 'all 0.5s ease-in-out';
            slideWrap.current.style.transform = `translateX(-${cnt * 100 / (state.slideLength + 2) }%)`;
        }
    }, [cnt, state.slideLength]);


    // click prev
    const onClickPrev = (e) => {
        e.preventDefault();
        setCnt(cnt - 1);
    };
    // click next
    const onClickNext = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
    };

    // auto slide
    React.useEffect(() => {
        const autoSlide = setInterval(() => {
            if(cnt >= state.slideLength){
                slideWrap.current.style.transition = 'none';
                slideWrap.current.style.transform = `translateX(0%)`;
                setCnt(1);
            }
            else{
                setCnt(cnt +1);
            }
        }, 5000);
        return () => {
            clearInterval(autoSlide);
        }
    }, [cnt, state.slideLength]);

 return (
    // main-section1 slide images
    <section id="section1">
        <div className="container">
            <ul className="slide__wrap" ref={slideWrap}>
                {
                    state.slide.map((item, idx) => {
                        return(
                            <li className="slide__item" key={idx}>
                                <div className="slide__img">
                                    <Link to='/'>
                                        <img src={item.imgSrc} alt="slide images" />
                                    </Link>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="slide__text">
                <p>
                    <span>{cnt+1 > state.slideLength ? 1 : cnt+1}/{state.slideLength}</span>
                </p>
            </div>
            <div className="slide__btn">
                <div className="btn__item--prev">
                    <button type='button' onClick={onClickPrev}><i className="fas fa-chevron-left"></i></button>
                </div>
                <div className="btn__item--next">
                    <button type='button' onClick={onClickNext}><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    </section>
  )
}
