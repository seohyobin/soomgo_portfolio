import React from 'react';
import axios from 'axios';

export default function Section7Component() {
  
  const popularProWrap = React.useRef();
  const [category, setCategory] = React.useState('swim');
  const [cnt, setCnt] = React.useState(0);
  const [state, setState] = React.useState({
    popularPros: [],
    filtertedPros: [],
    filteredLength: 0
  });

  // get data
  React.useEffect(() => {
    axios({
      url: './data/home/section7.json',
      method: 'GET'
    })
    .then((res) => {
      if(res.status === 200){
        setState({
          ...state,
          popularPros: res.data.popularPros,
          filtertedPros: state.popularPros.filter((item) => item.category === category),
          filteredLength: state.popularPros.filter((item) => item.category === category).length
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, [category, state]);

  React.useEffect(() => {
    popularProWrap.current.style.width = `${(state.filteredLength+1) / 4 * 100}%`;
    popularProWrap.current.style.gridTemplateColumns = `repeat(auto-fit, minmax(${state.filteredLength / 4 * 2}%, 1rem))`;
  }, [state.filteredLength]);

  // slide animation
  React.useEffect(() => {
    if(cnt < 0){
      setCnt(0);
    }
    else if(cnt > state.filteredLength / 4){
      setCnt(state.filteredLength / 4);
    }
    else{
      popularProWrap.current.style.transition = `all 0.3s ease-in-out`;
      popularProWrap.current.style.transform = `translateX(${-cnt * 100 / 8}%)`;
    }
  }, [cnt, state.filteredLength]);

  // onClickFilter
  const onClickFilter = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    setCnt(0);
  };


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


  return (
    <section id="section7">
        <div className="container">
            <div className="title">
                <h2>지금 인기 있는 고수</h2>
                <a href="!#" className='show__all'>
                    <span>전체보기</span>
                    <img src="./images/chev-right.svg" alt="오른쪽 화살표" />
                </a>
            </div>
            <div className="content">
              <div className="popular-pro__category">
                <button className={category === 'swim' ? "pro-category__btn on" : "pro-category__btn"} onClick={onClickFilter} value="swim">
                  수영 레슨
                </button>
                <button className={category === 'move' ? "pro-category__btn on" : "pro-category__btn"} onClick={onClickFilter} value="move">
                  원룸/소형 이사
                </button>
                <button className={category === 'wallpaper' ? "pro-category__btn on" : "pro-category__btn"} onClick={onClickFilter} value="wallpaper">
                  도배 시공
                </button>
                <button className={category === 'cargo' ? "pro-category__btn on" : "pro-category__btn"} onClick={onClickFilter} value="cargo">
                  용달/화물 운송
                </button>
              </div>
              <div className="popular-pro__container">
                <div className="popular-pro__box">
                  <ul className="popular-pro__wrap" ref={popularProWrap}>
                    <li className="meet-pro__item">
                      <a href="!#">
                        <img src="./images/pro_icon.svg" alt="고수 만나보기 아이콘" />
                        <p className="meet-pro__num">
                          <span className="meet-pro__total">{state.filteredLength}명</span>
                          <span className="meet-pro__text">의</span>
                        </p>
                        <div className="meet-pro__subtext">
                          <span className="meet-pro__text">고수 만나보기</span>
                          <img src="./images/chev-right.svg" alt="오른쪽 화살표" />
                        </div>
                      </a>
                    </li>
                    {
                      state.filtertedPros.map((item,idx) => {
                        return(
                          <li className="popular-pro__item" key={idx}>
                            <a href="!#">
                              <div className="popular-pro__header">
                                <div className="popular-pro__img">
                                  <img src={item.img} alt="고수 프로필사진" />
                                </div>
                                <div className="popular-pro__desc">
                                  <img src="./images/star_icon.svg" alt="별점" />
                                  <span className="rate">{item.rate}</span>
                                </div>
                              </div>
                              <p className="popular-pro__name">{item.name}</p>
                              <div className="chips">
                                <span className="soomgopay-chip">
                                  <img src="./images/soomgopay.svg" alt="숨고페이" />
                                  <span>숨고페이</span>
                                </span>
                              </div>
                              <div className="sub-info">
                                <span>경력 {item.exp}년</span>
                                <span>평균 {item.res_time} 내 응답</span>
                              </div>
                            </a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="popular-pro__btn">
                    <div className="btn__item--prev">
                        <button type='button' onClick={onClickPrev} className={cnt !== 0 ? null : 'hide'}><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="btn__item--next">
                        <button type='button' onClick={onClickNext} className={cnt !== state.filteredLength/4 ? null : 'hide'}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </section>
  )
}
