import { React, useState, useEffect, lazy } from 'react';
//import { useHistory } from 'react-router-dom';
//import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
//import { useDispatch, useSelector } from "react-redux";

import './PO100.css';
import './POP_PO200';
import POP_PO200 from './POP_PO200';

import DatePicker, { registerLocale } from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('ko',ko);

let CodeSelectOption = lazy(()=> import('../Component/CodeSelectOption.js') );

function PO100(props){
  
  //const history = useHistory();

  //////////////////////////////////////////////////////////////////////////////////
  // 모달 useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    //console.log('모달 열기');
    setModalOpen(true);
  };
  const closeModal = () => {
    //console.log('모달 닫기');
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
    , copInfo1     : [{id:0, copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:'' }]   //고객사 담당자 정보
    , copInfo2     : [{id:0, copSeqNum: null, copDivCd:'2', copNm:'', copMgrName:'', copMgrCtt:'' }]
    , copInfo3     : [{id:0, copSeqNum: null, copDivCd:'3', copNm:'', copMgrName:'', copMgrCtt:'' }]
    , files        : [{id:0
                    , relDocNum:null 
                    , docClsCd : ''
                    , filNm : ''
                    , filPth : ''
                    , orgFilNm : ''
                    , filSiz : null
                    , filExt : ''
                    , crtDtm : ''
                    , crtUsrNum : ''
                    , mdfDtm : ''
                    , mdfUsrNum : ''
                    , fileObj:null }]
    });

  const [errors, setErrors] = useState({
      prjNewOrOld : ''
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
    , copInfo1     : [{id:0, copNm:'', copMgrName:'', copMgrCtt:''}]   //고객사 담당자 정보
    , copInfo2     : [{id:0, copNm:'', copMgrName:'', copMgrCtt:''}]   //수행사 담당자 정보
    , copInfo3     : [{id:0, copNm:'', copMgrName:'', copMgrCtt:''}]   //협력사 담당자 정보
    , files        : [{id:0
        , relDocNum:null 
        , docClsCd : ''
        , filNm : ''
        , filPth : ''
        , orgFilNm : ''
        , filSiz : null
        , filExt : ''
        , fileObj:null }]
  });
  const handleChange = (event, arrId, arrName) => {
    const { name, value } = event.target;
    let v_fields = {...fields};
    v_fields[name] = value;
    
    if( arrName == 'copInfo1' ){
        let v_copInfo1 = v_fields.copInfo1;
        v_copInfo1[arrId][name] = value;
        v_fields['copInfo1'] = v_copInfo1;
    }
    if( arrName == 'copInfo2' ){
        let v_copInfo2 = v_fields.copInfo2;
        v_copInfo2[arrId][name] = value;
        v_fields['copInfo2'] = v_copInfo2;
    }
    if( arrName == 'copInfo3' ){
        let v_copInfo3 = v_fields.copInfo3;
        v_copInfo3[arrId][name] = value;
        v_fields['copInfo3'] = v_copInfo3;
    }
    if( arrName == 'files' ){
        let v_files = v_fields.files;
        v_files[arrId][name] = value;
        if( event.target.files != null && event.target.files != undefined ){
            v_files[arrId].fileObj = event.target.files[0];
        }
        v_fields['files'] = v_files;
    }


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
    let v_copInfo1 = v_fields.copInfo1;
    let v_copInfo2 = v_fields.copInfo2;
    let v_copInfo3 = v_fields.copInfo3;
    let v_files = v_fields.files;
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

    // 고객사
    errors.copInfo1 = [];
    v_copInfo1.map((element, index) => {
        errors.copInfo1.push({id:0, copNm:'', copMgrName:'', copMgrCtt:''});
        if (!v_copInfo1[index]["copNm"]) {
            htmlFormIsValid = false;
            errors.copInfo1[index].copNm = "*고객사명을 입력하세요.";
        }
        if (!v_copInfo1[index]["copMgrName"]) {
            htmlFormIsValid = false;
            errors.copInfo1[index].copMgrName = "*담당자명을 입력하세요.";
        }
        if (!v_copInfo1[index]["copMgrCtt"]) {
            htmlFormIsValid = false;
            errors.copInfo1[index].copMgrCtt = "*연락처 입력하세요.";
        }
    });

    // 수행사
    errors.copInfo2 = [];
    v_copInfo2.map((element, index) => {
        errors.copInfo2.push({id:0, copNm:'', copMgrName:'', copMgrCtt:''});
        if (!v_copInfo2[index]["copNm"]) {
            htmlFormIsValid = false;
            errors.copInfo2[index].copNm = "*고객사명을 입력하세요.";
        }
        if (!v_copInfo2[index]["copMgrName"]) {
            htmlFormIsValid = false;
            errors.copInfo2[index].copMgrName = "*담당자명을 입력하세요.";
        }
        if (!v_copInfo2[index]["copMgrCtt"]) {
            htmlFormIsValid = false;
            errors.copInfo2[index].copMgrCtt = "*연락처 입력하세요.";
        }
    });

    // 협력사
    errors.copInfo3 = [];
    v_copInfo3.map((element, index) => {
        errors.copInfo3.push({id:0, copNm:'', copMgrName:'', copMgrCtt:''});
        if (!v_copInfo3[index]["copNm"]) {
            htmlFormIsValid = false;
            errors.copInfo3[index].copNm = "*고객사명을 입력하세요.";
        }
        if (!v_copInfo3[index]["copMgrName"]) {
            htmlFormIsValid = false;
            errors.copInfo3[index].copMgrName = "*담당자명을 입력하세요.";
        }
        if (!v_copInfo2[index]["copMgrCtt"]) {
            htmlFormIsValid = false;
            errors.copInfo3[index].copMgrCtt = "*연락처 입력하세요.";
        }
    });

    // 첨부파일
    errors.files = [];
    v_files.map((element, index) => {
        errors.files.push(
            {id:0
                , relDocNum:null 
                , docClsCd : ''
                , filNm : ''
                , filPth : ''
                , orgFilNm : ''
                , filSiz : null
                , filExt : ''
                , fileObj:null }
        );
        if (!v_files[index]["docClsCd"]) {
            htmlFormIsValid = false;
            errors.files[index].docClsCd = "*파일구분을 선택하세요.";
        }
        if (!v_files[index]["fileObj"]) {
            htmlFormIsValid = false;
            errors.files[index].fileObj = "*첨부파일을 입력하세요.";
        }
    });

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
    	//console.log("key : " + key + ", value : " + v_fields[key]);
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
            //console.log(res);
            //console.log(res.data);
            setTeamList(res.data.list)
        })
        .catch(function (res) {
          //console.log('팀조회 실패');
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
  // 고객사 관리
  // 고객사 선택
  const [corp1ChkList, setCorp1ChkList] = useState([]);
  const corp1ChangeHanle = (e) => {
    if (e.target.checked) {
        setCorp1ChkList([...corp1ChkList, e.target.value]);
     } else {
        setCorp1ChkList(corp1ChkList.filter((checkedId) => checkedId !== e.target.value));
     }
  }
  //고객사 추가
  const [corp1Seq, setCorp1Seq] = useState(0);
  useEffect(() => {
    let v_fields = {...fields};
    let v_copInfo1 = v_fields['copInfo1']
    if( corp1Seq > 0 ){
        v_copInfo1.push({id: corp1Seq, copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:''});
        v_fields['copInfo1'] = v_copInfo1;
        setFields(v_fields);
    }
    // else{
    //     v_copInfo1 = {id:1, copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:''};
    //     v_fields['copInfo1'] = v_copInfo1;
    //     setFields(v_fields);
    // }
  },[corp1Seq]);
  const addCop1TR = () => {
    setCorp1Seq(corp1Seq + 1)
  }
  // 고객사 삭제
  const delCop1TR = () => {
    let v_fields = {...fields};
    let v_copInfo1 = v_fields['copInfo1']
    if( v_copInfo1.length == corp1ChkList.length ){
        alert('고객사는 최소 1개 이상');
    }else{
        corp1ChkList.map((element, index) => (
            v_copInfo1 = v_copInfo1.filter((arr_info) => arr_info.id != element)
            //v_copInfo1.filter((arr_info) => { console.log(arr_info.id); console.log(element); console.log(arr_info.id == element) })
        ));
        setCorp1ChkList([]);
        v_fields['copInfo1'] = v_copInfo1;
        setFields(v_fields);
    }
    // let timer = setTimeout(()=>{ 
    //     console.log('--------------------------')
    //     console.log(fields.copInfo1)
    //     console.log('--------------------------')
    //  }, 1000);
  }


//////////////////////////////////////////////
  // 수행사 관리
  // 수행사 선택
  const [corp2ChkList, setCorp2ChkList] = useState([]);
  const corp2ChangeHanle = (e) => {
    if (e.target.checked) {
        setCorp2ChkList([...corp2ChkList, e.target.value]);
     } else {
        setCorp2ChkList(corp2ChkList.filter((checkedId) => checkedId !== e.target.value));
     }
  }
  //수행사 추가
  const [corp2Seq, setCorp2Seq] = useState(0);
  useEffect(() => {
    let v_fields = {...fields};
    let v_copInfo2 = v_fields['copInfo2']
    if( corp2Seq > 0 ){
        v_copInfo2.push({id: corp2Seq, copSeqNum: null, copDivCd:'2', copNm:'', copMgrName:'', copMgrCtt:''});
        v_fields['copInfo2'] = v_copInfo2;
        setFields(v_fields);
    }
    // else{
    //     v_copInfo1 = {id:1, copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:''};
    //     v_fields['copInfo1'] = v_copInfo1;
    //     setFields(v_fields);
    // }
  },[corp2Seq]);
  const addCop2TR = () => {
    setCorp2Seq(corp2Seq + 1)
  }
  // 수행사 삭제
  const delCop2TR = () => {
    let v_fields = {...fields};
    let v_copInfo2 = v_fields['copInfo2']
    if( v_copInfo2.length == corp2ChkList.length ){
        alert('수행사는 최소 1개 이상');
    }else{
        corp2ChkList.map((element, index) => (
            v_copInfo2 = v_copInfo2.filter((arr_info) => arr_info.id != element)
            //v_copInfo1.filter((arr_info) => { console.log(arr_info.id); console.log(element); console.log(arr_info.id == element) })
        ));
        setCorp2ChkList([]);
        v_fields['copInfo2'] = v_copInfo2;
        setFields(v_fields);
    }
    // let timer = setTimeout(()=>{ 
    //     console.log('--------------------------')
    //     console.log(fields.copInfo1)
    //     console.log('--------------------------')
    //  }, 1000);
  }


  //////////////////////////////////////////////
  // 협력사 관리
  // 협력사 선택
  const [corp3ChkList, setCorp3ChkList] = useState([]);
  const corp3ChangeHanle = (e) => {
    if (e.target.checked) {
        setCorp3ChkList([...corp3ChkList, e.target.value]);
     } else {
        setCorp3ChkList(corp3ChkList.filter((checkedId) => checkedId !== e.target.value));
     }
  }
  //협력사 추가
  const [corp3Seq, setCorp3Seq] = useState(0);
  useEffect(() => {
    let v_fields = {...fields};
    let v_copInfo3 = v_fields['copInfo3']
    if( corp3Seq > 0 ){
        v_copInfo3.push({id: corp3Seq, copSeqNum: null, copDivCd:'3', copNm:'', copMgrName:'', copMgrCtt:''});
        v_fields['copInfo3'] = v_copInfo3;
        setFields(v_fields);
    }
    // else{
    //     v_copInfo1 = {id:1, copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:''};
    //     v_fields['copInfo1'] = v_copInfo1;
    //     setFields(v_fields);
    // }
  },[corp3Seq]);
  const addCop3TR = () => {
    setCorp3Seq(corp3Seq + 1)
  }
  // 협력사 삭제
  const delCop3TR = () => {
    let v_fields = {...fields};
    let v_copInfo3 = v_fields['copInfo3']
    if( v_copInfo3.length == corp3ChkList.length ){
        alert('협력사는 최소 1개 이상');
    }else{
        corp3ChkList.map((element, index) => (
            v_copInfo3 = v_copInfo3.filter((arr_info) => arr_info.id != element)
            //v_copInfo1.filter((arr_info) => { console.log(arr_info.id); console.log(element); console.log(arr_info.id == element) })
        ));
        setCorp3ChkList([]);
        v_fields['copInfo3'] = v_copInfo3;
        setFields(v_fields);
    }
    // let timer = setTimeout(()=>{ 
    //     console.log('--------------------------')
    //     console.log(fields.copInfo1)
    //     console.log('--------------------------')
    //  }, 1000);
  }


  //////////////////////////////////////////////
  // 파일 관리
  // 파일 선택
  const [filesChkList, setFilesChkList] = useState([]);
  const filesChangeHanle = (e) => {
    if (e.target.checked) {
        setFilesChkList([...filesChkList, e.target.value]);
     } else {
        setFilesChkList(filesChkList.filter((checkedId) => checkedId !== e.target.value));
     }
  }
  //파일 추가
  const [filesSeq, setFilesSeq] = useState(0);
  useEffect(() => {
    let v_fields = {...fields};
    let v_files = v_fields['files']
    if( filesSeq > 0 ){
        v_files.push({id:filesSeq, relDocNum:null, docClsCd : '', filNm : '', filPth : '', orgFilNm : '', filSiz : null, filExt : '', crtDtm : '', crtUsrNum : '', mdfDtm : '', mdfUsrNum : '', fileObj : null });
        v_fields['files'] = v_files;
        setFields(v_fields);
    }
    // else{
    //     v_copInfo1 = {id:1, copSeqNum: null, copDivCd:'1', copNm:'', copMgrName:'', copMgrCtt:''};
    //     v_fields['copInfo1'] = v_copInfo1;
    //     setFields(v_fields);
    // }
  },[filesSeq]);
  const addFilesTR = () => {
    setFilesSeq(filesSeq + 1)
  }
  //파일 삭제
  const delFilesTR = () => {
    let v_fields = {...fields};
    let v_files = v_fields['files']
    if( v_files.length == filesChkList.length ){
        alert('첨부파일은 최소 1개 이상');
    }else{
        filesChkList.map((element, index) => (
            v_files = v_files.filter((arr_info) => arr_info.id != element)
            //v_copInfo1.filter((arr_info) => { console.log(arr_info.id); console.log(element); console.log(arr_info.id == element) })
        ));
        setFilesChkList([]);
        v_fields['files'] = v_files;
        setFields(v_fields);
    }
    // let timer = setTimeout(()=>{ 
    //     console.log('--------------------------')
    //     console.log(fields.copInfo1)
    //     console.log('--------------------------')
    //  }, 1000);
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
                                                <button type="button" className="btn01s" onClick={addCop1TR}><span>고객사 추가</span></button>
                                                <button type="button" className="btn02s" onClick={delCop1TR}><span>고객사 삭제</span></button>
                                            </span>
                                    </div>
                                    <table>
                                        <tbody>
                                            {fields.copInfo1.map((element, index) => (
                                                 <tr key={element.id}>
                                                    <th scope="row"><label><input type="checkbox" name="copChk1" value={element.id} onClick={(e) => corp1ChangeHanle(e)}/>{element.id} 고객사</label></th>
                                                    <td>
                                                        <input type="text" className="w250" name="copNm" value={fields.copInfo1[index].copNm} onChange={(e) => handleChange(e, index, 'copInfo1')} />
                                                        {errors && <p className="valid">{errors.copInfo1[index]?.copNm}</p>}
                                                    </td>
                                                    <th scope="row">담당자</th>
                                                    <td>
                                                        <input type="text" className="w100" name="copMgrName" value={fields.copInfo1[index].copMgrName} onChange={(e) => handleChange(e, index, 'copInfo1')} />
                                                        {errors && <p className="valid">{errors.copInfo1[index]?.copMgrName}</p>}
                                                    </td>
                                                    <th scope="row">연락처</th>
                                                    <td>
                                                    <input type="text" className="w200" name="copMgrCtt" value={fields.copInfo1[index].copMgrCtt} onChange={(e) => handleChange(e, index, 'copInfo1')} />
                                                    {errors && <p className="valid">{errors.copInfo1[index]?.copMgrCtt}</p>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="txtL mb10">
                                        <span className="filebox ml5"> 
                                            <button type="button" className="btn01s" onClick={addCop2TR}><span>수행사 추가</span></button>
                                            <button type="button" className="btn02s" onClick={delCop2TR}><span>수행사 삭제</span></button>
                                        </span>
                                    </div>                   
                                    <table>
                                        <tbody>
                                            {fields.copInfo2.map((element, index) => (
                                                 <tr key={element.id}>
                                                    <th scope="row"><label><input type="checkbox" name="copChk2" value={element.id} onClick={(e) => corp2ChangeHanle(e)}/>{element.id} 수행사</label></th>
                                                    <td>
                                                        <input type="text" className="w250" name="copNm" value={fields.copInfo2[index].copNm} onChange={(e) => handleChange(e, index, 'copInfo2')} />
                                                        {errors && <p className="valid">{errors.copInfo2[index]?.copNm}</p>}
                                                    </td>
                                                    <th scope="row">담당자</th>
                                                    <td>
                                                        <input type="text" className="w100" name="copMgrName" value={fields.copInfo2[index].copMgrName} onChange={(e) => handleChange(e, index, 'copInfo2')} />
                                                        {errors && <p className="valid">{errors.copInfo2[index]?.copMgrName}</p>}
                                                    </td>
                                                    <th scope="row">연락처</th>
                                                    <td>
                                                    <input type="text" className="w200" name="copMgrCtt" value={fields.copInfo2[index].copMgrCtt} onChange={(e) => handleChange(e, index, 'copInfo2')} />
                                                    {errors && <p className="valid">{errors.copInfo2[index]?.copMgrCtt}</p>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="txtL mb10">
                                        <span className="filebox ml5"> 
                                            <button type="button" className="btn01s" onClick={addCop3TR}><span>협력사 추가</span></button>
                                            <button type="button" className="btn02s" onClick={delCop3TR}><span>협력사 삭제</span></button>
                                        </span>
                                    </div>                   
                                    <table>
                                        <tbody>
                                            {fields.copInfo3.map((element, index) => (
                                                 <tr key={element.id}>
                                                    <th scope="row"><label><input type="checkbox" name="copChk3" value={element.id} onClick={(e) => corp3ChangeHanle(e)}/>{element.id} 협력사</label></th>
                                                    <td>
                                                        <input type="text" className="w250" name="copNm" value={fields.copInfo3[index].copNm} onChange={(e) => handleChange(e, index, 'copInfo3')} />
                                                        {errors && <p className="valid">{errors.copInfo3[index]?.copNm}</p>}
                                                    </td>
                                                    <th scope="row">담당자</th>
                                                    <td>
                                                        <input type="text" className="w100" name="copMgrName" value={fields.copInfo3[index].copMgrName} onChange={(e) => handleChange(e, index, 'copInfo3')} />
                                                        {errors && <p className="valid">{errors.copInfo3[index]?.copMgrName}</p>}
                                                    </td>
                                                    <th scope="row">연락처</th>
                                                    <td>
                                                    <input type="text" className="w200" name="copMgrCtt" value={fields.copInfo3[index].copMgrCtt} onChange={(e) => handleChange(e, index, 'copInfo3')} />
                                                    {errors && <p className="valid">{errors.copInfo3[index]?.copMgrCtt}</p>}
                                                    </td>
                                                </tr>
                                            ))}

                                            <tr>
                                                <th scope="row">참조사항</th>
                                                <td colSpan="6">
                                                    <textarea className="h150" defaultValue={fields.prjRefCmt} onChange={(e) => handleChange(e)}></textarea>
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
                                                                        <span className="filebox ml5"> 
                                                                            <button type="button" className="btn01s" onClick={addFilesTR}><span>파일추가</span></button>
                                                                            <button type="button" className="btn02s" onClick={delFilesTR}><span>파일삭제</span></button>
                                                                        </span>
                                                                    </div>

                                                                <table>
                                                                    <caption>테이블</caption>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">선택</th>
                                                                            <th scope="col">번호</th>
                                                                            <th scope="col">파일구분</th>
                                                                            <th scope="col">파일명</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                    {fields.files.map((element, index) => (
                                                                        <tr key={element.id}>
                                                                            <td className="txtC"><span className="customhtmlForm">
                                                                                <label>
                                                                                    <input type="checkbox" name="filesChk" value={element.id} onClick={(e) => filesChangeHanle(e)}/><span></span>
                                                                                </label>
                                                                                </span>
                                                                            </td>
                                                                            <td className="txtC">{(index+1)}</td>
                                                                            <td className="txtC">
                                                                                <select className="w110" name="docClsCd" defaultValue={fields.files[index].docClsCd} onChange={(e) => handleChange(e, index, 'files')} >
                                                                                    <option>선택</option>
                                                                                    <CodeSelectOption codeGroup={'DOC_CLS_CD'} />
                                                                                </select>
                                                                                {errors && <p className="valid">{errors.files[index]?.docClsCd}</p>}
                                                                            </td>

                                                                            <td className="txtL">
                                                                                <input type="file" className="w100p" name="fileObj" onChange={(e) => handleChange(e, index, 'files')} />
                                                                                {errors && <p className="valid">{errors.files[index]?.fileObj}</p>}
                                                                            </td>
                                                                        </tr>
                                                                    ))}


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