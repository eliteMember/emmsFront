
import React, { useEffect, useState, useRef, lazy } from 'react';
import './MN200.css';
import axios from 'axios';
import Img from "../imgs/logo_01.png"; 
import { useDispatch } from 'react-redux';
import { ACT_CMMN_CODE_GETLIST } from '../reducers/cmmnCode'
import { useSelector } from "react-redux";

import { getYear, getMonth } from "date-fns"; // getYear, getMonth 
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ko", ko) // 한국어적용
const _ = require('lodash');

let CodeSelectOption = lazy(()=> import('../Component/CodeSelectOption.js') );

function MN200(props) { 

    const userInfo = useSelector(state => state.userInfo);

    //redux dispatch 사용준비
    const dispatch = useDispatch();
    //reducer store에 접근하여 userInfo state를 가져옴

    const setCode = (cmmnCode) =>{
        // store에 있는 state 바꾸는 함수 실행
        dispatch(ACT_CMMN_CODE_GETLIST({cmmnCode:cmmnCode}));
        console.log(cmmnCode)
    };

    // 필드값
    const [fields, setFields] = useState({
        userName: "",         // 이름
        userId: "",           // 아이디
        userPw: "",           // 비밀번호
        userCfPw: "",         // 비밀번호체크
        userBirth: "",        // 생년월일
        usePhoneNum1: "",     // -전화-
        usePhoneNum2: "",     // -전화-
        usePhoneNum3: "",     // -전화
        userEmail1: "",       // 이메일@
        userEmail2: "",       // @이메일
        userIncCd: "",        // 직책
        userApoCd: "",        // 직책
        userTimName: "",      // 팀명
        usableId: false,      // 중복체크
    });

    // 필드값 에러
    const [errors, setErrors] = useState({
        userName: "",         // 이름
        userId: "",           // 아이디
        userPw: "",           // 비밀번호
        userCfPw: "",         // 비밀번호체크
        userBirth: "",        // 생년월일
        usePhoneNum1: "",     // -전화-
        usePhoneNum2: "",     // -전화-
        usePhoneNum3: "",     // -전화
        userEmail1: "",       // 이메일@
        userEmail2: "",       // @이메일
        userIncCd: "",        // 직위
        userApoCd: "",        // 직책
        userTimName: "",      // 팀명
        usableId: false,      // 중복체크
    });

    let realEmail = "";

    const handleChange = event => {
        const { name, value } = event.target;
        let v_fields = {...fields};
        v_fields[name] = value;
        console.log(v_fields[name]);
        setFields(v_fields);
    }

    // 회원가입
    const onSubmit = (data) => {
        data.preventDefault();
        let v_fields = fields;
        // let v_Incfields = userIncCd;
        // let v_Apofields = userApoCd;
        if (validatehtmlForm()) {
            alert("htmlForm submitted");
            console.log("이름 : " + v_fields["userName"])
            console.log("아이디 : " + v_fields["userId"])
            console.log("비밀번호 : " + v_fields["userPw"])
            console.log("비밀번호확인 : " + v_fields["userCfPw"])
            console.log("생년월일 : " + v_fields["userBirth"])
            console.log("휴대폰번호 : " + v_fields["usePhoneNum1"] + v_fields["usePhoneNum2"] + v_fields["usePhoneNum3"])
            console.log("이메일 : " + v_fields['userEmail1'] + '@' + v_fields["userEmail2"])
            console.log("직위 : " + v_fields["userIncCd"])
            console.log("직책 : " + v_fields["userApoCd"])
            console.log("팀명 : " + v_fields["userTimName"])

            axios.post('/api/join/register', data)
            .then(function(res) {
                console.log("data", res.data)
                if (validatehtmlForm()) {
                    alert("htmlForm submitted");
                    if (res.data === true) {
                        console.log('회원가입 성공');
                    }
                    else {
                        console.log('회원가입 실패 입력확인 바람');
                    }
                }
                else {
                    alert("validation 체크 실패");
                }
            })
            .catch(function(res) {
                console.log('회원가입 실패');
            }) 
        }
        else {
            alert("no")
            console.log("이름 : " + v_fields["userName"])
            console.log("아이디 : " + v_fields["userId"])
            console.log("비밀번호 : " + v_fields["userPw"])
            console.log("비밀번호확인 : " + v_fields["userCfPw"])
            console.log("생년월일 : " + v_fields["userBirth"])
            console.log("휴대폰번호 : " + v_fields["usePhoneNum1"] + v_fields["usePhoneNum2"] + v_fields["usePhoneNum3"])
            console.log("이메일 : " + v_fields['userEmail1'] + '@' + v_fields["userEmail2"])
            console.log("직위 : " + v_fields["userIncCd"])
            console.log("직책 : " + v_fields["userApoCd"])
            console.log("팀명 : " + v_fields["userTimName"])
        }
    }

    // 유효성검사
    const validatehtmlForm = () => {

        let v_fields = fields;
        let errors = {};
        let htmlFormIsValid = true;

        if (!v_fields["userName"]) {
            htmlFormIsValid = false;
            errors["userName"] = "*이름을 입력하세요.";
        }
        if (!v_fields["userId"]) {
            htmlFormIsValid = false;
            errors["userId"] = "*아이디를 입력하세요.";
        }
        if (!v_fields["userPw"]) {
            htmlFormIsValid = false;
            errors["userPw"] = "*비밀번호를 입력하세요.";
        }
        if (!v_fields["userCfPw"]) {
            htmlFormIsValid = false;
            errors["userCfPw"] = "*비밀번호확인을 입력하세요.";
        }
        if (v_fields["userPw"] !== v_fields["userCfPw"]) {
            htmlFormIsValid = false;
            errors["userCfPw"] = "*비밀번호가 일치하지 않습니다.";
        }
        if (!v_fields["userBirth"]) {
            htmlFormIsValid = false;
            errors["userBirth"] = "*생년월일을 입력하세요.";
        }
        if (!v_fields["usePhoneNum2"] || !v_fields["usePhoneNum3"]) {
            htmlFormIsValid = false;
            errors["usePhoneNum2"] = "*휴대폰번호를 입력하세요.";
        }
        if (!v_fields["userEmail1"]) {
            htmlFormIsValid = false;
            errors["userEmail1"] = "*이메일을 입력하세요.";
        }
        if (!v_fields["userIncCd"]) {
            htmlFormIsValid = false;
            errors["userIncCd"] = "*직위를 선택하세요.";
        }
        if (!v_fields["userApoCd"]) {
            htmlFormIsValid = false;
            errors["userApoCd"] = "*직책을 선택하세요.";
        }
        if (!v_fields["userTimName"]) {
            htmlFormIsValid = false;
            errors["userTimName"] = "*팀명을 입력하세요.";
        }

        setErrors(errors);
        return htmlFormIsValid;
    }

    // 생년월일
    const [birthDate, setBirthDate] = useState(new Date());
    const years = _.range(1950, getYear(new Date()) + 1, 1);
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    // const [birthDate, setBirthDate] = useState(null);
    useEffect(() => {
        let v_fields = {...fields};

        if( birthDate != null ){
            v_fields['userBirth']  = toStringByFormattingDay(birthDate);
        }
        setFields(v_fields);
        
        console.log(v_fields['userBirth']);

    }, [birthDate]);

    //월이 1자리 일 경우 앞에 0
    function leftPad(value) { 
        if (value >= 10) { 
            return value; 
        } 
        return `0${value}`; 
    } 

    //dateFormat - 년,월,일
    function toStringByFormattingDay(source, delimiter = '') { 
        console.log(source);
        const year = source.getFullYear(); 
        const month = leftPad(source.getMonth() + 1); 
        const day = leftPad(source.getDate()); 
        return [year, month, day].join(delimiter); 
    }

    
    //////////////////////////////////////////////////////////////////////////////////
    // 이름 생년월일 조회
    let [usrName, setUsrName] = useState('');
    let [usrBirth, setUsrBirth] = useState('');
    function setMyNameSelect(){
        let v_fields = fields;
        let nmBirChkData = {"usrName": v_fields.userName, "usrBirth":toStringByFormattingDay(birthDate)};

        axios.post('/api/join/nameChk', nmBirChkData)
        .then((res) => {
            console.log(res.data.result);
        });
    }
    // //////////////////////////////////////////////////////////////////////////////////
    // //이름 조회
    // const [nameList, setNameList] = useState([]);
    // //////////////////////////////////////////////////////////////////////////////////
    // // useEffect
    // useEffect(() => {
    //     //이름  조회 ( DB )
    //     axios.get('/api/join/nameChk', {})
    //         .then(function (res) {
    //             console.log(res);
    //             console.log(res.data);
    //             console.log(res.data.list);
    //             setNameList(res.data.list)
    //         })
    //         .catch(function (res) {
    //             //console.log('팀조회 실패');
    //         })
    // }, []);
    // //이름 생년월일 비교 버튼
    // function setMyNameSelect(){
    //     let v_fields = {...fields};
    //     console.log(v_fields['userName']);
    //     console.log(v_fields['userBirth']);
    //     {
    //         // nameList && nameList.map(
    //         //     (usrList, i) => {
    //         //         console.log(usrList[i].usrName)
    //         //         if (v_fields['userName'] === usrList[i].usrName) {
    //         //             if (v_fields['userBirth'] === usrList.usrBirth) {
    //         //                 console.log("데이터가 있다.")
    //         //             }
    //         //         }
    //         // })
    //     }
    //     v_fields['userName']  = userInfo.userName == null ? '':userInfo.userName  //
    //     setFields(v_fields);
    // }

    // 아이디 체크
    const [loginIdChk, setLoginIdChk] = useState("");
    const checkId = (e) => {
        
        let v_fields = fields;
        e.preventDefault();                 // 새로고침 방지

        console.log(v_fields["userId"]);
        axios.get('/api/join/getIdList')
        .then((response) => {
            console.log(response);
            
            console.log(response.data);
            if (response.data !== v_fields["userId"]) {
                setLoginIdChk()
                alert("사용 가능한 아이디입니다.");
                // console.log("inputs" + inputs);
            } else {
                console.log('error');
                alert("이미 사용중인 아이디입니다. \n 다른 아이디를 입력해주세요.")
            }
        })
        .catch(() => {
            console.log("아이디 리스트 불러오기 실패");
        })
    }

    const onError = (error) => {
        console.log("에러 : " + error);
    } 

    const col1 = {width:'130'};
    const col2 = {width:'auto'};

    // 휴대폰 번호
    // let v_fields = {...fields};
    // const usePhoneNum = v_fields['usePhoneNum1'] + v_fields['usePhoneNum2'] + v_fields['usePhoneNum3']
    // console.log("휴대폰 번호 : " + usePhoneNum)

    // 이메일
    const emailList = ["직접입력","u2w.co.kr","naver.com","daum.com","google.com","hanmail.com"];
    const [emailSelected, setEmailSelected] = useState("");

    const handleEmailSelect = (e) => {
        setEmailSelected(e.target.value);

        const { name, value } = e.target;
        let v_fields = {...fields};
        v_fields[name] = value;
        if (v_fields[name] === 'u2w.co.kr') {
            v_fields["userEmail2"] = v_fields[name];
            console.log(v_fields["userEmail2"]);
        }
        if (v_fields[name] === 'naver.com') {
            v_fields["userEmail2"] = v_fields[name];
            console.log(v_fields["userEmail2"]);
        }
        if (v_fields[name] === 'daum.com') {
            v_fields["userEmail2"] = v_fields[name];
            console.log(v_fields["userEmail2"]);
        }
        if (v_fields[name] === 'google.com') {
            v_fields["userEmail2"] = v_fields[name];
            console.log(v_fields["userEmail2"]);
        }
        if (v_fields[name] === 'hanmail.com"') {
            v_fields["userEmail2"] = v_fields[name];
            console.log(v_fields["userEmail2"]);
        }
        if (v_fields[name] === '직접입력') {
            v_fields["userEmail2"] = "";
            console.log(v_fields["userEmail2"]);
        }
        realEmail = v_fields['userEmail1'] + '@' + v_fields["userEmail2"];
        console.log(realEmail);
        setFields(v_fields);
    };


    // 직위 값
    const [incList, setIncList] = useState([]);

    // 페이지가 그려지기 전에 데이터 가져옴
    useEffect(() => {
        axios.get('/api/join/listInc', {})
        .then((rs) =>{
            // console.log(rs.data)
            setIncList(rs.data.list);
        })
        .catch(() => {
            alert("리스트 불러오기 실패");
        })
    },[]);

    // 직책 값
    const [apoList, setApoList] = useState([]);

    // 페이지가 그려지기 전에 데이터 가져옴
    useEffect(() => {
        axios.get('/api/join/listApo', {})
        .then((rs) =>{
            // console.log(rs.data)
            setApoList(rs.data.list);
        })
        .catch(() => {
            alert("리스트 불러오기 실패");
        })
    },[]);



    return (
    <div className="loginPage">
        <div className="loginWrap">
        <section className="loginHeader">
            <h1><img src={Img}/><span>정예맴버 프로젝트관리시스템</span></h1>
        </section>
        <section className="loginBody h600">

            <div className="loginLeft"><div className="txtLogin">회원가입</div></div>
            <form id="signUpFrm" name="signUpFrm" onSubmit={onSubmit}>
                <div className="loginRight">
                    <div className="gridUtil22">
                        <div className="fl">
                            <h3 className="font16">사용자 정보입력</h3>
                        </div>
                        <div className="fr">
                            <span className="font13"><em className="important">*</em>표시는 필수 입력사항입니다.</span>
                        </div>
                    </div>
                    <div className="tb05 mt10">
                        <table>
                            <colgroup>
                                <col style={col1}></col>
                                <col style={col2}></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row"><em className="important">*</em>이름</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110"
                                        name='userName' id='userName'
                                        value={fields.userName} onChange={handleChange}
                                        />
                                        {errors && <span className="ml10 point01 bold">{errors?.userName}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>생년월일</th>
                                    <td>
                                        <span className="datepickerBox">
                                            <DatePicker
                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    changeMonth,
                                                    decreaseMonth,
                                                    increaseMonth,
                                                    prevMonthButtonDisabled,
                                                    nextMonthButtonDisabled,
                                                }) => (
                                                <div
                                                    style={{
                                                        margin: 10,
                                                        display: "flex",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                        {"<"}
                                                    </button>
                                                    <select
                                                        value={getYear(date)}
                                                        onChange={({ target: { value } }) => changeYear(value)}
                                                    >
                                                    {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                    </select>

                                                    <select
                                                        value={months[getMonth(date)]}
                                                        onChange={({ target: { value } }) =>
                                                            changeMonth(months.indexOf(value))
                                                        }
                                                    >
                                                    {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                    </select>

                                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                        {">"}
                                                    </button>
                                                </div>
                                                )}
                                                selected={birthDate}
                                                dateFormat={"yyyy/MM/dd"}
                                                locale={ko}
                                                onChange={(date) => setBirthDate(date)}
                                                />
                                            {/* <DatePicker 
                                                dateFormat="yyyy-MM-dd"
                                                selected = {birthDate}
                                                onChange = {date=>setBirthDate(date)}
                                                locale = {ko}
                                                value={fields.userBirth}
                                                className='w110'
                                            /> */}
                                            {errors && <span className="ml10 point01 bold">{errors?.userBirth}</span>}
                                        </span>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td className='btnArea mt30' colSpan="2">
                                        <button type="button" className="btn btn03s w150" onClick={setMyNameSelect}><span>등록확인</span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>휴대폰번호</th>
                                    <td>
                                        <input type="text" placeholder="" className="w70"
                                        name='usePhoneNum1' id='usePhoneNum1'
                                        value={fields.usePhoneNum1} onChange={handleChange}

                                        />
                                        <span className="wave">-</span> 
                                        <input type="text" placeholder="" className="w70"
                                        name='usePhoneNum2' id='usePhoneNum2'
                                        value={fields.usePhoneNum2} onChange={handleChange}

                                        />
                                        <span className="wave">-</span> 
                                        <input type="text" placeholder="" className="w70"
                                        name='usePhoneNum3' id='usePhoneNum3'
                                        value={fields.usePhoneNum3} onChange={handleChange}

                                        />
                                        {errors && <span className="ml10 point01 bold">{errors?.usePhoneNum2}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>아이디</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110"
                                        name='userId' id='userId'
                                        value={fields.userId} onChange={handleChange}
                                        />
                                        <button type="button" className="btn btn03s ml5" onClick={checkId}><span>중복확인</span></button>
                                        {errors && <span className="ml10 point01 bold">{errors?.userId}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>비밀번호</th>
                                    <td>
                                        <div className="diFlex inputKeypad w110">
                                            <input type="password" placeholder="" className="w100p"
                                            name='userPw' id='userPw'
                                            value={fields.userPw} onChange={handleChange}
                                            />
                                        </div>
                                        {errors && <span className="ml10 point01 bold">{errors?.userPw}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>비밀번호확인</th>
                                    <td>
                                        <div className="diFlex inputKeypad w110">
                                            <input type="password" placeholder="" className="w100p"
                                            name='userCfPw' id='userCfPw'
                                            value={fields.userCfPw} onChange={handleChange}
                                            />
                                        </div>
                                        {errors && <span className="ml10 point01 bold">{errors?.userCfPw}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">이메일</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110"
                                        name='userEmail1' id='userEmail1'
                                        value={fields.userEmail1} onChange={handleChange}
                                        />
                                        <span className="wave">@</span> 
                                        <input type="text" placeholder="" className="w110"
                                        name='userEmail2' id='userEmail2'
                                        value={fields.userEmail2} onChange={handleChange}
                                        />
                                        <select className="w130" onChange={handleEmailSelect} value={emailSelected}>
                                            {emailList.map((item) => (
                                                <option value={item} key={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select> 
                                        <div>
                                            {errors && <span className="ml10 point01 bold">{errors?.userEmail1}</span>}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>직위</th>
                                    <td>
                                        <select className="w110" id="userIncCd" name="userIncCd" onChange={handleChange} value={fields.userIncCd}>
                                            <option>선택</option>
                                            {
                                                incList.map((data, i)=>{
                                                    return <option key={i} value={data.cdVal} >{data.cdNm}</option>
                                                })
                                            }
                                        </select>
                                        {errors && <span className="ml10 point01 bold">{errors?.userIncCd}</span>}   
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>직책</th>
                                    <td>
                                        <select className="w110" id="userApoCd" name="userApoCd" onChange={handleChange} value={fields.userApoCd}>
                                            <option>선택</option>
                                            {
                                                apoList.map((data, i)=>{
                                                    return <option key={i} value={data.cdVal} >{data.cdNm}</option>
                                                })
                                            }
                                        </select>
                                        {errors && <span className="ml10 point01 bold">{errors?.userApoCd}</span>} 
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>팀명</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110"
                                        name='userTimName' id='userTimName'
                                        value={fields.userTimName} onChange={handleChange}
                                        />
                                        {/* <button type="button" className="btn btn03s ml5"><i className="ic_search_gray"></i><span className="hidden">찾기</span></button> */}
                                    </td>
                                </tr>               
                            </tbody>
                        </table>
                    </div>
                    <div className="btnArea mt30">
                        <button type="submit" className="btn01 w150"><span>회원가입</span></button>
                    </div> 

                </div>
            </form>
        </section>

        </div>
    </div>
    );

}

export default MN200;