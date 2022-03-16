/* MN500_TAB3
*  메인 문서양식
*  TODO : 현재 하드코딩되어있음 수정필요
*/

import React from 'react';

function MN500_TAB3(props) {
  return (
     <div className="tabCont" id="tab03">

     <ul className="noticeList">
       <li>
         <a href="#none">
           <div><span className="tit">문서양식 출력 시스템 환경 변경 안내</span><i className="ic_new"></i></div>
           <div><span className="date">2022-03-03</span></div>
         </a>
       </li>
       <li>
         <a href="#none">
           <div><span className="tit">문서양식 시스템 2022년 3월 업데이트안내</span></div>
           <div><span className="date">2022-02-28</span></div>
         </a>
       </li>
       <li>
         <a href="#none">
           <div><span className="tit">2022년 RFP 문서양식입니다.</span></div>
           <div><span className="date">2022-02-13</span></div>
         </a>
       </li>
     </ul>
     <p className="btn"><a href="#none">더보기</a></p>

   </div>
  )
}

export default MN500_TAB3;