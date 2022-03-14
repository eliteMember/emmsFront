
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

    
    <div className='loginregister'>
      <form id="signUpFrm" name="signUpFrm" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className='h2_logo'><h2>emms 가입</h2></div>

        <div>
          <input name="loginId" type="text" id='loginId'  
          {...register("loginId",
            {
              required: { value: true, message: "아이디를 입력하세요." },
              minLength: { value: 3, message: "아이디는 3자리 이상" }
            }
          )}
          placeholder="로그인 ID" className="loginregister__input"/>
        </div>
        {errors.loginId && <p className="valid">{errors?.loginId?.message}</p>} 
        
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
          placeholder="비밀번호" className="loginregister__input"/>
        </div>
        {errors.password && <p className="valid">{errors?.password?.message}</p>}

        <div>
          <input name="confirmPassword" type="password" id='confirmPassword'  
          {...register("confirmPassword",
            {
              message:"비밀번호가 일치하지 않습니다.",
            },
          )}
          placeholder="비밀번호 확인" className="loginregister__input"/>
        </div>
        {errors.confirmPassword && <p className="valid">{errors?.confirmPassword?.message}</p>}
        
        <div>
          <input name="name" type="text" id='name' 
          {...register("name",
            {
              required: { value: true, message: "이름을 작성해 주세요."},
            }
          )} 
          placeholder="이름" className="loginregister__input"/>
        </div>
        {errors.name && <p className="valid">{errors?.name?.message}</p>}

        <div>
          <input name="usrBirth" type="text" id='usrBirth'   
          {...register("usrBirth",
            {
              required: { value: true, message: "생년월일을 작성해 주세요."},
            }
          )} 
          placeholder="생년월일" className="loginregister__input"/>
        </div>
        {errors.usrBirth && <p className="valid">{errors?.usrBirth?.message}</p>}

        <div>
          <input name="usrEmail" type="email" id='usrEmail'  
          {...register("usrEmail",
            {
              required: { value: true, pattern: /^\S+@\S+$/i, message: "이메일 형식을 지켜주세요."},
            }
          )} 
          placeholder="이메일" className="loginregister__input"/>
        </div>
        {errors.usrEmail && <p className="valid">{errors?.usrEmail?.message}</p>}

        <div>
          <input name="usrTelNum" type="text" id='usrTelNum'   
          {...register("usrTelNum",
            {
              required: { value: true, pattern: /^[0-9]+/g, message: "숫자만 입력할 수 있습니다."},
              required: { value: true, message: "전화번호를 작성해 주세요."},
            }
          )} 
          placeholder="전화번호" className="loginregister__input"/>
        </div>
        {errors.usrTelNum && <p className="valid">{errors?.usrTelNum?.message}</p>}

        <div>
          <input name="usrAdr" type="text" id='usrAdr'   
          {...register("usrAdr",
            {
              required: { value: true, message: "주소를 작성해 주세요."},
            }
          )} 
          placeholder="주소" className="loginregister__input"/>
        </div>
        {errors.usrAdr && <p className="valid">{errors?.usrAdr?.message}</p>}

        <div>
          <input name="incCd" type="text" id='incCd'   
          placeholder="직위" className="loginregister__input"/>
        </div>

        <div>
          {/* <select onChange={} name="apoCd" type="text" id='apoCd'   
             placeholder="직책" className="loginregister__input">
            <option value="001">조건검색1</option>
            <option value="002">조건검색2</option>
          </select> */}
        </div>

        <div>
          <input name="timName" type="text" id='timName'   
          placeholder="팀명" className="loginregister__input"/>
        </div>

        <div><button className="loginregister__button">회원가입</button></div>

      </form>
    </div>
  );

}

export default MN100_1;