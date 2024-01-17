import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function GosooComponent() {
  const param = useParams();
  const [gosooData, setGosooData] = useState(null); // 초기값을 null로 설정

  useEffect(() => {
    axios({
      url: "./data/finding/gosoo.json",
      method: "GET",
    })
    .then((res) => {
      let intParam = parseInt(param.id);
      let gosooData = res.data.gosoo;
      if (res.status === 200) {
        gosooData.map((item, idx) => {
          if (item.id === intParam) {
            setGosooData(item);
          }
          console.log(intParam);
        });
      }
    });
  }, [param]);


  if(gosooData!==undefined && gosooData !==null){
    return (        <div key={gosooData.id} id="gosoo">
    <div className="header-img-box" style={{backgroundImage: `url(${gosooData.profile_img_name})`}}></div>
    <div className="fake-box"></div>
    <div className="container">
      <div className="gap">
        <div className="content">
          <div className="row1">
            <div className="brand-img-box" >
              <div className="img-border-gap" style={{backgroundImage: `url(${gosooData.profile_img_name})`}}></div>
            </div>
          </div>
          <div className="row2">
            <div className="col1">
              <ul>
                <li>
                  <h3>{gosooData.brand}</h3>
                </li>
                <li>
                  <span>{gosooData.category}</span>
                </li>
                <li>
                  <p>{gosooData.body1}</p>
                </li>
                <li>
                  <div className="check1">
                    <img
                      src="./images/finding/gosoo/icon_check.svg"
                      alt=""
                    />
                    <span>본인인증</span>
                  </div>
                  <div className="check2">
                    <img
                      src="./images/finding/gosoo/icon_check.svg"
                      alt=""
                    />
                    <span>사업자등록증</span>
                  </div>
                  <div className="check3">
                    <img
                      src="./images/finding/gosoo/icon_soomgopay.svg"
                      alt=""
                    />
                    <i>숨고페이</i>
                  </div>
                </li>
                <li>
                  <div className="simple-info-box">
                    <div className="col1">
                      <span>고용</span>
                      <i>{gosooData.employment}</i>
                    </div>
                    <div className="col2">
                      <span>리뷰</span>
                      <div className="star-box">
                        <img src="./images/finding/icon_star.svg" alt="" />
                        <i>{gosooData.review}</i>
                      </div>
                    </div>
                    <div className="col3">
                      <span>총 경력</span>
                      <i>{gosooData.career}</i>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="gosoo-header">
                    <ul>
                      <li>
                        <span>고수 정보</span>
                      </li>
                      <li>
                        <span>포트폴리오</span>
                      </li>
                      <li>
                        <span>사진/동영상</span>
                      </li>
                      <li>
                        <span>리뷰</span>
                      </li>
                      <li>
                        <span>질문답변</span>
                      </li>
                      <li>
                        <span>커뮤니티</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="gosoo-info-box">
                    <ul>
                      <li>
                        <h5>고수 정보</h5>
                        <div className="member-box">
                          <img
                            src="./images/finding/gosoo/icon_member.svg"
                            alt=""
                          />
                          <span>{`직원수 ${gosooData.member}명`}</span>
                        </div>
                        <div className="time-box">
                          <img
                            src="./images/finding/gosoo/icon_time.svg"
                            alt=""
                          />
                          <span>
                            연락 가능 시간: 오전 12시 - 오후 11시
                          </span>
                        </div>
                        <div className="pay-box">
                          <img
                            src="./images/finding/gosoo/icon_card.svg"
                            alt=""
                          />
                          <span>숨고페이, 계좌이체, 현금결제 가능</span>
                        </div>
                        <div className="tax-box">
                          <img
                            src="./images/finding/gosoo/icon_tax.svg"
                            alt=""
                          />
                          <span>세금계산서 발행 가능</span>
                        </div>
                      </li>
                      <li>
                        <h5>서비스 상세설명</h5>
                        <p>{gosooData.body2}</p>
                      </li>
                      <li>
                        <h5>가격 책정 기준</h5>
                        <p>
                          고객의 예산에 맞추어 각 품목별 견적을 작성하여
                          예산에 어긋남이 없이 진행합니다.
                        </p>
                      </li>
                      <li>
                        <h5>제공 서비스</h5>
                        <button>집 인테리어</button>
                        <button>중문 시공</button>
                        <button>외벽 리모델링</button>
                        <button>집 수리</button>
                        <button>베란다/발코니 확장</button>
                        <button>주택 리모델링</button>
                        <button>홈 스타일링</button>
                        <button>주방 리모델링</button>
                        <button>조명 인테리어</button>
                        <button>상업공간 인테리어</button>
                        <button>아파트 인테리어</button>
                        <button>인테리어 도면</button>
                      </li>
                      <li>
                        <h5>경력</h5>

                        <span>
                          <img
                            src="./images/finding/gosoo/icon_academy.svg"
                            alt=""
                          />
                          총 경력 10년
                        </span>
                      </li>
                      <li>
                        <h5>학력</h5>
                        <h6>서울사이버대학교</h6>
                        <i>2021년 3월 - 현재</i>
                        <p>건축공간디자인학과</p>
                      </li>
                      <li>
                        <h5>사진 및 동영상</h5>
                        <div className="img-container">
                          <div className="img-box">
                            <img
                              src={`./images/finding/gosoo/${gosooData.img1}`}
                              alt=""
                            />
                          </div>
                          <div className="img-box">
                            <img
                              src={`./images/finding/gosoo/${gosooData.img2}`}
                              alt=""
                            />
                          </div>
                          <div className="img-box">
                            <img
                              src={`./images/finding/gosoo/${gosooData.img3}`}
                              alt=""
                            />
                          </div>
                          <div className="img-box">
                            <img
                              src={`./images/finding/gosoo/${gosooData.img4}`}
                              alt=""
                            />
                          </div>
                          <div className="img-box">
                            <img
                              src={`./images/finding/gosoo/${gosooData.img5}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col2">
              <div className="service-price">
                <p>홈앤인 고수에게 원하는 서비스의 견적을 받아보세요</p>
                <div className="btn-box">
                  <button>
                    <img
                      src="../images/finding/gosoo/icon_heart.svg"
                      alt=""
                    />
                  </button>
                  <button>견적 요청</button>
                </div>
              </div>
              <div className="span-box">
                <span>
                  평균 <i>1시간 내</i> 응답하는 고수입니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
  } 
  else {
    return (
      <><h2>로딩중...</h2></>
    )
  }

}
