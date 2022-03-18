
import React, { useEffect, useState, useRef, lazy } from 'react';
import './MN200.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ACT_USER_INFO_UPDATE } from "../reducers/userInfo";
import { useDispatch } from 'react-redux';
import Img from "../imgs/logo_01.png"; 


const Team_ARR = [
    "test",
]

function MN200() {

    const dispatch = useDispatch();

    const [inputs, setInput] = useState({
        userName: "",         // 이름
        userId: "",           // 아이디
        userPw: "",           // 비밀번호
        userCfPw: "",         // 비밀번호체크
        userBirth: "",        // 생년월일
        usePhoneNum2: "",     // -전화-
        usePhoneNum3: "",     // -전화
        userEmail1: "",       // 이메일@
        userEmail2: "",       // @이메일
        userTimName: "",      // 팀명
        usableId: false,      // 중복체크
    })

    const {userName, userId, userPw, userCfPw, userBirth, usePhoneNum2, usePhoneNum3, userEmail1, userEmail2, userTimName, usableId } = inputs;
    const [option, setOption] = useState("선택");
    const [teamInput, setTeamInput] = useState("");
    const [searchResult, setSearchResult] = useState(Team_ARR);
    const [showTeamList, setShowTeamList] = useState(true);
    const [overIdLength, setOverIdLength] = useState(false);
    const [overPwLength, setoverPwLength] = useState(false);

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput ({
            ...inputs,
            [name]:value,
            usableId: usableId,
        });

        if (inputs.userId.length > 8) {
            setOverIdLength(true);
        } else {
            setOverIdLength(false);
        }

        if (inputs.userPw.length > 12) {
            setoverPwLength(true);
        } else {
            setoverPwLength(true);
        }
    };



    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    // 회원가입
    const onSubmit = (data) => {
  
    }

    const [loginIdChk, setLoginIdChk] = useState("");
    const checkId = (e) => {
        e.preventDefault();
        axios.get('/api/join/getIdList')
        .then((response) => {
            console.log("response : " +response);
            console.log("response.data : " +response.data);
            if (response.data === 0) {
                setLoginIdChk()
                alert("사용 가능한 아이디입니다.");
                console.log("inputs" + inputs);
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

    console.log("워치 : " + watch());

    const col1 = {width:'130'};
    const col2 = {width:'auto'};

    return (
    <div className="loginPage">
        <div className="loginWrap">
        <section className="loginHeader">
            <h1><img src={Img}/><span>정예맴버 프로젝트관리시스템</span></h1>
        </section>
        <section className="loginBody h600">

            <div className="loginLeft"><div className="txtLogin">회원가입</div></div>
            <form id="signUpFrm" name="signUpFrm" onSubmit={handleSubmit(onSubmit, onError)}>
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
                                        name='name' id='name'
                                        {...register("name",
                                            {
                                            required: { value: true, message: "이름을 작성해 주세요."},
                                            }
                                        )}
                                        />
                                        {errors.name && <span className="ml10 point01 bold">{errors?.name?.message}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>아이디</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110"
                                        name='loginId' id='loginId'
                                    
                                        />
                                        <button type="button" className="btn btn03s ml5" onClick={checkId}><span>중복확인</span></button>
                                        {errors.loginId && <span className="ml10 point01 bold">{errors?.loginId?.message}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>비밀번호</th>
                                    <td>
                                        <div className="diFlex inputKeypad w110">
                                            <input type="password" placeholder="" className="w100p"
                                            name='password' id='password'
                                            {...register("password",
                                                {
                                                required: { value: true, message: "비밀번호를 입력하세요." },
                                                minLength: {
                                                    value: 8,
                                                    message: "8자 이상의 비밀번호를 입력해주세요.",
                                                },
                                                maxLength: {
                                                    value:16,
                                                    message: "16자 이하만 사용가능합니다.",
                                                },
                                                pattern: {
                                                    value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                                                    message: "영문, 숫자를 혼용하여 입력해주세요.",
                                                }
                                                }
                                            )}
                                            />
                                        </div>
                                        {errors.password && <span className="ml10 point01 bold">{errors?.password?.message}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>비밀번호확인</th>
                                    <td>
                                        <div className="diFlex inputKeypad w110">
                                            <input type="password" placeholder="" className="w100p"
                                            name="confirmPassword" id='confirmPassword' 
                                            {...register("confirmPassword",
                                                {
                                                required: { value: true, message: "비밀번호를 입력하세요." },
                                                minLength: {
                                                    value: 8,
                                                    message: "8자 이상의 비밀번호를 입력해주세요.",
                                                },
                                                maxLength: {
                                                    value:16,
                                                    message: "16자 이하만 사용가능합니다.",
                                                },
                                                pattern: {
                                                    value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                                                    message: "영문, 숫자를 혼용하여 입력해주세요.",
                                                },
                                                // validate: 
                                                //   (value) => value === password.current,
                                                //   message: "비밀번호가 일치하지 않습니다."
                                                
                                                }
                                            )}
                                            />
                                            {errors.confirmPassword && errors.confirmPassword.type === "validate" &&
                                            (<span className="ml10 point01 bold">{errors?.confirmPassword?.message}</span>)}
                                            {errors.confirmPassword && errors.confirmPassword.type === "required" &&
                                            (<span className="ml10 point01 bold">비밀번호를 확인해 주시기 바랍니다.</span>)}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>생년월일</th>
                                    <td>
                                        <span className="datepickerBox">
                                        <input type="text" placeholder="1997-09-02"
                                            name='usrBirth' id='usrBirth'
                                            {...register("usrBirth",
                                            {
                                                required: { value: true, message: "생년월일을 작성해 주세요."},
                                            }
                                            )}
                                        />
                                        </span>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>휴대폰번호</th>
                                    <td>
                                        <select className="w70">
                                            <option>010</option>
                                            <option>011</option>
                                            <option>012</option>
                                        </select> 
                                        <span className="wave">-</span> 
                                        <input type="text" placeholder="" className="w70"
                                        name='usrTelNum1' id='usrTelNum1'
                                        {...register("usrTelNum1",
                                            {
                                            required: { value: true, message: "가운데 자리를 작성해 주세요."},
                                            }
                                        )} 
                                        />
                                        <span className="wave">-</span> 
                                        <input type="text" placeholder="" className="w70"
                                        name='usrTelNum2' id='usrTelNum2'
                                        {...register("usrTelNum2",
                                            {
                                            required: { value: true, message: "마지막 자리를 작성해 주세요."},
                                            }
                                        )} 
                                        />
                                        {/* <span>
                                        {usrTelNum1 === '' ? (
                                            usrTelNum2 === '' ? (
                                            <span className="ml10 point01 bold">휴대폰번호를 모두 입력해 주세요</span>
                                            ) : (
                                            <span className="ml10 point01 bold">{errors?.usrTelNum1?.message}</span>
                                            )
                                        ) : (
                                            <span className="ml10 point01 bold">{errors?.usrTelNum2?.message}</span>
                                        )}
                                        </span> */}
                                        {errors.usrTelNum1 && errors.usrTelNum2 && <span className="ml10 point01 bold">휴대폰번호를 입력해주세요.</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">이메일</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110"/>
                                        <span className="wave">@</span> 
                                        <input type="text" placeholder="" className="w110"/>
                                        <select className="w130">
                                            <option>직접입력</option>
                                            <option>u2w.co.kr</option>
                                            <option>naver.com</option>
                                            <option>daum.com</option>
                                            <option>google.com</option>
                                            <option>hanmail.com</option>
                                        </select> 
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>직위</th>
                                    <td>
                                        <select  >
                                            <option>선택</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>직책</th>
                                    <td>
                                        <select  >
                                            <option>선택</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><em className="important">*</em>팀명</th>
                                    <td>
                                        <input type="text" placeholder="" className="w110"/>
                                        <button type="button" className="btn btn03s ml5"><i className="ic_search_gray"></i><span className="hidden">찾기</span></button>
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