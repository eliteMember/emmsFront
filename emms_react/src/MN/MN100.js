import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './MN100.css';
import { ACT_USER_INFO_UPDATE } from "../reducers/userInfo";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function MN100(props) {

  //redux dispatch 사용준비
  const dispatch = useDispatch();

  const setUser = (userInfo) => {
    dispatch(ACT_USER_INFO_UPDATE({ userInfo: userInfo }));
  };

  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    axios.post('/api/login', data)
      .then(function (res) {
        if (res.data.login === true) {
          console.log('로그인 성공');
          setUser(res.data.tbUsrMstVo);
          props.isLoginChange(true);

          //alert('로그인 성공');
          //history.push('/');

          // if (!location.state?.from) {
          //     history.push('/');
          // } else {
          //     history.push(location.state.from);
          // }

        } else {
          console.log('아이디 또는 비밀번호가 다름');
          alert('아이디 또는 비밀번호가 다름');
        }
      })
      .catch(function (res) {
        console.log('로그인 실패');
        alert('로그인 실패');
      })

  }

  const onError = (error) => {
    console.log(error);
  }
  console.log(watch());

  return (
    <div className="wrap">
      <div className='MN100_DIV'>
        <form id="loginFrm" name="loginFrm" onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>로그인</h1>
          <div>
            <input type="text" id="loginId" name="loginId" placeholder='아이디'
              {...register("loginId",
                {
                  required: { value: true, message: "아이디를 입력하세요." },
                  minLength: { value: 3, message: "아이디는 3자리 이상" }
                }
              )}
            />
            {errors && <p className="valid">{errors?.loginId?.message}</p>}
            <br />
            <input type="password" id="password" name="password" placeholder='비밀번호'
              {...register("password",
                {
                  required: { value: true, message: "비밀번호를 입력하세요." }
                }
              )}
            />
            {errors && <p className="valid">{errors?.password?.message}</p>}
          </div>
          <button type="submit">로그인</button>
          <button><Link to="/MN100_1" className="join_register">회원가입</Link></button>

        </form>
      </div>

    </div>
  )
}


export default MN100;