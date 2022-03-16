/* MN500_TAB1
*  메인 공지사항
*  TODO : 현재 하드코딩되어있음 수정필요
*/

import React from 'react';

function MN500_TAB1(props) {
  return (
    <div className="tabCont" id="tab01">

      <ul className="noticeList">
        <li>
          <a href="#none">
            <div><i className="ic_notice st01">공지</i></div>
            <div><span className="tit">푸르덴셜 RFP 관련 공지를 올립니다. </span><i className="ic_new"></i></div>
            <div><span className="date">2022-03-03</span></div>
          </a>
        </li>
        <li>
          <a href="#none">
            <div><span className="ic"><i className="ic_notice st02">업데이트</i></span></div>
            <div><span className="tit">공지 업데이트 2021년 3월 업데이트안내</span></div>
            <div><span className="date">2022-02-26</span></div>
          </a>
        </li>
        <li>
          <a href="#none">
            <div><span className="ic"><i className="ic_notice st03">안내</i></span></div>
            <div><span className="tit">우리은행 프로젝트 서비스 오픈 임박 안내입니다.</span></div>
            <div><span className="date">2022-02-18</span></div>
          </a>
        </li>
      </ul>
      <p className="btn"><a href="#none">더보기</a></p>

    </div>
  )
}

export default MN500_TAB1;