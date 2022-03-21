import React, { useEffect, lazy, useState } from "react";
import axios from 'axios';
// import './PM201.css';

let CodeSelectOption = lazy( ()=> import('../../Component/CodeSelectOption.js') );


function PM201(props) {

  // INIT
  useEffect(() => {
  }, []);


  return (
    <>
      <div className="subWrap">
        <div className="inner mt10">
          <div className="gridUtil">
            <div className="fl">
              <div className="tb01">
                <table>
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span className="tit">프로젝트</span></th>
                      <td className="txtL">
                        <select className="mr20">
                          <option>미래에셋생명 비대면업무확대</option>
                          <option>NH차세대지방재정 구축</option>
                        </select>
                      </td>
                      <th scope="row"><span className="tit">프로젝트 기간</span></th>
                      <td className="txtL" colSpan={3}>
                        <span className="datepickerBox"><input type="text" placeholder="2021-08-15" /></span>
                        ~
                        <span className="datepickerBox"><input type="text" placeholder="2022-11-15" /></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            <div className="fr">
              <button type="button" className="btn01"><i className="ic_search"></i><span>조회</span></button>
            </div>
          </div>


          <div className="hr20"></div>

          <div className="gridUtil mt20">
            <div className="fr">
              <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowPlusBlue"></i><span>행추가</span></button>
              <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowMinusRed"></i><span>행삭제</span></button>
              <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowUp"></i><span>위로</span></button>
              <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowDown"></i><span>아래로</span></button>
              <button type="button" className="btn btn02 rad50 borderC2"><span>복사</span></button>
              <button type="button" className="btn btn02 rad50 borderC2"><span>붙여넣기</span></button>
              <button type="button" className="btn05"><i className="ic_excel"></i><span>다운로드</span></button>
            </div>
          </div>


          <div className="gridWrap mt10">
            <div className="tb02">
              <table>
                <caption>비용처리</caption>
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">구분</th>
                    <th scope="col">품목</th>
                    <th scope="col">원가비용</th>
                    <th scope="col">처리비용</th>
                    <th scope="col">손익금액</th>
                    <th scope="col">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="txtC" rowSpan={3}>인건비</td>
                    <td className="txtC">노무비</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">0</td>
                    <td className="txtL"></td>
                  </tr>
                  <tr>
                    <td className="txtC">외주비</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">0</td>
                    <td className="txtL"></td>
                  </tr>
                  <tr>
                    <td className="txtC">계</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">0</td>
                    <td className="txtL"></td>
                  </tr>

                  <tr>
                    <td className="txtC" rowSpan={4}>경비</td>
                    <td className="txtC">영업비</td>
                    <td className="txtR">500</td>
                    <td className="txtR">500</td>
                    <td className="txtR">0</td>
                    <td className="txtL">인건비의 5%</td>
                  </tr>
                  <tr>
                    <td className="txtC">회식비</td>
                    <td className="txtR">300</td>
                    <td className="txtR">400</td>
                    <td className="txtR">-100</td>
                    <td className="txtL"></td>
                  </tr>
                  <tr>
                    <td className="txtC">잡비</td>
                    <td className="txtR">100</td>
                    <td className="txtR">150</td>
                    <td className="txtR">50</td>
                    <td className="txtL"></td>
                  </tr>
                  <tr>
                    <td className="txtC">계</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">7,000</td>
                    <td className="txtR">0</td>
                    <td className="txtL"></td>
                  </tr>




                </tbody>
              </table>
            </div>
          </div>
          <div className="tb02 mt10">
            <table>
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <tbody>
                <tr className="tfoot">
                  <td className="txtR">합계</td>
                  <td className="txtR"></td>
                  <td className="txtR"></td>
                  <td className="txtR"></td>
                  <td className="txtR"></td>
                  <td className="txtR">189,072,917</td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className="gridUtilBottom">
            <div className="fl">
              <div>
                <p className="bullet01">안내문 내용사항입니다.</p>
              </div>
            </div>
            <div className="fr">
              <button type="button" className="btn01"><span>등록/수정</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default PM201;