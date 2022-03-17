
import React, { useEffect, useState, useRef } from 'react';
import './MN100_1.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ACT_USER_INFO_UPDATE } from "../reducers/userInfo";
import { useDispatch } from 'react-redux';
import Img from "../imgs/logo_01.png"; 

function MN100_1() {

  const { register, watch, handleSubmit, formState: { errors } } = useForm();

  //redux dispatch 사용준비
  const dispatch = useDispatch();

  const setUser = (userInfo) => {
    dispatch(ACT_USER_INFO_UPDATE({ userInfo: userInfo }));
  };

  // 아이디 중복확인
  let [nameChk, setNameChk] = useState("");
  useEffect(() => {
    axios.get('/api/join/getIdList')
    // axios.get(process.env.REACT_APP_HOST + '/api/join/getIdList')
    .then((rs) => {
      console.log(rs.data);
      setNameChk(rs.data);
    })
    .catch(() => {
      console.log('아이디 리스트 불러오기 실패')
    })
  },[])
  
  // 비밀번호 확인
  let password = useRef();
  password.current = watch("password");

  // 직위 값
  let [inc, setInc] = useState(null);

  useEffect(() => {
      axios.get('/api/join/getIncList')
      // axios.get(process.env.REACT_APP_HOST + '/api/join/getIncList')
      .then((rs) =>{
          setInc(rs.data);
      }).catch(() => {
          alert("리스트 불러오기 실패");
      })
  },[])

  // 직책 리스트
  const IncSelectBox = () => {
    return (
      <select id='incSel' name='incSel' className="w110">
        <option id='incOption' name='incOption'>선택</option>
        {inc && inc.INC.map(
          (incList, i) =>
            <option key={i} value={incList.cdVal}>
              {incList.cdNm}
            </option>
        )}
      </select>
    )
  }

  // 직책 값
  let [apo, setApo] = useState(null);

  useEffect(() => {
      axios.get('/api/join/getApoList')
      // axios.get(process.env.REACT_APP_HOST + '/api/join/getApoList')
      .then((rs) =>{
          setApo(rs.data);
      }).catch(() => {
          alert("리스트 불러오기 실패");
      })
  },[])

  // 직책 리스트
  const ApoSelectBox = () => {
    return (
      <select id='apoSel' name='apoSel' className="w110">
        <option id='apoOption' name='apoOption'>선택</option>
        {apo && apo.APO.map(
          (apoList, i) =>
            <option key={i} value={apoList.cdNm}>
              {apoList.cdNm}
            </option>
        )}
        {/* {...register("apoOption",
          {
            required: { value: '선택', message: "직책을 선택해 주세요."},
          }
        )}  */}
      </select>
    )
  }

  // 회원가입
  const onSubmit = (data) => {
    
    axios.post('/api/join/register', data)
    .then(function(res) {
      console.log("data", res.data)
      if (res.data === true) {
        console.log('회원가입 성공');
      }
      else {
        console.log('회원가입 실패 입력확인 바람');
      }
    })
    .catch(function(res) {
        console.log('회원가입 실패');
    }) 
  }

  const onError = (error) => {
    console.log(error);
  }
  console.log(watch());
  

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
                  <div className="gridUtil">
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
                                        {...register("loginId",
                                          {
                                            required:  { value: true, message: "영문,숫자 조합 6~12자" },
                                            minLength: { value: 6, message: "영문,숫자 조합 6~12자" },
                                            maxLength: { value: 12, message: "영문,숫자 조합 6~12자" },
                                            pattern:   { value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/, message: "영문,숫자 조합 6~12자" },
                                          }
                                        )}
                                      />
                                      <button type="button" className="btn btn03s ml5"><span>중복확인</span></button>
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
                                                validate: 
                                                  (value) => value === password.current,
                                                  message: "비밀번호가 일치하지 않습니다."
                                                
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
                                      <IncSelectBox />
                                      {errors.incSel && <span className="ml10 point01 bold">{errors?.incSel?.message}</span>}
                                  </td>
                              </tr>
                              <tr>
                                  <th scope="row"><em className="important">*</em>직책</th>
                                  <td>
                                      <ApoSelectBox />
                                      {errors.apoSel && <span className="ml10 point01 bold">{errors?.apoSel?.message}</span>}
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

export default MN100_1;