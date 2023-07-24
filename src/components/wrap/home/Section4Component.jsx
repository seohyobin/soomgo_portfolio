import React from 'react';
import axios from 'axios';

export default function Section4Component() {
  const [state, setState] = React.useState({
    proCards: []
  });
  // get data
  React.useEffect(() => {
    axios({
      url: './data/home/section4.json',
      method: 'GET'
    })
    .then((res) => {
      if(res.status === 200){
        setState({
          ...state,
          proCards: res.data.proCards
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, [state]);

  return (
    <section id="section4">
        <div className="container">
            <div className="title">
                <h2>숨고와 함께하는 소상공인 고수</h2>
                <button type='button'><span></span></button>
            </div>
            <div className="content">
              <ul className="pro-advertise__list">
                {
                  state.proCards.map((item, idx) => {
                    if(idx < 2){
                      return(
                        <li className="pro-advertise__item" key={idx}>
                          <a href="!#" className="pro-advertise__card">
                            <div className="pro-advertise__header">
                              <div className="pro__info">
                                <img src={item.img} alt="pro logo" />
                                <div className="pro__brand">
                                  <p className="pro__service">{item.service}</p>
                                  <p className="pro__name">{item.name}</p>
                                </div>
                              </div>
                              <div className="more">
                                <span>더보기</span>
                                <i className="fa-solid fa-chevron-right"></i>
                              </div>
                            </div>
                            <p className="pro-advertise__intro">{item.intro}</p>
                            <div className="pro-advertise__ect">
                              <div className="review-rate">
                                <span></span>
                                <span className="rate">{item.rate}</span>
                                <span className="review">{item.review === '' ? null : `(${item.review})`}</span>
                              </div>
                              <span>{item.use === '' ? null : `고용 ${item.use}회`}</span>
                              <span>경력 {item.exp}년</span>
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
    </section>
  )
}
