import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Router } from 'react-router-dom';
import './MN100.css';
import { useHistory } from "react-router-dom";



function MN100(props){
  
  const history = useHistory();

  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    axios.post('/api/login', data)
    .then(function(res){
      console.log(res);
      if( res.data.login === true ){
        console.log('로그인 성공');
        props.isLoginChange( true );
        //alert('로그인 성공');
        //history.push('/');

        // if (!location.state?.from) {
        //     history.push('/');
        // } else {
        //     history.push(location.state.from);
        // }

      }else{
        console.log('아이디 또는 비밀번호가 다름');
        alert('아이디 또는 비밀번호가 다름');
      }
    })
    .catch(function(res){
      console.log('로그인 실패');
      alert('로그인 실패');
    })

  }

  const onError = (error) => {
    console.log(error);
  }


  console.log(watch());
  
  return (
        <div className='MN100_DIV'>
          <form id="loginFrm" name="loginFrm" onSubmit={handleSubmit(onSubmit, onError)}>
            <h1>로그인</h1>
            <div>
              <input type="text" id="loginId" name="loginId" placeholder='아이디' 
                {...register("loginId", 
                  {
                    required:{value:true, message:"아이디를 입력하세요."},
                    minLength:{value: 3, message:"아이디는 3자리 이상"}
                  }
                )}
              />
              {errors && <h1>{errors?.loginId?.message}</h1>}
              <br/>
              <input type="password" id="password" name="password" placeholder='비밀번호'  
                {...register("password", 
                  {
                    required:{value:true, message:"비밀번호를 입력하세요."}
                  }
                )} 
              />
              {errors && <h1>{errors?.password?.message}</h1>}
            </div>
            <button type="submit">로그인</button>
          </form>
        </div>
    )
}
      
export default MN100;