import {React , useEffect, useState} from 'react';
import './Body.css';
import { Route, Switch} from 'react-router-dom';
import axios from 'axios';
import PO100 from '../PO/PO100';

function Body(props){

  let [code, setCode] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/code/getCode')
      .then((rs) => {
        setCode(rs.data);
      }).catch(() => {
        alert("코드 호출 에러");
      })
  }, [])

    return (
      <Switch>
        {/* 메인 */}
        <Route path="/MAIN">
          <div className="main">메인</div>
        </Route>
        {/* 로그인 */}
        <Route path="/LOGIN">
          <div>로그인</div>
        </Route>
        {/* 팀관리 */}
        <Route path="/TIMMNG">
          <div>팀관리</div>
        </Route>
        {/* 프로젝트제안 */}
        <Route path="/PRJINFO">
          <PO100 />
        </Route>
        <Route path="/PRJMHR">
          <div>제안공수산정</div>
        </Route>
        <Route path="/PRJOFR">
          <div>프로젝트견적</div>
        </Route>
        <Route path="/DEPMHR">
          <div>투입공수산정</div>
        </Route>
        <Route path="/BFRFCST">
          <div>사전원가산정</div>
        </Route>
        <Route path="/BFRCST">
          <div>사전비용계산</div>
        </Route>
        {/* 프로젝트관리 */}
        <Route path="/RDEPMHR">
          <div>실투입공수관리</div>
        </Route>
        <Route path="/CSTTRT">
         <div>비용처리</div>
        </Route>
        {/* 인력관리 */}
        <Route path="/MEMMNG">
          <div>인력관리</div>
        </Route>
        {/* 문서관리 */}
        <Route path="/DOCMNG">
          <div>문서관리</div>
        </Route>
        <Route path="/:id">
          <div>error</div>
        </Route>
      </Switch>
    )
}
      
export default Body;