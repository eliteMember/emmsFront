import { React, useState, useEffect, lazy } from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

import './PO100.css';
import './POP_PO200';
import POP_PO200 from './POP_PO200';

import DatePicker, { registerLocale } from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('ko',ko);

let CodeSelectOption = lazy(()=> import('../Component/CodeSelectOption.js') );

function PO100(props){
  
  const history = useHistory();

  //////////////////////////////////////////////////////////////////////////////////
  // 모달 useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log('모달 열기');
    setModalOpen(true);
  };
  const closeModal = () => {
    console.log('모달 닫기');
    setModalOpen(false);
  };


  const userInfo = useSelector(state => state.userInfo);

  //////////////////////////////////////////////////////////////////////////////////
  //필드값
  const [fields, setFields] = useState({
      prjNewOrOld : 'new'
    , prjNum	  : ''  //프로젝트번호
	, prjNm       : ''  //프로젝트명
	, prjDivCd    : ''  //프로젝트구분코드
	, prjStsCd    : ''  //프로젝트상태코드
    , prjStartYm  : ''  //프로젝트시작년월
	, prjEndYm    : ''  //프로젝트종료년월
	, prjNom      : ''  //프로젝트개월수
    , prjNomYear  : ''  //프로젝트개월수, 년
    , prjNomMonth : ''  //프로젝트개월수, 월
	, prjPlcNm    : ''  //프로젝트장소명
	, prjRefCmt   : ''  //프로젝트참조내용
	, timNum      : ''  //팀번호
	//, dscPer      : ''  //할인율
	//, estAmt      : ''  //견적금액
	//, pmtMtdCd    : ''  //결제방식코드
	//, delYn       : ''  //삭제여부
	//, crtDtm      : ''  //등록일시
	//, crtUsrNum   : ''  //등록사용자번호
	//, mdfDtm      : ''  //수정일시
	//, mdfUsrNum   : ''  //수정사용자번호
    , copInfo1     : [{copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:''}]   //고객사 담당자 정보
    , copInfo2     : [{copSeqNum: null, copDivCd:'2', copNm:'', copMgrName:'', copMgrCtt:''}]
    , copInfo3     : [{copSeqNum: null, copDivCd:'3', copNm:'', copMgrName:'', copMgrCtt:''}]
    });
  const [errors, setErrors] = useState({
      prjNewOrOld : 'new'
    , prjNum	  : ''  //프로젝트번호
	, prjNm       : ''  //프로젝트명
	, prjDivCd    : ''  //프로젝트구분코드
	, prjStsCd    : ''  //프로젝트상태코드
    , prjYm       : ''  //프로젝트기간
	, prjNom      : ''  //프로젝트개월수
	, prjPlcNm    : ''  //프로젝트장소명
	, prjRefCmt   : ''  //프로젝트참조내용
	, timNum      : ''  //팀번호
	//, dscPer      : ''  //할인율
	//, estAmt      : ''  //견적금액
	//, pmtMtdCd    : ''  //결제방식코드
	//, delYn       : ''  //삭제여부
	//, crtDtm      : ''  //등록일시
	//, crtUsrNum   : ''  //등록사용자번호
	//, mdfDtm      : ''  //수정일시
	//, mdfUsrNum   : ''  //수정사용자번호
  });

  const handleChange = event => {
    const { name, value } = event.target;
    let v_fields = {...fields};
    v_fields[name] = value;
    setFields(v_fields);
  }
  //submit 처리
  const onSubmitHandle = (e) => {
    e.preventDefault();
      if (validatehtmlForm()) {
          alert("htmlForm submitted");
      }
  }
  //유효성 검사
  const validatehtmlForm = () => {

    let v_fields = fields;
    let errors = {};
    let htmlFormIsValid = true;

    if (!v_fields["prjNm"]) {
      htmlFormIsValid = false;
      errors["prjNm"] = "*프로젝트명을 입력하세요.";
    }
    if (!v_fields["timNum"]) {
        htmlFormIsValid = false;
        errors["timNum"] = "*팀을 선택해주세요.";
    }
    if (!v_fields["prjDivCd"]) {
        htmlFormIsValid = false;
        errors["prjDivCd"] = "*프로젝트구분을 선택해주세요.";
    }
    if (!v_fields["prjStsCd"]) {
        htmlFormIsValid = false;
        errors["prjStsCd"] = "*프로젝트상태을 선택해주세요.";
    }
    if (!v_fields["prjStartYm"] || !v_fields["prjEndYm"]) {
        htmlFormIsValid = false;
        errors["prjYm"] = "*프로젝트기간을 입력하세요.";
    }else if (v_fields["prjStartYm"] > v_fields["prjEndYm"]) {
        htmlFormIsValid = false;
        errors["prjYm"] = "*프로젝트 시작년월이 종료년월보다 클 수 없습니다.";
    }
    if (!v_fields["prjPlcNm"]) {
        htmlFormIsValid = false;
        errors["prjPlcNm"] = "*프로젝트장소를 입력하세요.";
    }

    setErrors(errors);
    return htmlFormIsValid;
  }

  //////////////////////////////////////////////////////////////////////////////////
  //프로젝트 초기화, 신규 프로젝트 입력
  const resetPrj = () =>{
     let v_fields = {...fields};
     var keys = Object.keys(v_fields); //키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
     for (var i=0; i<keys.length; i++) {
    	var key = keys[i];
    	console.log("key : " + key + ", value : " + v_fields[key]);
      v_fields[key] = '';
    }
    setFields(v_fields);
  }

  //////////////////////////////////////////////////////////////////////////////////
  //팀명 조회
  const [teamList, setTeamList] = useState([]);
  //////////////////////////////////////////////////////////////////////////////////
  // useEffect
  useEffect(() => {
    //프로젝트 팀 조회 ( DB )
    axios.get('/api/cmmn/listTeam', {})
        .then(function (res) {
            console.log(res);
            console.log(res.data);
            setTeamList(res.data.list)
        })
        .catch(function (res) {
          console.log('팀조회 실패');
        })
  }, []);
  //우리팀진행 선택
  function setMyteamSelect(){
    let v_fields = {...fields};
    v_fields['timNum']  = userInfo.timNum == null ? '':userInfo.timNum  //팀번호
    setFields(v_fields);
  }
  

  //////////////////////////////////////////////////////////////////////////////////
  //datepicker, 프로젝트기간
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    let v_fields = {...fields};
    
    if( startDate != null ){
        v_fields['prjStartYm']  = toStringByFormattingMonth(startDate);
    }
    if( endDate != null ){
        v_fields['prjEndYm']  = toStringByFormattingMonth(endDate);
    }

    if( startDate != null && endDate != null ){
        
        let returnMonthDiff = monthDiff(startDate, endDate);
        v_fields['prjNom'] = returnMonthDiff; //프로젝트 개월수 등록
        
        let prjNomYear = parseInt(returnMonthDiff/12);
        let prjNomMonth = parseInt(returnMonthDiff-(prjNomYear*12));

        v_fields['prjNomYear'] = prjNomYear;
        v_fields['prjNomMonth'] = prjNomMonth;
    }

    setFields(v_fields);
  }, [startDate, endDate]);


  //월차이 계산
  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  //월이 1자리 일 경우 앞에 0
  function leftPad(value) { 
      if (value >= 10) { 
          return value; 
      } 
      return `0${value}`; 
  } 
  //dateFormat - 년,월
  function toStringByFormattingMonth(source, delimiter = '-') { 
    const year = source.getFullYear(); const month = leftPad(source.getMonth() + 1);
    return [year, month].join(delimiter); 
  }
  //dateFormat - 년,월,일
  function toStringByFormattingDay(source, delimiter = '-') { 
      const year = source.getFullYear(); const month = leftPad(source.getMonth() + 1); const day = leftPad(source.getDate()); 
      return [year, month, day].join(delimiter); 
  }


  //////////////////////////////////////////////
  // 고객사 추가
  const [corp1ChkList, setCorp1ChkList] = useState([]);
  const corp1ChangeHanle = (e) => {
    if (e.target.checked) {
        setCorp1ChkList([...corp1ChkList, e.target.value]);
     } else {
        setCorp1ChkList(corp1ChkList.filter((checkedId) => checkedId !== e.target.value));
     }
  }

  const addCopTR = () => {
    let v_fields = {...fields};
    let v_copInfo1 = v_fields['copInfo1']
    v_copInfo1.push({copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:''});
    v_fields['copInfo1'] = v_copInfo1;

    setFields(v_fields);
  }
  // 고객사 삭제
  const delCopTR = (e) => {
    let v_fields = {...fields};
    let v_copInfo1 = v_fields['copInfo1']
    
    //v_copInfo1 for(){
    //    v_copInfo1.delete(index == index)
   //}

    // fields.copInfo1.map((element, index) => (
    //     console.log(index)
    //     //v_copInfo1.slice

    //     v_copInfo1.del

    // ));
    
  }

  return (

    <div className="subWrap">
        <div className="inner">

            <div className="dTable mt10">
               
                {/* <div className="colR" style="width:1000px"> */}
                <div className="colR">
                    <div className="ml10">

                        <div className="tbTabWrap mt10">

                            <ul className="tbTab01">
                                <li className="current"><a href="#tab01">기본정보</a></li>
                            </ul>

                            {/* <div className="tabCont mt20" id="tab01" style="display: block;"> */}
                            <div className="tabCont mt20" id="tab01">

                              <form id="prjInfoForm" name="prjInfoForm" onSubmit={onSubmitHandle}>

                                <div className="abTR">
                                    <button type="button" className="btn05 borderC2" onClick={openModal}><i className="ic_search_gray"></i><span>프로젝트 조회</span></button>
                                    <POP_PO200 open={ modalOpen } close={ closeModal } header="프로젝트 조회"></POP_PO200>
                                    <button type="button" className="btn05 borderC2" onClick={resetPrj}><i className="ic_new"></i><span>신규</span></button>
                                </div>
                                <div className="tb03">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트명</span></th>
                                                <td className="txtL">
                                                    <input
                                                      type="text" 
                                                      className="w250"
                                                      id="prjNm"
                                                      name="prjNm"
                                                      value={fields.prjNm}
                                                      onChange={handleChange}
                                                    />
                                                    {errors && <p className="valid">{errors?.prjNm}</p>}
                                                </td>
                                                <th scope="row"><span className="tit">프로젝트팀</span></th>
                                                <td className="txtL">
                                                    <select className="w250" id="timNum" name="timNum" onChange={handleChange} value={fields.timNum} >
                                                    <option>선택</option>
                                                    {
                                                        teamList.map((data, i)=>{
                                                            return <option key={i} value={data.timNum} >{data.timNm}</option>
                                                        })
                                                    }
                                                    </select>
                                                    <button type="button" className="btn01" onClick={setMyteamSelect}><span>우리팀진행</span></button>
                                                    <button type="button" className="btn01"><span>프로젝트 이관</span></button>
                                                    {errors && <p className="valid">{errors?.timNum}</p>}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tb03 mt5 lineTopGray">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트 구분</span></th>
                                                <td className="txtL">
                                                    <select className="w110" id="prjDivCd" name="prjDivCd" onChange={handleChange}>
                                                        <option>선택</option>
                                                        <CodeSelectOption codeGroup={'PRJ_DIV_CD'} />
                                                    </select>
                                                    {errors && <p className="valid">{errors?.prjDivCd}</p>}
                                                </td>
                                                <th scope="row"><span className="tit">프로젝트 상태</span></th>
                                                <td className="txtL" colSpan="">
                                                    <select className="w110" id="prjStsCd" name="prjStsCd" onChange={handleChange}>
                                                    <option>선택</option>
                                                        <CodeSelectOption codeGroup={'PRJ_STS_CD'} />
                                                    </select>
                                                    {errors && <p className="valid">{errors?.prjStsCd}</p>}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트 기간</span></th>
                                                <td className="txtL" colSpan="3">
                                                    <span className="datepickerBox">
                                                        {/* <input type="text" id="prjStartYm" name="prjStartYm" placeholder="2022-03" value={fields.prjStartYm} onChange={handleChange}/> */}
                                                        <DatePicker
                                                            dateFormat="yyyy-MM"
                                                            selected={startDate}
                                                            onChange={date=>setStartDate(date)}
                                                            locale={ko}
                                                            value={fields.prjStartYm}
                                                        />
                                                    </span>
                                                    ~
                                                    <span className="datepickerBox">
                                                        {/* <input type="text" id="prjEndYm" name="prjEndYm" placeholder="2022-12" value={fields.prjEndYm} onChange={handleChange}/> */}
                                                        <DatePicker
                                                            dateFormat="yyyy-MM"
                                                            selected={endDate}
                                                            onChange={date=>setEndDate(date)}
                                                            locale={ko}
                                                            value={fields.prjEndYm}
                                                        />
                                                    </span>

                                                    <input type="text" className="w50 ml30 mr5" id="prjNomYear"  name="prjNomYear"  value={fields.prjNomYear} readOnly/>년
                                                    <input type="text" className="w50 ml10 mr5" id="prjNomMonth" name="prjNomMonth" value={fields.prjNomMonth} readOnly/>개월
                                                    {errors && <p className="valid">{errors?.prjYm}</p>}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트 장소</span></th>
                                                <td className="txtL" colSpan="3">
                                                    <input type="text" className='w250' value={fields.prjPlcNm} onChange={handleChange}/>
                                                    {/* <button type="button" className="btn02s"><i className="ic_search_blue"></i></button> */}
                                                    {errors && <p className="valid">{errors?.prjPlcNm}</p>}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tb03 mt10 lineTopGray">
                                    
                                <div className="txtL mb10">
                                        <span className="filebox ml5"> 
                                            <button type="button" className="btn01s" onClick={addCopTR}><span>고객사 추가</span></button>
                                            <button type="button" className="btn02s" onClick={delCopTR}><span>고객사 삭제</span></button>
                                        </span>
                                    </div>

                                    <table>
                                        <tbody>
                                            {fields.copInfo1.map((element, index) => (
                                                 <tr key={index}>
                                                    <th scope="row"><label><input type="checkbox" name="copChk1" value={index} onChange={(e) => corp1ChangeHanle}/>고객사</label></th>
                                                    <td>
                                                        <input type="text" className="w250"/>
                                                    </td>
                                                    <th scope="row">담당자</th>
                                                    <td>
                                                        <input type="text" className="w100" placeholder="홍길동 부장"/>
                                                    </td>
                                                    <th scope="row">연락처</th>
                                                    <td>
                                                        <input type="text" className="w250"/>
                                                    </td>
                                                </tr>
                                            ))}

                                            <tr>
                                                <th scope="row">수행사</th>
                                                <td>
                                                    <input type="text" className="w250"/>
                                                </td>
                                                <th scope="row">담당자</th>
                                                <td>
                                                    <input type="text" className="w100" placeholder="박민영 차장"/>
                                                </td>
                                                <th scope="row">연락처</th>
                                                <td>
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">협력사</th>
                                                <td>
                                                    <input type="text" className="w250"/>
                                                </td>
                                                <th scope="row">담당자</th>
                                                <td>
                                                    <input type="text" className="w100" placeholder="김우빈 부장"/>
                                                </td>
                                                <th scope="row">연락처</th>
                                                <td>
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">참조사항</th>
                                                <td colSpan="6">
                                                    <textarea className="h150">
                                                    </textarea>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="tb03 mt5 lineTopGray">
                                    <table>
                                        <tbody>

                                            <tr>
                                                <th className="txtC">첨부파일</th>
                                                <td className="txtL">
                                                    <div className="mt10 mb10">
                                                    
                                                        <div className="dFlex">

                                                            <div className="tb04 mr20">                            

                                                                    <div className="txtL mb10">
                                                                        <select className="w110">
                                                                            <option>선택</option>
                                                                            <CodeSelectOption codeGroup={'DOC_CLS_CD'} />
                                                                        </select>
                                                                        <span className="filebox ml5"> 
                                                                            <input type="file" id="file"/> 
                                                                            <input className="uploadName"/>
                                                                                <button type="button" className="btn01s"><span>파일찾기</span></button>
                                                                                <button type="button" className="btn02s"><span>삭제</span></button>
                                                                        </span>
                                                                    </div>

                                                                <table>
                                                                    <caption>테이블</caption>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">선택</th>
                                                                            <th scope="col">번호</th>
                                                                            <th scope="col">파일명</th>
                                                                            <th scope="col">크기</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        
                                                                        <tr>
                                                                            <td className="txtC"><span className="customhtmlForm"><input type="checkbox" name="check1" id="check11"/><label htmlFor="check11"><span></span></label></span></td>
                                                                            <td className="txtC">1</td>
                                                                            <td className="txtL">
                                                                                <button type="button" className="attachedFile"><i className="ic_file"></i><span className="">정예맴버프로젝트관리시스템 사용자 매뉴얼_v1.0.pdf</span></button>
                                                                            </td>
                                                                            <td className="txtC">3Mb</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="txtC"><span className="customhtmlForm"><input type="checkbox" name="check1" id="check12"/><label htmlFor="check12"><span></span></label></span></td>
                                                                            <td className="txtC">2</td>
                                                                            <td className="txtL">
                                                                                <button type="button" className="attachedFile"><i className="ic_file"></i><span className="">KB 푸르덴셜 비대면 구축 RFP_v2.0KB 푸르덴셜 비대면 구축 RFP_v2.0..pdf</span></button>
                                                                            </td>
                                                                            <td className="txtC">3Mb</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="txtC"><span className="customhtmlForm"><input type="checkbox" name="check1" id="check13"/><label htmlFor="check13"><span></span></label></span></td>
                                                                            <td className="txtC">3</td>
                                                                            <td className="txtL">
                                                                                <button type="button" className="attachedFile"><i className="ic_file"></i><span className="">KB 푸르덴셜 비대면 구축 공수산정_v1.0.pdf</span></button>
                                                                            </td>
                                                                            <td className="txtC">3Mb</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>



                                                        </div>

                                                    </div>
                                                </td>
                                            </tr> 
                                        </tbody>
                                    </table>
                                </div>

                                <div className="gridUtilBottom">
                                    <div className="fr">
                                        <button type="submit" className="btn01"><span>저장</span></button>
                                        <button type="button" className="btn03"><span>취소</span></button>
                                    </div>
                                </div> 

                              </form>

                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>

          </div>

        </div>
    )
}




export default PO100;