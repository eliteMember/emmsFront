/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Grid from '../Component/Grid/grid'

const test = {
    header : ['헤더2222222222221','헤더2','헤더3','헤더4','헤더5']
    ,body  : [['바디1','바디2','바디3','바디4','바디5'],['바디11','바디22','바디33','바디44','바디55']]
  }
function PM101(props) {
    return (
        <div>
            <Grid type="tb02" data={test} style={{body:'0.0 : rowSpan 5'}}/>
        </div>
//         <div className="subPage">
//             <div className="subWrap">
//                 <div className="inner mt10">

//                     <div className="gridUtil">
//                         <div className="fl">
//                             <div className="tb01">
//                                 <table>
//                                     <colgroup>
//                                         <col></col>
//                                         <col></col>
//                                         <col></col>
//                                         <col></col>
//                                     </colgroup>
//                                     <tbody>
//                                         <tr>
//                                             <th scope="row"><span className="tit">프로젝트</span></th>
//                                             <td className="txtL">
//                                                 <select className="mr20">
//                                                     <option>미래에셋생명 비대면업무확대</option>
//                                                     <option>NH차세대지방재정 구축</option>
//                                                 </select>
//                                             </td>
//                                             <th scope="row"><span className="tit">프로젝트 기간</span></th>
//                                             <td className="txtL" colSpan="3">
//                                                 <span className="datepickerBox"><input type="text" placeholder="2021-08-15"/></span>
//                                                 ~
//                                                 <span className="datepickerBox"><input type="text" placeholder="2022-11-15"/></span>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>

//                         </div>
//                         <div className="fr">
//                             <button type="button" className="btn01"><i className="ic_search"></i><span>조회</span></button>
//                         </div>
//                     </div>

//                     <div className="hr20"></div>

//                     <div className="gridUtil mt20">
//                         <div className="fr">
//                             <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowPlusBlue"></i><span>행추가</span></button>
//                             <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowMinusRed"></i><span>행삭제</span></button>
//                             <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowUp"></i><span>위로</span></button>
//                             <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowDown"></i><span>아래로</span></button>
//                             <button type="button" className="btn btn02 rad50 borderC2"><span>복사</span></button>
//                             <button type="button" className="btn btn02 rad50 borderC2"><span>붙여넣기</span></button>
//                             <button type="button" className="btn05"><i className="ic_excel"></i><span>다운로드</span></button>
//                         </div>
//                     </div>

//                     <div className="gridWrap mt10">
//                         <div className="tb02">
//                             <table>
//                                 <caption>실투입공수관리</caption>
//                                 <colgroup>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                     <col></col>
//                                 </colgroup>
//                                 <thead>
//                                     <tr>
//                                         <th scope="col">업무구분</th>
//                                         <th scope="col">하위업무구분</th>
//                                         <th scope="col">역할</th>
//                                         <th scope="col">이름</th>
//                                         <th scope="col">등급</th>
//                                         <th scope="col">M1 (21.08)</th>
//                                         <th scope="col">M2 (21.09)</th>
//                                         <th scope="col">M3 (21.10)</th>
//                                         <th scope="col">M4 (21.11)</th>
//                                         <th scope="col">M5 (21.12)</th>
//                                         <th scope="col">M6 (22.01)</th>
//                                         <th scope="col">M7 (22.02)</th>
//                                         <th scope="col">M8 (22.03)</th>
//                                         <th scope="col">M9 (22.04)</th>
//                                         <th scope="col">M10 (22.05)</th>
//                                         <th scope="col">M11 (22.06)</th>
//                                         <th scope="col">M12 (22.07)</th>
//                                         <th scope="col">M13 (22.08)</th>
//                                         <th scope="col">M14 (22.09)</th>
//                                         <th scope="col">M15 (22.10)</th>
//                                         <th scope="col">M16 (22.05)</th>
//                                         <th scope="col">합계</th>
//                                         <th scope="col">비고</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td className="txtC" rowSpan="5">개발</td>
//                                         <td className="txtC" rowSpan="2">업무총괄PL</td>
//                                         <td className="txtC">업무PL</td>
//                                         <td className="txtC">TBD1</td>
//                                         <td className="txtC">특급</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtR">6.0</td>
//                                         <td className="txtR"></td>
//                                     </tr>
//                                     <tr>
//                                         <td className="txtC" colSpan="3">소계</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtR">6.0</td>
//                                         <td className="txtR"></td>
//                                     </tr>
//                                     <tr>
//                                         <td className="txtC" rowSpan="5">비대면 처리가능 업무</td>
//                                         <td className="txtC" rowSpan="2">업무개발TL</td>
//                                         <td className="txtC">TBD2</td>
//                                         <td className="txtC">중급</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtR">6.0</td>
//                                         <td className="txtR"></td>
//                                     </tr>
//                                     <tr>
//                                         <td className="txtC">TBD3</td>
//                                         <td className="txtC">초급</td>
//                                         <td className="txtC">0.5</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtR">6.0</td>
//                                         <td className="txtR"></td>
//                                     </tr>
//                                     <tr>
//                                         <td className="txtC" colSpan="3">소계</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtC">1,0</td>
//                                         <td className="txtC">1.0</td>
//                                         <td className="txtR">6.0</td>
//                                         <td className="txtR"></td>
//                                     </tr>

//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                     <div className="tb02 mt10">
//                         <table>
//                             <caption>실투입공수관리</caption>
//                             <colgroup>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                                 <col></col>
//                             </colgroup>
//                             <tbody>
//                                 <tr className="tfoot">
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR"></td>
//                                     <td className="txtR">189,072,917</td>
//                                 </tr>

//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="gridUtilBottom">
//                         <div className="fl">
//                             <div>
//                                 <p className="bullet01">안내문 내용사항입니다.</p>
//                             </div>
//                         </div>
//                         <div className="fr">
//                             <button type="button" className="btn01"><span>등록/수정</span></button>
//                         </div>
//                     </div>


//                 </div>
//             </div>
//         </div>
    )
}

export default PM101;