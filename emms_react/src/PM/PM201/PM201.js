import React, { useEffect, lazy, useState } from "react";
import axios from 'axios';
import './PM201.css';

function PM201(props) {

  let [project, projectModify] = useState([]);               // 프로젝트 목록
  let [startDate, startDateModify] = useState('2022-01');    // 프로젝트 시작 년월
  let [endDate, endDateModify] = useState('2022-04');        // 프로젝트 종료 년월

  // INIT
  useEffect(() => {
    axios.post('/api/pm101/getPrjList', {})
        .then((rs) => {
          projectModify(rs.data);               // 셀렉트 박스 세팅
          fn_choiceProject(rs.data[0]);  // 프로젝트 선택 이벤트
        }).catch(() => {
            console.log("error");
        })
  }, []);

  // 프로젝트 선택 이벤트
  function fn_choiceProject(optionValue)  {
    var stD = '';
    var edD = '';
    if  ( typeof optionValue === 'object' )  {
      stD = optionValue.prjStartYm;
      edD = optionValue.prjEndYm;
    }  else  {
      project.map((prj, i)=>{
        if  ( prj.prjNum == optionValue )  {
          stD = prj.prjStartYm;
          edD = prj.prjEndYm;
        }
      });
    }

    // 프로젝트 기간 변경
    startDateModify(stD.substring(0,4)+'-'+stD.substring(4,6));
    endDateModify(edD.substring(0,4)+'-'+edD.substring(4,6));

    // TODO 목록 화면 새로 그려줌

  }

  function ListView() {
    return (
      <>
        <div className="gridWrap mt10">
          <div className="tb02">
            <table>
              <caption>비용처리</caption>
              <colgroup>
                <col className="w16p" />
                <col className="w16p" />
                <col className="w16p" />
                <col className="w16p" />
                <col className="w16p" />
                <col className="w20p" />
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
                  <td className="txtC" rowSpan={3}>
                    인건비<br/>
                    <div className="mt10">
                        <button type="button" className="btnS6 rad50 borderC2" ><i className="ic_rowPlusBlue"></i></button>
                        <button type="button" className="btnS7 rad50 borderC2" ><i className="ic_rowMinusRed"></i></button>
                    </div>
                  </td>
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
                  <th className="txtC">계</th>
                  <th className="txtR">7,000</th>
                  <th className="txtR">7,000</th>
                  <th className="txtR">0</th>
                  <th className="txtL"></th>
                </tr>
                <tr>
                  <td className="txtC" rowSpan={4}>경비
                    <div className="mt10">
                        <button type="button" className="btnS6 rad50 borderC2" ><i className="ic_rowPlusBlue"></i></button>
                        <button type="button" className="btnS7 rad50 borderC2" ><i className="ic_rowMinusRed"></i></button>
                    </div>
                  </td>
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
                  <th className="txtC">계</th>
                  <th className="txtR">7,000</th>
                  <th className="txtR">7,000</th>
                  <th className="txtR">0</th>
                  <th className="txtL"></th>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
        <div className="tb02 mt10">
          <table>
            <colgroup>
              <col className="w32p" />
              <col className="w16p" />
              <col className="w16p" />
              <col className="w16p" />
              <col className="w20p" />
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
      </>
    )
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
                        <select className="mr20" onChange={(e)=>{ fn_choiceProject(e.target.value) }} >
                          {
                            project.map((data, i)=>{
                              return (
                                <option key={i} value={data.prjNum} >{data.prjNm}</option>
                              )
                            })
                          }
                        </select>
                      </td>
                      <th scope="row"><span className="tit">프로젝트 기간</span></th>
                      <td className="txtL">
                        <label className="pmLabelSt" >{startDate}</label>
                      </td>
                      <td>&nbsp;~&nbsp;</td>
                      <td>
                        <label className="pmLabelSt" >{endDate}</label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="hr20"></div>
          <div className="gridUtil mt20">
            <div className="fr">
              <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowPlusBlue"></i><span>행추가</span></button>
              <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowMinusRed"></i><span>행삭제</span></button>
            </div>
          </div>

          <ListView />

          <div className="gridUtilBottom">
            <div className="fl">
              <div>
                <p className="bullet01">안내문 내용사항입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default PM201;