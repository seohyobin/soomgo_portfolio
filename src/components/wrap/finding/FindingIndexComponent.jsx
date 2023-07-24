import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindingIndexComponent() {
  const [gosooData, setGosooData] = useState();

  useEffect(() => {
    axios({
      url: "./data/finding/gosoo.json",
      method: "GET",
    }).then((res) => {
      console.log(res.data.gosoo);
      if (res.status === 200) {
        setGosooData(res.data.gosoo);
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="gap">
        <div className="title">
          <h2>고수찾기</h2>
        </div>
        <div className="content">
          <div className="row1">
            <button>서비스</button>
            <button>지역</button>
          </div>
          <div className="row2">
            <div className="col1">
              <div className="filter">
                <div className="filter-row1">
                  <div className="filter-col1">
                    <span>필터</span>
                  </div>
                  <div className="filter-col2">
                    <span>초기화</span>
                    <img src="./images/finding/icon_reloading.svg" alt="" />
                  </div>
                </div>
                <div className="filter-row2">
                  <span>서비스 분야를 선택해 주세요.</span>
                  <p>
                    서비스 분야를 선택하면 나에게 딱 맞는 고수를 필터링에 찾아볼
                    수 있어요!
                  </p>
                </div>
              </div>
            </div>
            <div className="col2">
              <div className="search">
                <div className="search-row1">
                  <span>리뷰 많은 순</span>
                </div>
                <div className="search-row2">
                  <input
                    type="text"
                    name="search_input"
                    id="searchInput"
                    placeholder="내 주변 고수 누가 있지?"
                  />
                </div>
                <div className="search-row3">
                  <ul>
                    {gosooData === undefined ? (
                      <h2>로딩중....</h2>
                    ) : (
                      <>
                        {gosooData.map((item, idx) => {
                          return (
                            <li key={idx}>
                              <Link to={`${item.id}`}>
                                <div className="gosoo">
                                  <div className="gosoo-col1">
                                    <div className="gosoo-row1">
                                      <h5>{item.brand}</h5>
                                    </div>
                                    <div className="gosoo-row2">
                                      <p>{item.body1}</p>
                                    </div>
                                    <div className="gosoo-row3">
                                      <img
                                        src="./images/finding/icon_star.svg"
                                        alt=""
                                      />
                                      <span>{item.review}</span>
                                      <div className="pay">
                                        <img
                                          src="./images/finding/icon_soomgopay.svg"
                                          alt=""
                                        />
                                        <span>숨고페이</span>
                                      </div>
                                    </div>
                                    <div className="gosoo-row4">
                                      <span>경력 1년 · 평균 30분 내 응답</span>
                                    </div>
                                  </div>
                                  <div className="gosoo-col2">
                                    <div className="profile-img-box">
                                      <img
                                        src={`./images/finding/gosoo/${item.profile_img_name}`}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
