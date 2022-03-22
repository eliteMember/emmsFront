import React, { useEffect, lazy, useState } from "react";
import axios from 'axios';
import './PM201.css';
import DatePicker from "react-datepicker";

let CodeSelectOption = lazy( ()=> import('../../Component/CodeSelectOption.js') );


function PM201(props) {

  const [startDate, startDateModify] = useState(new Date());
  const [endDate, endDateModify] = useState(new Date());
  const [searchErrorMsg, searchErrorMsgModify] = useState('');

  const timeSe = setTimeout(()=>{ searchErrorMsgModify(''); }, 1000);

  // INIT
  useEffect(() => {

  }, []);


  // 검색날짜 유효성 체크
  function fn_changeSearchDate(se,date)  {
    if  ( se === 'S' )  {
      if  ( fn_setDateFormatting(date) <= fn_setDateFormatting(endDate) ) {
        startDateModify(date);
        searchErrorMsgModify('');
      }  else  {
        searchErrorMsgModify('검색 시작일이 종료일보다 클 수 없습니다.');
        clearTimeout(timeSe);
      }
    }  else  {
      if  ( fn_setDateFormatting(date) >= fn_setDateFormatting(startDate) ) {
        endDateModify(date);
        searchErrorMsgModify('');
      }  else  {
        searchErrorMsgModify('검색 종료일이 시작일보다 작을 수 없습니다.');
        clearTimeout(timeSe);
      }
    }
  }


  function fn_setDateFormatting(date)  {
    var month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

    return date.getFullYear()+''+month+''+day;
  }
  

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
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span className="tit">프로젝트</span></th>
                      <td className="txtL">
                        <select className="mr20">
                          <option>프로젝트 1</option>
                          <option>프로젝트 2</option>
                        </select>
                      </td>
                      <th scope="row"><span className="tit">프로젝트 기간</span></th>
                      <td className="txtL">
                        <DatePicker locale="ko" onChange={date => fn_changeSearchDate('S',date)} selected={startDate} dateFormat="yyyy-MM-dd" />
                      </td>
                      <td>&nbsp;~&nbsp;</td>
                      <td>
                        <DatePicker locale="ko" onChange={date => fn_changeSearchDate('E',date)} selected={endDate} dateFormat="yyyy-MM-dd" />
                      </td>
                      <td>&nbsp;<label className="errorMsgSt" >{searchErrorMsg}</label></td>
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
            </div>
          </div>


          <div className="gridWrap mt10">
            <div className="tb02">
              <table>
                <caption>비용처리</caption>
                <colgroup>
                  <col className="w16p"/>
                  <col className="w16p"/>
                  <col className="w16p"/>
                  <col className="w16p"/>
                  <col className="w16p"/>
                  <col className="w20p"/>
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
                <col className="w32p"/>
                <col className="w16p"/>
                <col className="w16p"/>
                <col className="w16p"/>
                <col className="w20p"/>
              </colgroup>
              <tbody>
                <tr className="tfoot">
                  <td className="txtC">합계</td>
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