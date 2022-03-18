import React, { useEffect, lazy, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './ME101.css';
import '../css/daycare_user_layout.css';
import '../css/jquery-ui.css';
let CodeSelectOption = lazy( ()=> import('../Component/CodeSelectOption.js') );

function ME101(props) {

  let [listData, listDataModify] = useState([]);          // 목록
  let [searchName, searchNameModify] = useState('');      // 이름 검색
  let [searchRnkCd, searchRnkCdModify] = useState('all'); // 등급 검색
  
  const { register, handleSubmit } = useForm();     // form
  const [formData, formDataModify] = useState("");  // form data

  // INIT
  useEffect(()=>{
    axios.post('/api/memList', {
      memRnkCd: searchRnkCd
  }).then(function (res) {
        listDataModify(res.data.list);
      })
  },[]);

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
    if (e.key == 'Enter') {
      fn_search();
    }
  }

  // GET DATA
  function fn_getMemTargetData(paramMemNum) {
    axios.post('/api/memTargetData', {
      memNum: paramMemNum
    }).then(function (res) {
      console.log(res.data.value);
    });
  }

  // ADD DATA
  const onSubmit = (data) => {

    var checkValidation = true;
    const notNull = ["memName", "memBirMd", "incCd", "memRnkCd", "eduCd", "memUnp", "memFcst", "memCtt", "memAdr"];
    const numberType = ["memBirMd", "memUnp", "memFcst"];
    const numberCheckStyle = /^[0-9]*$/;

    let keyData = Object.keys(data);
    for  ( let val of keyData )  {
      
      /* 필수항목 체크 */
      if  ( notNull.includes(val) && (data[val].trim() == "" || data[val] == "선택") )  {
        alert('필수 입력학목이 누락되었습니다.');
        checkValidation = false;
        document.getElementById(val).focus();
        break;
      }

      /* 숫자항목 체크 */
      if  ( numberType.includes(val) && data[val].trim() != "" && !numberCheckStyle.test(data[val]) )  {
        let targetNm = '';
        if  ( val == 'memBirMd' )  targetNm = "생년월일";
        else if  ( val == 'memUnp' )  targetNm = "인력단가";
        else if  ( val == 'memFcst' )  targetNm = "인력원가";

        alert(targetNm+'항목은 숫자만 입력 가능합니다.');
        checkValidation = false;
        document.getElementById(val).focus();
        break;
      }

    }

    /* 저장 */
    if  ( checkValidation )  {
      axios.post('/api/memAddData', data).then(function (res) {
        console.log('저장 완료');
        fn_search();
      });
    }

  }

  /* [Component] 목록 */
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
                <button type="button" className="btn01"><span>신규등록</span></button>
            </div>
          </div>

        </div>
      </div>


      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <table>
          <tbody>
            <tr>
              <th>이름</th>
              <td><input className="objWidthSt" id="memName" {...register("memName")} /></td>
              <th>생년월일</th>
              <td><input className="objWidthSt" id="memBirMd" {...register("memBirMd")} /></td>
              <th>직위</th>
              <td>
                <select className="objWidthSt" id="incCd" {...register("incCd")} >
                  <option>선택</option>
                  <CodeSelectOption codeGroup={'INC_CD'} />
                </select>
              </td>
            </tr>
            <tr>
              <th>등급</th>
              <td>
                <select className="objWidthSt" id="memRnkCd" {...register("memRnkCd")} >
                  <option>선택</option>
                  <CodeSelectOption codeGroup={'RNK_CD'} />
                </select>
              </td>
              <th>학력</th>
              <td>
                <select className="objWidthSt" id="eduCd" {...register("eduCd")} >
                  <option>선택</option>
                  <CodeSelectOption codeGroup={'EDU_CD'} />
                </select>
              </td>
              <th>자격증</th>
              <td><input className="objWidthSt" id="ctfNm" {...register("ctfNm")} /></td>
            </tr>
            <tr>
              <th>인력단가</th>
              <td>
                <div><input className="objWidthSt" id="memUnp" {...register("memUnp")} /></div>
                {/* <div><label className="errorLabel" >숫자만 입력하세요.</label></div> */}
              </td>
              <th>인력원가</th>
              <td><input className="objWidthSt" id="memFcst" {...register("memFcst")} /></td>
              <th>연락처</th>
              <td><input className="objWidthSt" id="memCtt" {...register("memCtt")} /></td>
            </tr>
            <tr>
              <th>주소</th>
              <td><input className="objWidthSt" id="memAdr" {...register("memAdr")} /></td>
              <th>소속회사</th>
              <td><input className="objWidthSt" id="affCoName" {...register("affCoName")} /></td>
              <th>소속팀</th>
              <td><input className="objWidthSt" id="affTimName" {...register("affTimName")} /></td>
            </tr>
          </tbody>
        </table>
        <div className="buttonSt">
          <button type="sbmit" className="btn03" >저장(TEST)</button>
        </div>
      </div>
      </form>

    </>
  )
}


export default ME101;