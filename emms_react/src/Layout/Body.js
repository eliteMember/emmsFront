import React from 'react';
import './Body.css';
import { Link, Route, Switch} from 'react-router-dom';

function Body(props){
    return (
      <Switch>
        {/* 메인 */}
        <Route path="/main">
          <div>메인</div>
        </Route>
        {/* 로그인 */}
        <Route path="/로그인">
          <div>로그인</div>
        </Route>
        {/* 팀관리 */}
        <Route path="/팀관리">
          <div>팀관리</div>
        </Route>
        {/* 프로젝트제안 */}
        <Route path="/프로젝트기본정보">
          <div>프로젝트기본정보</div>
        </Route>
        <Route path="/제안공수산정">
          <div>제안공수산정</div>
        </Route>
        <Route path="/프로젝트견적">
          <div>프로젝트견적</div>
        </Route>
        <Route path="/투입공수산정">
          <div>투입공수산정</div>
        </Route>
        <Route path="/사전원가산정">
          <div>사전원가산정</div>
        </Route>
        <Route path="/사전비용계산">
          <div>사전비용계산</div>
        </Route>
        {/* 프로젝트관리 */}
        <Route path="/실투입공수관리">
          <div>실투입공수관리</div>
        </Route>
        <Route path="/비용처리">
         <div>비용처리</div>
        </Route>
        {/* 인력관리 */}
        <Route path="/인력관리">
          <div>인력관리</div>
        </Route>
        {/* 문서관리 */}
        <Route path="/문서관리">
          <div>문서관리</div>
        </Route>
        <Route path="/:id">
          <div>error</div>
        </Route>
      </Switch>
    )
}
      
export default Body;