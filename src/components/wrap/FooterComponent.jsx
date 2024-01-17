import React from 'react'

export default function FooterComponent() {
  return (
    <footer id="footer">
      <div className="row1">
        <div className="left">
          <div className="top">
          <h2>1599-5319</h2>
          <p>평일 10:00 - 18:00 <br />(점심시간 13:00 - 14:00 제외 · 주말/공휴일 제외)</p>
          </div>
          <div className="bottom">
            <button className='btn1'>
              <img src="./images/footer/icon-download-appstore.svg" alt="" />
              APP STORE
            </button>
            <button className='btn2'>
              <img src="./images/footer/icon-download-palystore.svg" alt="" />
              PLAY STORE
            </button>
          </div>
        </div>
        <div className="right">
          <ul>
            <li>
              <ul>
                <h2>숨고소개</h2>
                <a href="!#">
                  <li>회사소개</li>
                  <li>채용안내</li>
                  <li>팀블로그</li>
                </a>
              </ul>
            </li>
            <li>
              <ul>
              <h2>고객안내</h2>
               <a href="!#">
                <li>이용안내</li>
                <li>안전정책</li>
                <li>예상금액</li>
                <li>고수찾기</li>
                <li>숨고보증</li>
                <li>고수에게묻다</li>
               </a>
              </ul>
            </li>
            <li>
            <ul>
                <h2>고수안내</h2>
                <a href="!#">
                  <li>이용안내</li>
                  <li>고수가이드</li>
                  <li>고수가입</li>
                  <li>고수센터</li>
                </a>
              </ul>
            </li>
            <li>
            <ul>
                <h2>고객센터</h2>
                <a href="!#">
                  <li>공지사항</li>
                  <li>자주묻는질문</li>
                </a>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="row2">
        <ul>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>위치기반 서비스 이용약관</li>
          <li>사업자 정보확인</li>
        </ul>
      </div>
      <div className="row3">
        <span>
        (주)브레이브모바일은 통신판매중개자로서 통신판매의 당사자가 아니며 개별 판매자가 제공하는 서비스에 대한 이행, 계약사항 등과 관련한 의무와 책임은 거래당사자에게 있습니다. 
        </span>
      </div>
      <div className="row4">
        <div className="left">
          <ul>
            <li> 상호명:(주)브레이브모바일 · 대표이사:KIM ROBIN H · 개인정보책임관리자:김태우 · 주소:서울특별시 강남구 테헤란로 415, L7 강남타워 5층 </li>
            <li> 사업자등록번호:120-88-22325 · 통신판매업신고증:제 2021-서울강남-00551 호 · 직업정보제공사업 신고번호:서울청 제 2019-21호 </li>
            <li>고객센터:1599-5319 · 이메일:support@soomgo.com</li>
            <li>Copyright ©Brave Mobile Inc. All Rights Reserved.</li>
          </ul>
        </div>
        <div className="right">
          <div className="img-box">
            <a href="!#">
              <img src="./images/footer/icon-footer-sns-facebook.svg" alt="" />
              <img src="./images/footer/icon-footer-sns-instagram.svg" alt="" />
              <img src="./images/footer/icon-footer-sns-naverblog.svg" alt="" />
              <img src="./images/footer/icon-footer-sns-naverpost.svg" alt="" />
              <img src="./images/footer/icon-footer-sns-tistory.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
