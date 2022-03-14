import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';

//임승재
import { Route, Switch } from 'react-router-dom';
import MN100_1 from './MN/MN100_1.js';

let Header = lazy(() => { return import('./Layout/Header.js') });
let Body = lazy(() => { return import('./Layout/Body.js') });
let Footer = lazy(() => { return import('./Layout/Footer.js') });
let MN100 = lazy(() => { return import('./MN/MN100.js') });

function App() {

  const [isLogin, isLoginChange] = useState(false);

  useEffect(() => {
    axios.get('/api/cmmn/getSession')
      .then(res => {
        if (res.data.login === true) {
          isLoginChange(true);
        } else {
          isLoginChange(false);
        }
      }).catch(() => {
        console.log('세션정보 불러오기 에러');
      })
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/MN100_1" >
          <MN100_1/>
        </Route>
        <Route path="/">
          <LoginOrMainControl isLogin={isLogin} isLoginChange={isLoginChange} />
        </Route>
      </Switch>
    </div>
  );
}

function LoginOrMainControl(props) {
  //로그인 후
  if (props.isLogin === true) {
    return (
      <>
        <Suspense fallback={<div>로딩중</div>}>
          <Header isLogin={props.isLogin} isLoginChange={props.isLoginChange} />
          <Body />
          <Footer />
        </Suspense>
      </>
    )
    //로그인 페이지
  } else if (props.isLogin === false) {
    return (
      <>
        <Suspense fallback={<div>로딩중</div>}>
          <MN100 isLoginChange={props.isLoginChange} />
        </Suspense>
      </>
    )
  }

}


export default App;
