import React, { useState, useEffect } from 'react';
import Header from './Layout/Header.js';
import Body from './Layout/Body.js';
import Footer from './Layout/Footer.js';
import MN100 from './MN/MN100.js';
import axios from 'axios';


function App() {

  const [isLogin, isLoginChange] = useState(false);

  useEffect(() => {
    axios.get('/api/cmmn/getSession')
      .then(res => {
        console.log(res);
        if( res.data.isLogin === true ){
          isLoginChange(true);
        }else{
          isLoginChange(false);
        }
      }).catch(()=>{
        console.log('세션정보 불러오기 에러');
      })
  }, [])
  
  return (
    <div className="App">
      
      <LoginOrMainControl isLogin = {isLogin}/>

    </div>
  );
}

 function LoginOrMainControl(props){
  //로그인 후
  if(props.isLogin === true){
    return (
      <>
      <Header/>
      <Body/>
      <Footer/>
      </>
    )
  //로그인 페이지
  } else if(props.isLogin === false){
    return (
      <>
      <MN100 />
      </>
    )
  }
  
}


export default App;
