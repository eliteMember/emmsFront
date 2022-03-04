import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './MN100.css';



function MN100(props){
  
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    axios.post('http://localhost:8080/api/login', data)
    .then(function(res){
      console.log(res);
      if( res.isLogin === true ){
        console.log('로그인 성공')
      }else{
        console.log('아이디 또는 비밀번호가 다름')
      }
    })
    .catch(function(res){
      console.log('로그인 실패');
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