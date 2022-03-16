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
    <div className="loginPage">
      <div className="loginWrap">
        <section className="loginHeader">
          <h1><img src={require('../imgs/logo_01.png')} alt="정예맴버로고" /><span>정예맴버 프로젝트관리시스템</span></h1>
        </section>
        <section class="loginBody">
          <div class="loginCharacter">
            <div class="character">
            </div>
          </div>
          <div class="loginVisual">

            <div class="slogan">
              <p class="txt1">손쉬운 프로젝트관리</p>
              <p class="txt2">정예맴버</p>
              <p class="txt2"> 프로젝트관리시스템</p>
            </div>

          </div>
          <div className="loginArea">

            <p className="h2">로그인</p>
            <div className="hr20 mt10"></div>

            <div className="loginInner">
              <form id="loginFrm" name="loginFrm" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="dFlex inputKeypad id off">
                  <input type="text" id="loginId" name="loginId" className="w100p" placeholder="아이디" {...register("loginId",
                    {
                      required: { value: true, message: "아이디를 입력하세요." },
                      minLength: { value: 3, message: "아이디는 3자리 이상" }
                    }
                  )}
                  />
                  <button type="button" className="btnDel"><span>지우기</span></button>
                </div>

                <div className="dFlex inputKeypad pw on">
                  <input type="password" id="password" name="password" className="w100p" placeholder="비밀번호" {...register("password",
                    {
                      required: { value: true, message: "비밀번호를 입력하세요." }
                    }
                  )}
                  />
                </div>

                <div className="slogan">
                  <p className="mt15 bold"><Link to="/MN100_1" className="btnMore2"><span>회원가입</span></Link></p>
                </div>
                <div className="mt20 txtC">
                  <button type="submit" className="btnBig"><span className="ic_login_key">로그인</span></button>
                </div>
              </form>
              <ul className="userLink">
                <li><a href="#none"><span>아이디찾기</span></a></li>
                <li><i className="ic_bar"></i></li>
                <li><a href="#none"><span>비밀번호 재설정</span></a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="footer">
        <div className="footer_inner">

          <a href="#none" className="groupWare"><span>그룹웨어 바로가기</span></a>
          <dl>
            <dt>TEL</dt>
            <dd>02-2038-2933</dd>
          </dl>
          <div className="ic_dot ml10"></div>
          <dl className="ml10">
            <dt>FAX</dt>
            <dd>070-8282-4283</dd>
          </dl>
          <div className="ic_bar ml20"></div>
          <dl>
            <dt>한국유투더블유 홈페이지</dt>
            <dd>www.u2w.co.kr</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}


export default MN100;