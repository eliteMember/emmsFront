import React, { useEffect, lazy, useState } from "react";
import axios from 'axios';
import './ME101.css';
import '../css/daycare_user_layout.css';
import '../css/jquery-ui.css';

let CodeSelectOption = lazy( ()=> import('../Component/CodeSelectOption.js') );


function ME101(props) {

  let [listData, listDataModify] = useState([]);          // 목록
  let [searchName, searchNameModify] = useState('');      // 이름 검색
  let [searchRnkCd, searchRnkCdModify] = useState('all'); // 등급 검색
  
  /* From Data */
  let [memNum, memNumModify] = useState('');         // 번호
  let [memName, memNameModify] = useState('');       // 이름
  let [memBirMd, memBirMdModify] = useState('');     // 인력생년월일
  let [incCd, incCdModify] = useState('');           // 직위코드
  let [memRnkCd, memRnkCdModify] = useState('');     // 인력등급코드
  let [eduCd, eduCdModify] = useState('');           // 학력코드
  let [ctfNm, ctfNmModify] = useState('');           // 자격증명
  let [memUnp, memUnpModify] = useState('');         // 인력단가
  let [memFcst, memFcstModify] = useState('');       // 인력원가
  let [memCtt, memCttModify] = useState('');         // 인력연락처
  let [memAdr, memAdrModify] = useState('');         // 인력주소
  let [affTimName, affTimNameModify] = useState(''); // 소속팀이름
  let [affCoName, affCoNameModify] = useState('');   // 소속회사이름
  
  // From DataModify Group
  let formDataList = ([memNumModify,memNameModify,memBirMdModify,incCdModify,memRnkCdModify,eduCdModify,ctfNmModify
                      ,memUnpModify,memFcstModify,memCttModify,memAdrModify,affTimNameModify,affCoNameModify]);

  // INIT
  useEffect(() => {
    axios.post('/api/memList', {
      memRnkCd: 'all'
    }).then(function (res) {
      console.log(res.data.list);
      listDataModify(res.data.list);
    })
  }, []);

  // 조회
  function fn_search(){
    axios.post('/api/memList', {
      memName : searchName,
      memRnkCd: searchRnkCd
    }).then(function (res) {
      listDataModify(res.data.list);
    });
  }

  // Enter Key Event
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      fn_search();
    }
  }

  // GET DATA
  function fn_getMemTargetData(paramMemNum) {
    axios.post('/api/memTargetData', {
      memNum: paramMemNum
    }).then(function (res) {
      for  ( var data in res.data.value )  {
        if  ( data === "memNum" )  memNumModify(res.data.value[data]);        // 번호
        if  ( data === "memName" )  memNameModify(res.data.value[data]);      // 이름
        if  ( data === "memBirMd" )  memBirMdModify(res.data.value[data]);    // 생년월일
        if  ( data === "ctfNm" )  ctfNmModify(res.data.value[data]);          // 자격증정보
        if  ( data === "memUnp" )  memUnpModify(res.data.value[data]);        // 인력단가
        if  ( data === "memFcst" )  memFcstModify(res.data.value[data]);      // 인력원가
        if  ( data === "memCtt" )  memCttModify(res.data.value[data]);        // 연락처
        if  ( data === "memAdr" )  memAdrModify(res.data.value[data]);        // 주소
        if  ( data === "affTimName" )  affTimNameModify(res.data.value[data]);// 소속팀명
        if  ( data === "affCoName" )  affCoNameModify(res.data.value[data]);  // 회사명
        if  ( data === "incCd" )  incCdModify(res.data.value[data]);          // 직위
        if  ( data === "memRnkCd" )  memRnkCdModify(res.data.value[data]);    // 등급
        if  ( data === "eduCd" )  eduCdModify(res.data.value[data]);          // 학력
      }
    });
  }

  // ADD DATA
  function fn_addEvent() {

    let checkValidation = true;
    
    const allDataList = [memNum,memName,memBirMd,incCd,memRnkCd,eduCd,ctfNm,memUnp,memFcst,memCtt,memAdr,affTimName,affCoName];
    const notNull = [memName, memBirMd, incCd, memRnkCd, eduCd, memUnp, memFcst, memCtt, memAdr];
    const numberType = [memBirMd, memUnp, memFcst];
    const numberCheckStyle = /^[0-9]*$/;


    for  ( var objNum in allDataList )  {
      /* 필수항목 체크 */
      if  ( notNull.includes(allDataList[objNum]) && (allDataList[objNum] === "" || allDataList[objNum] === "선택") )  {
        alert('필수 입력학목이 누락되었습니다.');
        checkValidation = false;
        break;
      }

      /* 숫자항목 체크 */
      if  ( numberType.includes(allDataList[objNum]) && allDataList[objNum] !== "" && !numberCheckStyle.test(allDataList[objNum]) )  {
        let targetNm = '';
        if  ( allDataList[objNum] === memBirMd )  targetNm = "생년월일";
        else if  ( allDataList[objNum] === memUnp )  targetNm = "인력단가";
        else if  ( allDataList[objNum] === memFcst )  targetNm = "인력원가";

        alert(targetNm+' 항목은 숫자만 입력 가능합니다.');
        checkValidation = false;
        break;
      }

      /* 생년월일 자리수 체크 */
      if  ( memBirMd === allDataList[objNum] && allDataList[objNum] !== "" && allDataList[objNum].length !== 8 )  {
        alert("생년월일은 YYYYMMDD 형태로 입력해주세요.");
        checkValidation = false;
        break;
      }
    }

    /* 저장 */
    if  ( checkValidation && window.confirm("저장 하시겠습니까?") )  {
      let test = {"memNum":memNum , "memName":memName , "memBirMd":memBirMd , "ctfNm":ctfNm , "memUnp":memUnp , "memFcst":memFcst , "memCtt":memCtt
                  , "memAdr":memAdr , "affTimName":affTimName , "affCoName":affCoName , "incCd":incCd , "memRnkCd":memRnkCd, "eduCd":eduCd};
      
      axios.post('/api/memAddData', test).then(function (res) {

        console.log(res.data.result);

        if  ( res.data.result > 0 )  {
          alert("정상처리 되었습니다.")
          fn_search();
          fn_resetEvent();
        }  else  {
          alert("[오류] 잠시 후 다시 이용해주세요.")
        }
      });
    }

  }


  // 신규등록 버튼 이벤트 [초기화]
  function fn_addBtn()  {
    fn_resetEvent();
  }


  // 입력항목 초기화 이벤트
  function fn_resetEvent()  {
    formDataList.map((elNm, i)=>{
      return elNm('');
    });
  }


  // ========[Component]======== 목록
  function List() {
    if  ( listData.length === 0 )  {
      return (
        <tr><td colSpan={11}>데이터가 없습니다.</td></tr>
      )
    }  else  {
      return (
        listData.map((data, i)=>{ 
          return (
            <tr key={i} id={data.memNum} onClick={()=>{ fn_getMemTargetData(data.memNum) }} className="trSt" >
              <td>{i+1}</td>
              <td>{data.memName}</td>
              <td>{data.memBirMd.substring(0,4)}.{data.memBirMd.substring(4,6)}.{data.memBirMd.substring(6,8)}</td>
              <td>{data.incNm}</td>
              <td>{data.memRnkNm}</td>
              <td>{data.eduNm}</td>
              <td>{data.ctfNm}</td>
              <td>{data.memUnp.toLocaleString()}</td>
              <td>{data.memFcst.toLocaleString()}</td>
              <td>{data.memCtt}</td>
              <td>{data.memAdr}</td>
            </tr>
          )
        })
      )
    }
  }

  return(
    <>
      <div className="subWrap">
        <div className="inner mt10">
          <section>
            <div className="gridUtil">
              <div className="fl">
                <div className="tb01">
                  <table>
                    <tbody>
                      <tr>
                        <th scope="row"><span className="tit">성명</span></th>
                        <td>
                            <input type="text" className="w130" onChange={(e)=>{ searchNameModify(e.target.value); }} onKeyPress={onKeyPress} />
                        </td>
                        <th scope="row"><span className="tit ml30">등급</span></th>
                        <td>
                            <select className="w130  mr30" onChange={(e)=>{ searchRnkCdModify(e.target.value); }} >
                              <option value={'all'} >전체</option>
                              <CodeSelectOption codeGroup={'RNK_CD'} />
                            </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="fr">
                  <button type="button" className="btn01" onClick={()=>{fn_search()}} ><i className="ic_search"></i><span>조회</span></button>
              </div>
            </div>

            <div className="hr20"></div>
            <div className="gridUtil">
                <div className="fl">
                    <p className="txtGuide">신규인력을 등록하거나 인력 상세정보를 수정할 수 있습니다.</p>
                </div>
            </div>
            
            <div className="gridWrap">
              <div className="tb02">
                <table>
                    <caption>표</caption>
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">성명</th>
                            <th scope="col">생년월일</th>
                            <th scope="col">직위</th>
                            <th scope="col">등급</th>
                            <th scope="col">학력</th>
                            <th scope="col">자격증</th>
                            <th scope="col">단가</th>
                            <th scope="col">원가</th>
                            <th scope="col">연락처</th>
                            <th scope="col">주소</th>
                        </tr>
                    </thead>
                    <tbody>
                      <List />
                    </tbody>
                </table>
              </div>
            </div>

          </section>

          <div className="gridUtilBottom">
            <div className="fr">
                <button type="button" className="btn01" onClick={()=>{fn_addBtn()}} ><span>신규등록</span></button>
            </div>
          </div>

        </div>
      </div>





      <form id="addForm">
        <input type={"hidden"} value={memNum} />
        <div>
          <table>
            <tbody>
              <tr>
                <th>이름</th>
                <td><input className="objWidthSt inp" id="memName" value={memName} onChange={(e)=>{ memNameModify(e.target.value); }} /></td>
                <th>생년월일</th>
                <td><input className="objWidthSt inp" id="memBirMd" value={memBirMd} onChange={(e)=>{ memBirMdModify(e.target.value); }} /></td>
                <th>직위</th>
                <td>
                  <select className="objWidthSt slt" id="incCd" onChange={(e)=>{ incCdModify(e.target.value); }} value={incCd} >
                    <option>선택</option>
                    <CodeSelectOption codeGroup={'INC_CD'} />
                  </select>
                </td>
              </tr>
              <tr>
                <th>등급</th>
                <td>
                  <select className="objWidthSt slt" id="memRnkCd" onChange={(e)=>{ memRnkCdModify(e.target.value); }} value={memRnkCd} >
                    <option>선택</option>
                    <CodeSelectOption codeGroup={'RNK_CD'} />
                  </select>
                </td>
                <th>학력</th>
                <td>
                  <select className="objWidthSt slt" id="eduCd" onChange={(e)=>{ eduCdModify(e.target.value); }} value={eduCd} >
                    <option>선택</option>
                    <CodeSelectOption codeGroup={'EDU_CD'} />
                  </select>
                </td>
                <th>자격증</th>
                <td><input className="objWidthSt inp" id="ctfNm" value={ctfNm} onChange={(e)=>{ ctfNmModify(e.target.value); }} /></td>
              </tr>
              <tr>
                <th>인력단가</th>
                <td>
                  <div><input className="objWidthSt inp" id="memUnp" value={memUnp} onChange={(e)=>{ memUnpModify(e.target.value); }} /></div>
                  {/* <div><label className="errorLabel" >숫자만 입력하세요.</label></div> */}
                </td>
                <th>인력원가</th>
                <td><input className="objWidthSt inp" id="memFcst" value={memFcst} onChange={(e)=>{ memFcstModify(e.target.value); }} /></td>
                <th>연락처</th>
                <td><input className="objWidthSt inp" id="memCtt" value={memCtt} onChange={(e)=>{ memCttModify(e.target.value); }} /></td>
              </tr>
              <tr>
                <th>주소</th>
                <td><input className="objWidthSt inp" id="memAdr" value={memAdr} onChange={(e)=>{ memAdrModify(e.target.value); }} /></td>
                <th>소속회사</th>
                <td><input className="objWidthSt inp" id="affCoName" value={affCoName} onChange={(e)=>{ affCoNameModify(e.target.value); }} /></td>
                <th>소속팀</th>
                <td><input className="objWidthSt inp" id="affTimName" value={affTimName} onChange={(e)=>{ affTimNameModify(e.target.value); }} /></td>
              </tr>
            </tbody>
          </table>
          <div className="buttonSt">
            <button type="button" className="btn03" onClick={()=>{ fn_addEvent(); }} >저장(TEST)</button>
          </div>
        </div>
      </form>

    </>
  )
}


export default ME101;