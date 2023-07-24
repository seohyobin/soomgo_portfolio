import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function MarketComponent() {
  const [slidePx, setSlidePx] = useState(0);
  const [isArrowPrev, setIsArrowPrev] = useState(false);
  const [isArrowNext, setIsArrowNext] = useState(true);

  const prevSibling = useRef();
  const contentBoxGap = useRef();
  const contentBoxGapSize = useRef();
  const colLength = useRef();
  const maxWidth = useRef();

  const onClickPrev = (e) => {
    prevSibling.current = e.target.parentElement.previousElementSibling;
    contentBoxGap.current = "";
    contentBoxGapSize.current = 0;
    if (prevSibling.current.classList.contains("content-box")) {
      contentBoxGap.current =
        prevSibling.current.querySelector(".content-box-gap");
      contentBoxGapSize.current = contentBoxGap.current.offsetWidth;
      console.log(slidePx);
      if (slidePx < 0) {
        setSlidePx(slidePx + contentBoxGapSize.current / 2);
      }
    }
  };

  const onClickNext = (e) => {
    prevSibling.current =
      e.target.parentElement.previousElementSibling.previousElementSibling;
    contentBoxGap.current = "";
    contentBoxGapSize.current = 0;
    colLength.current = 0;
    maxWidth.current = 0;
    if (prevSibling.current.classList.contains("content-box")) {
      contentBoxGap.current =
        prevSibling.current.querySelector(".content-box-gap");
      contentBoxGapSize.current = contentBoxGap.current.offsetWidth;
      colLength.current = contentBoxGap.current.children.length;
      maxWidth.current =
        -((contentBoxGapSize.current / 4) * colLength.current) / 2;
      if (colLength.current % 2 > 0) {
        colLength.current += 1;
      }
      if (slidePx > maxWidth.current) {
        console.log(
          -(((contentBoxGapSize.current / 4) * colLength.current) / 2)
        );
        setSlidePx(slidePx - contentBoxGapSize.current / 2);
      }
    }
  };
  useEffect(() => {
    if (slidePx === 0) {
      setIsArrowPrev(false);
    }
    else if (slidePx < 0) {
      setIsArrowPrev(true);
    }
    if (slidePx <= maxWidth.current) {
      setIsArrowNext(false);
    }
    else if (slidePx > maxWidth.current) {
      setIsArrowNext(true);
    }
  }, [slidePx]);
  return (
    <div id="market">
      <div className="container">
        <div className="gap">
          <div className="title">
            <h2>마켓</h2>
          </div>
          <div className="content">
            <div className="row1">
              <div className="input-box">
                <input
                  type="text"
                  name="search-input"
                  id="searchInput"
                  placeholder="원하는 상품을 검색해보세요"
                />
              </div>
            </div>
            <div className="row2">
              <div className="header-box">
                <ul>
                  <li>
                    <span className="on">홈</span>
                  </li>
                  <li>
                    <span>비즈니스</span>
                  </li>
                  <li>
                    <span>라이프스타일</span>
                  </li>
                  <li>
                    <span>미디어</span>
                  </li>
                  <li>
                    <span>취미</span>
                  </li>
                  <li>
                    <span>실무</span>
                  </li>
                  <li>
                    <span>학업</span>
                  </li>
                  <li>
                    <span>공동구매</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row3">
              <ul>
                <li>
                  <div className="title-box">
                    <h3>[서울] 에어컨 청소</h3>
                  </div>
                  <div className="content-box">
                    <div className="content-box-gap">
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="arrow-prev">
                    <i></i>
                  </div>
                  <div className="arrow-next">
                    <i></i>
                  </div>
                </li>
                <li>
                  <div className="title-box">
                    <h3>[경기도] 에어컨 청소</h3>
                  </div>
                  <div className="content-box">
                    <div className="content-box-gap">
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="arrow-prev">
                    <i></i>
                  </div>
                  <div className="arrow-next">
                    <i></i>
                  </div>
                </li>
                <li>
                  <div className="title-box">
                    <h3>[경남권] 에어컨 청소</h3>
                  </div>
                  <div className="content-box">
                    <div className="content-box-gap">
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="arrow-prev">
                    <i></i>
                  </div>
                  <div className="arrow-next">
                    <i></i>
                  </div>
                </li>
                <li>
                  <div className="title-box">
                    <h3>[대전,충북,제주] 에어컨 청소</h3>
                  </div>
                  <div className="content-box">
                    <div
                      className="content-box-gap"
                      style={{
                        transform: `translateX(${slidePx}px)`,
                        transition: "0.5s ease",
                      }}
                    >
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="img-box">
                          <img src="./images/market/aircon_img1.jpg" alt="" />
                        </div>
                        <div className="text-box">
                          <div className="text-row1">인테리어/시공</div>
                          <div className="text-row2">
                            [에어컨프로] 수도권 랭킹 top5 냉난방기 설치 판매
                            고객님들의 선택엔...
                          </div>
                          <div className="text-row3">150,000원 ~</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={onClickPrev}
                    style={{ display: isArrowPrev ? "" : "none" }}
                    className="arrow-prev"
                  >
                    <i></i>
                  </div>
                  <div
                    onClick={onClickNext}
                    style={{ display: isArrowNext ? "" : "none" }}
                    className="arrow-next"
                  >
                    <i></i>
                  </div>
                </li>
              </ul>
            </div>
            <div className="row4">
              <div className="title-box">
                <h4>이런 서비스는 어떠세요?</h4>
              </div>
              <div className="nav-box">
                <ul>
                  <li>
                    <span>로고 디자인</span>
                  </li>
                  <li>
                    <span>PPT 제작</span>
                  </li>
                  <li>
                    <span>미술/공예 레슨</span>
                  </li>
                  <li>
                    <span>마케팅</span>
                  </li>
                  <li>
                    <span>보컬/랩 레슨</span>
                  </li>
                  <li>
                    <span>웹/앱 개발</span>
                  </li>
                </ul>
                <div className="more-box">
                  <span>상품 더보기</span>
                </div>
              </div>
              <div className="content-box">
                <ul>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <p>에어컨 청소하여 올 여름 깨끗하게 사용하세요</p>
                      <span>80,000원~</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row5">
              <div className="title-box">
                <div className="col1">
                  <h4>비즈니스</h4>
                  <p>웹/앱 개발·로고 디자인·PPT·마케팅</p>
                </div>
                <div className="col2">
                  <span>상품 더보기</span>
                </div>
              </div>
              <div className="content-box">
                <ul>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="arrow-prev">
                <i></i>
              </div>
              <div className="arrow-next">
                <i></i>
              </div>
            </div>
            <div className="row6">
              <div className="title-box">
                <div className="col1">
                  <h4>라이프스타일</h4>
                  <p>심리·뷰티·청소·인테리어 시공</p>
                </div>
                <div className="col2">
                  <span>상품 더보기</span>
                </div>
              </div>
              <div className="content-box">
                <ul>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="arrow-prev">
                <i></i>
              </div>
              <div className="arrow-next">
                <i></i>
              </div>
            </div>
            <div className="row7">
              <div className="title-box">
                <div className="col1">
                  <h4>미디어</h4>
                  <p>음악 편집·영상 제작·사진·나레이션</p>
                </div>
                <div className="col2">
                  <span>상품 더보기</span>
                </div>
              </div>
              <div className="content-box">
                <ul>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="arrow-prev">
                <i></i>
              </div>
              <div className="arrow-next">
                <i></i>
              </div>
            </div>
            <div className="row8">
              <div className="title-box">
                <div className="col1">
                  <h4>취미</h4>
                  <p>악기·보컬·운동·미술</p>
                </div>
                <div className="col2">
                  <span>상품 더보기</span>
                </div>
              </div>
              <div className="content-box">
                <ul>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="arrow-prev">
                <i></i>
              </div>
              <div className="arrow-next">
                <i></i>
              </div>
            </div>
            <div className="row9">
              <div className="title-box">
                <div className="col1">
                  <h4>실무</h4>
                  <p>취업·N잡·코딩/디자인 레슨</p>
                </div>
                <div className="col2">
                  <span>상품 더보기</span>
                </div>
              </div>
              <div className="content-box">
                <ul>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="arrow-prev">
                <i></i>
              </div>
              <div className="arrow-next">
                <i></i>
              </div>
            </div>
            <div className="row10">
              <div className="title-box">
                <div className="col1">
                  <h4>학업</h4>
                  <p>교과목·입시·외국어</p>
                </div>
                <div className="col2">
                  <span>상품 더보기</span>
                </div>
              </div>
              <div className="content-box">
                <ul>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                  <li>
                    <div className="img-box">
                      <img src="./images/market/aircon_img1.jpg" alt="" />
                    </div>
                    <div className="text-box">
                      <span>인테리어/시공</span>
                      <p>내집처럼 꼼꼼히 하는 온동네집수리 도배</p>
                      <i>170,000원 ~</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="arrow-prev">
                <i></i>
              </div>
              <div className="arrow-next">
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
