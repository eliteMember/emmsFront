import React, { useEffect, useState, useRef, lazy } from 'react';
import './MN300.css';
import axios from 'axios';
import Img from "../imgs/logo_01.png"; 
import { useDispatch } from 'react-redux';
import { ACT_CMMN_CODE_GETLIST } from '../reducers/cmmnCode'
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import BottomSlidePop from '../Component/BottomSlidePop';
import {ACT_BOTTOM_SLIDE_POP} from '../reducers/bottomSlidePop';
import { set } from 'date-fns';

let CodeSelectOption = lazy( ()=> import('../Component/CodeSelectOption.js') );

function MN300(props){

    const col1 = {width:'130'};
    const col2 = {width:'auto'};

    const userInfo = useSelector(state => state.userInfo);

    let [listData, listDataModify] = useState([]);      // 목록

    // 필드값
    let [num, numModify] = useState('');                    // 번호
    let [name, nameModify] = useState('');                  // 이름
    let [id, idModify] = useState('');                      // 아이디
    let [existPw, existPwModify] = useState('');            // 기존비밀번호
    let [pw, pwModify] = useState('');                      // 신규비밀번호
    let [pwChk, pwChkModify] = useState('');                // 신규비밀번호확인
    let [birMd, birMdModify] = useState('');                // 생년월일
    let [ctt1, ctt1Modify] = useState('');                  // 연락처1
    let [ctt2, ctt2Modify] = useState('');                  // 연락처2
    let [ctt3, ctt3Modify] = useState('');                  // 연락처3
    let [email1, email1Modify] = useState('');              // 이메일
    let [email2, email2Modify] = useState('');              // 이메일
    let [emailSelected, setEmailSelected] = useState('');   // 이메일
    let [incCd, incCdModify] = useState('');                // 직위코드
    let [apoCd, apoCdModify] = useState('');                // 직책코드
    let [teamNm, teamNmModify] = useState('');              // 팀명
    
    // 필드값 에러
    const [errors, setErrors] = useState({
        existPw: "",
        pw: "",           // 비밀번호
        pwChk: "",         // 비밀번호체크
        birMd: "",        // 생년월일
        ctt1: "",     // -전화-
        ctt2: "",     // -전화-
        ctt3: "",     // -전화
        email1: "",       // 이메일@
        email2: "",       // @이메일
        incCd: "",        // 직위
        apoCd: "",        // 직책
        teamNm: "",       // 팀명
    });

    function fn_userInfo() {
        axios.post('/api/user/userInfo', {usrNum: userInfo.usrNum})
        .then(function (res) {
            for  ( var data in res.data.result )  {
                numModify(res.data.result.usrNum);        // 번호
                nameModify(res.data.result.usrName);      // 이름
                idModify(res.data.result.loginId);        // id
                birMdModify(res.data.result.usrBirMd);        // 생년월일
                // str.replace(/(.{5})/g,"$1#")
                ctt1Modify(res.data.result.usrTelNum.split('-')[0]);        // 휴대폰번호
                ctt2Modify(res.data.result.usrTelNum.split('-')[1]);        // 휴대폰번호
                ctt3Modify(res.data.result.usrTelNum.split('-')[2]);        // 휴대폰번호
                email1Modify(res.data.result.usrEmail.split('@')[0]);        // 이메일
                email2Modify(res.data.result.usrEmail.split('@')[1]);        // 이메일
                incCdModify(res.data.result.incCd);        // 직위
                apoCdModify(res.data.result.apoCd);        // 직책
                teamNmModify(res.data.result.timNm);        // 팀명
            }
        })
    }

    // 조회
    useEffect(() => {
        fn_userInfo();
    }, []);

    // 유효성검사
    const validatehtmlForm = () => {

        // let v_fields = fields;
        let errors = {};
        let htmlFormIsValid = true;

        if (!existPw) {
            htmlFormIsValid = false;
            errors["existPw"] = "*비밀번호를 입력하세요.";
        }
        if (!pw) {
            htmlFormIsValid = false;
            errors["pw"] = "*비밀번호를 입력하세요.";
        }
        if (!pwChk) { 
            htmlFormIsValid = false;
            errors["pwChk"] = "*비밀번호확인을 입력하세요.";
        }
        if (pw !== pwChk) {
            htmlFormIsValid = false;
            errors["pwChk"] = "*비밀번호가 일치하지 않습니다.";
        }
        if (!ctt2 || !ctt3) {
            htmlFormIsValid = false;
            errors["ctt2"] = "*휴대폰번호를 입력하세요.";
        }
        if (!email1) {
            htmlFormIsValid = false;
            errors["email1"] = "*이메일을 입력하세요.";
        }
        if (!incCd || incCd === '0') {
            htmlFormIsValid = false;
            errors["incCd"] = "*직위를 선택하세요.";
        }
        if (!apoCd || apoCd === '0') {
            htmlFormIsValid = false;
            errors["apoCd"] = "*직책을 선택하세요.";
        }
        if (apoCd === '204' && !teamNm) {
            htmlFormIsValid = false;
            errors["teamNm"] = "*팀명을 입력하세요.";
        }

        setErrors(errors);
        return htmlFormIsValid;
    }

    const onSubmit = (data) => {
        data.preventDefault(data);
        
        let teamData = {"teamNm": teamNm};
        let chkPw    = {"id":id ,"existPw": existPw};

        if (validatehtmlForm()) {

            axios.post('/api/user/existPwChk',chkPw)
            .then(function(res) {
                if (res.data.chkPw != 1) {
                    alert("기존 비밀번호가 다릅니다.\n 다시 입력해 주세요.");
                }
                else {
                    // 팀명이 있으면 말고 없으면 팀명 insert
                    axios.post('/api/user/insertTeam',teamData)
                    .then(function(res) {

                        let regDataList = { "num":userInfo.usrNum,
                                            "name":name , "id":id , "existPw":existPw , "pw":pw , 
                                            "pwChk":pwChk ,  "birMd":birMd,
                                            "ctt1":ctt1 , "ctt2":ctt2 , "ctt3":ctt3 , 
                                            "email1":email1 , "email2":email2 ,  
                                            "incCd":incCd , "apoCd":apoCd, "teamNm":teamNm };
                        
                        axios.post('/api/user/updateMember',regDataList)
                        .then(function(res) {
                            if (res.data.result > 0) {
                                props.onClose(false);
                                alert('회원이 성공적으로 수정되었습니다.');
                            }
                            else {
                                alert('회원가입 실패 입력확인 바람');
                            }
                        })
      
                    })
                }
            })
        }
        else {
        }
    }

    // 이메일
    const emailList = ["직접입력","u2w.co.kr","naver.com","daum.com","google.com","hanmail.com"];

    const handleEmailSelect = (e) => {
        setEmailSelected(e.target.value);
        if (e.target.value === 'u2w.co.kr') {
            email2 = emailList[1];
        }
        if (e.target.value === 'naver.com') {
            email2 = "naver.com";
        }
        if (e.target.value === 'daum.com') {
            email2 = 'daum.com';
        }
        if (e.target.value === 'google.com') {
            email2 = 'google.com';
        }
        if (e.target.value === 'hanmail.com') {
            email2 = 'hanmail.com';
        }
        if (e.target.value === '직접입력') {
            email2 = "";
        }
        email2Modify(email2);
    };


    return (
        <form id="memRevise" name="memRevise" onSubmit={onSubmit}>
            <div className="dimmed"></div>
            <div className="popup w1000">
                <div className="popTitle">
                    <h2>개인정보관리</h2>
                </div>
                <div className="popCont">
                    <div className="inner">
                    {/* 개인정보 관리 */}
                        <div className="tb05 mt10">
                            <table>
                                <colgroup>
                                    <col style={col1}></col>
                                    <col style={col2}></col>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">이름</th>
                                    <td>
                                        <p className="w110" id="name">{name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em>아이디</em></th>
                                    <td>
                                        <p className="w110" id="id">{id}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>기존 비밀번호</th>
                                    <td>
                                        <div className="diFlex inputKeypad w110">
                                            <input type="password" placeholder="" className="w100p" id='existPw' value={existPw || ''}
                                             onChange={(e) => { existPwModify(e.target.value); }}/>
                                        </div>
                                        {errors && <span className="ml10 point01 bold">{errors?.existPw}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>새로운 비밀번호</th>
                                    <td>
                                        <div className="diFlex inputKeypad w110">
                                            <input type="password" placeholder="" className="w100p" id='pw'  value={pw || ''}
                                             onChange={(e) => { pwModify(e.target.value); }}/>
                                        </div>
                                        {errors && <span className="ml10 point01 bold">{errors?.pw}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>새로운 비밀번호 확인</th>
                                    <td>
                                        <div className="diFlex inputKeypad w110">
                                            <input type="password" placeholder="" className="w100p" id='pwChk'  value={pwChk || ''}
                                             onChange={(e) => { pwChkModify(e.target.value);}}/>
                                        </div>
                                        {errors && <span className="ml10 point01 bold">{errors?.pwChk}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em>생년월일</em></th>
                                        <td>
                                            <p className="w110" id="birMd">{birMd}</p>
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>휴대폰번호</th>
                                    <td>
                                        <input type="text" id="ctt1" value={ctt1} placeholder="" className="w70"
                                         onChange={(e) => { ctt1Modify(e.target.value);  }}/>
                                        <span className="wave">-</span> 
                                        <input type="text" id="ctt2" value={ctt2} placeholder="" className="w70"
                                         onChange={(e) => { ctt2Modify(e.target.value);  }}/>
                                        <span className="wave">-</span> 
                                        <input type="text" id="ctt3" value={ctt3} placeholder="" className="w70"
                                         onChange={(e) => { ctt3Modify(e.target.value);  }}/>
                                        {errors && <span className="ml10 point01 bold">{errors?.ctt2}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>이메일</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110" value={email1|| ''} 
                                         onChange={(e) => { email1Modify(e.target.value);  }}/>
                                        <span className="wave">@</span> 
                                        <input type="text" placeholder="" className="w110" value={email2|| ''}
                                         onChange={(e) => { email2Modify(e.target.value);  }}/>
                                        <select className="w130" onChange={handleEmailSelect} value={emailSelected}>
                                            {emailList.map((item) => (
                                                <option value={item || ''} key={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select> 
                                        {errors && <span className="ml10 point01 bold">{errors?.email1}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>직위</th>
                                    <td>
                                        <select className="w110" id="incCd" onChange={(e) => { incCdModify(e.target.value);  }} value={incCd} >
                                            <CodeSelectOption codeGroup={'INC_CD'} />
                                        </select>
                                        {errors && <span className="ml10 point01 bold">{errors?.incCd}</span>} 
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>직책</th>
                                    <td>
                                        <select className="w110" id="apoCd" onChange={(e) => { apoCdModify(e.target.value);  }} value={apoCd} >
                                            <CodeSelectOption codeGroup={'APO_CD'} />
                                        </select>
                                        {errors && <span className="ml10 point01 bold">{errors?.apoCd}</span>} 
                                    </td>
                                </tr>
                                { apoCd === '204' ?
                                <tr>
                                    <th scope="row"><em className="important">*</em>팀명</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110" id="teamNm" value={teamNm || ''}
                                         onChange={(e) => { teamNmModify(e.target.value);  }}/>
                                        {errors && <span className="ml10 point01 bold">{errors?.teamNm}</span>}
                                    </td>
                                </tr> 
                                : null }
                                </tbody>
                            </table>
                        </div>

                        <div className="gridUtilBottom">
                            <div className="fl">
                                <div className="">
                                    <p className="bullet01"><span className="important">*</span>표시가 있는 항목만 수정 가능합니다.</p>
                                </div>
                            </div>
                            <div className="fr">
                                <button type="submit" className="btn01"><span>개인정보 변경</span></button>
                            </div>
                        </div>
                    {/* // 개인정보관리 */}

                    </div>
                </div>
                <a  className='popClose'
                    onClick={() => {
                        props.onClose(false);
                    }}
                >창닫기</a>
            </div>
        </form>
    );
}

export default MN300;