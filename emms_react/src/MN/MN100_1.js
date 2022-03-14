
import React, { useEffect, useState } from 'react';
import './MN100_1.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ACT_USER_INFO_UPDATE } from "../reducers/userInfo";
import { useDispatch } from 'react-redux';

function MN100_1(props) {

  //redux dispatch 사용준비
  const dispatch = useDispatch();

  const setUser = (userInfo) => {
    dispatch(ACT_USER_INFO_UPDATE({ userInfo: userInfo }));
  };

  
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    console.log("========================================");
    console.log(data);
    console.log("========================================");

    axios.post('/api/join/register', data)
    .then(function(res) {
      console.log(res);
      console.log("res.data.register : " + res.data)
      if (res.data === true) {
        console.log('회원가입 성공');
      }
      else {
        console.log('회원가입 실패 입력확인 바람');
      }
    })
    .catch(function(res) {
        console.log('회원가입 실패');
        console.log('#####################')
        console.log(res);
        console.log('#####################')
        console.log(data)
    }) 
  }

  const onError = (error) => {
    console.log(error);
  }
  console.log(watch());


  // 직책 값
  let [incOptions, setIncOptions] = useState(null);

  // useEffect(() => {
  //     console.log("useEffect 실행됨");
  //     axios.get('/MN100_1/api/getApoList')
  //     .then((rs) =>{
  //         setusr(rs.data);
  //         console.log(rs.data);
  //     }).catch(() => {
  //         alert("사용자 불러오기 실패");
  //     })
  // },[])


  return (
    <div className="loginWrap">
      <section className="loginHeader">
        <h1><img src='logo_01.png' alt="정예맴버로고"></img><span>정예맴버 프로젝트관리시스템</span></h1>
      </section>

      <section className="loginBody h600">

        <div className="loginLeft"><div className="txtLogin">회원가입</div></div>
        
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
                        <col style="width:130px"></col>
                        <col style="width:auto"></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row"><em className="important">*</em>이름</th>
                            <td>
                                <input type="text" placeholder="" className="w110" value=""/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><em className="important">*</em>아이디</th>
                            <td>
                                <input type="text" placeholder="" className="w110" value=""/>
                                <button type="button" className="btn btn03s ml5"><span>중복확인</span></button>
                                <span className="ml10 point01 bold">영문,숫자 조합 6~12자</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><em className="important">*</em>비밀번호</th>
                            <td>
                                <div className="diFlex inputKeypad w110">
                                    <input type="password" placeholder="" value="" className="w100p"/>
                                </div>
                                <span className="ml10 point01 bold">영문,숫자,특수문자(!@#$%^&()*) 조합 8~12자</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><em className="important">*</em>비밀번호확인</th>
                            <td>
                                <div className="diFlex inputKeypad w110">
                                    <input type="password" placeholder="" value="" className="w100p"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><em className="important">*</em>생년월일</th>
                                <td>
                                    <span className="datepickerBox"><input type="text" placeholder="2021-01-12"/></span>
                                    <span className="wave">~</span>
                                    <span className="datepickerBox"><input type="text" placeholder="1997-09-02"/></span>
                                </td>
                        </tr>
                        <tr>
                            <th scope="row"><em className="important">*</em>휴대폰번호</th>
                            <td>
                                <select className="w70">
                                    <option>010</option>
                                    <option>02</option>
                                    <option>070</option>
                                </select> 
                                <span className="wave">-</span> 
                                <input type="text" placeholder="" value="" className="w70"/>
                                <span className="wave">-</span> 
                                <input type="text" placeholder="" value="" className="w70"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">이메일</th>
                            <td>
                                <input type="text" placeholder="" value="" className="w110"/>
                                <span className="wave">@</span> 
                                <input type="text" placeholder="" value="" className="w110"/>
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
                                <select className="w110">
                                    <option>부장</option>
                                    <option>차장</option>
                                    <option>과장</option>
                                    <option>대리</option>
                                    <option>사원</option>
                                    <option>대표</option>
                                    <option>부사장</option>
                                    <option>상무</option>
                                    <option>이사</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><em className="important">*</em>직책</th>
                            <td>
                                <select className="w110">
                                    <option>팀장</option>
                                    <option>관리</option>
                                    <option>영업</option>
                                    <option>사업지원</option>
                                    <option>팀원</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><em className="important">*</em>팀명</th>
                            <td>
                                <input type="text" placeholder="" value="" className="w110"/>
                                <button type="button" className="btn btn03s ml5"><i className="ic_search_gray"></i><span className="hidden">찾기</span></button>
                            </td>
                        </tr>               
                    </tbody>
                </table>
            </div>
            <div className="btnArea mt30">
                <button type="button" className="btn01 w150"><span>회원가입</span></button>
            </div> 

        </div>
      </section>
    </div>




    /* <div classNameName='loginregister'>
      <form id="signUpFrm" name="signUpFrm" onSubmit={handleSubmit(onSubmit, onError)}>
        <div classNameName='h2_logo'><h2>emms 가입</h2></div>

        <div>
          <input name="loginId" type="text" id='loginId'  
          {...register("loginId",
            {
              required: { value: true, message: "아이디를 입력하세요." },
              minLength: { value: 3, message: "아이디는 3자리 이상" }
            }
          )}
          placeholder="로그인 ID" classNameName="loginregister__input"/>
        </div>
        {errors.loginId && <p classNameName="valid">{errors?.loginId?.message}</p>} 
        
        <div>
          <input name="password" type="password" id='password'
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
          placeholder="비밀번호" classNameName="loginregister__input"/>
        </div>
        {errors.password && <p classNameName="valid">{errors?.password?.message}</p>}

        <div>
          <input name="confirmPassword" type="password" id='confirmPassword'  
          {...register("confirmPassword",
            {
              message:"비밀번호가 일치하지 않습니다.",
            },
          )}
          placeholder="비밀번호 확인" classNameName="loginregister__input"/>
        </div>
        {errors.confirmPassword && <p classNameName="valid">{errors?.confirmPassword?.message}</p>}
        
        <div>
          <input name="name" type="text" id='name' 
          {...register("name",
            {
              required: { value: true, message: "이름을 작성해 주세요."},
            }
          )} 
          placeholder="이름" classNameName="loginregister__input"/>
        </div>
        {errors.name && <p classNameName="valid">{errors?.name?.message}</p>}

        <div>
          <input name="usrBirth" type="text" id='usrBirth'   
          {...register("usrBirth",
            {
              required: { value: true, message: "생년월일을 작성해 주세요."},
            }
          )} 
          placeholder="생년월일" classNameName="loginregister__input"/>
        </div>
        {errors.usrBirth && <p classNameName="valid">{errors?.usrBirth?.message}</p>}

        <div>
          <input name="usrEmail" type="email" id='usrEmail'  
          {...register("usrEmail",
            {
              required: { value: true, pattern: /^\S+@\S+$/i, message: "이메일 형식을 지켜주세요."},
            }
          )} 
          placeholder="이메일" classNameName="loginregister__input"/>
        </div>
        {errors.usrEmail && <p classNameName="valid">{errors?.usrEmail?.message}</p>}

        <div>
          <input name="usrTelNum" type="text" id='usrTelNum'   
          {...register("usrTelNum",
            {
              required: { value: true, pattern: /^[0-9]+/g, message: "숫자만 입력할 수 있습니다."},
              required: { value: true, message: "전화번호를 작성해 주세요."},
            }
          )} 
          placeholder="전화번호" classNameName="loginregister__input"/>
        </div>
        {errors.usrTelNum && <p classNameName="valid">{errors?.usrTelNum?.message}</p>}

        <div>
          <input name="usrAdr" type="text" id='usrAdr'   
          {...register("usrAdr",
            {
              required: { value: true, message: "주소를 작성해 주세요."},
            }
          )} 
          placeholder="주소" classNameName="loginregister__input"/>
        </div>
        {errors.usrAdr && <p classNameName="valid">{errors?.usrAdr?.message}</p>}

        <div>
          <input name="incCd" type="text" id='incCd'   
          placeholder="직위" classNameName="loginregister__input"/>
        </div>

        <div>
          {/* <select onChange={} name="apoCd" type="text" id='apoCd'   
             placeholder="직책" classNameName="loginregister__input">
            <option value="001">조건검색1</option>
            <option value="002">조건검색2</option>
          </select> */
    //     </div>

    //     <div>
    //       <input name="timName" type="text" id='timName'   
    //       placeholder="팀명" classNameName="loginregister__input"/>
    //     </div>

    //     <div><button classNameName="loginregister__button">회원가입</button></div>

    //   </form>
    // </div> 
  );

}

export default MN100_1;