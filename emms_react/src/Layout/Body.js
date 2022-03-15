import { React, useEffect } from 'react';
import './Body.css';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PO100 from '../PO/PO100';
import MN500 from '../MN/MN500';
import ME101 from '../ME/ME101';
import { useDispatch } from 'react-redux';
import { ACT_CMMN_CODE_GETLIST } from '../reducers/cmmnCode'

function Body(props) {

  //redux dispatch 사용준비
  const dispatch = useDispatch();
  //reducer store에 접근하여 userInfo state를 가져옴
  const setCode = (cmmnCode) =>{
    // store에 있는 state 바꾸는 함수 실행
    dispatch(ACT_CMMN_CODE_GETLIST({cmmnCode:cmmnCode}));
  };
  useEffect(() => {
    axios.get('/api/code/getCode')
      .then((rs) => {
        setCode(rs.data);
      }).catch(() => {
        alert("코드 호출 에러");
      })
  }, [])

  return (
    <>
    <Switch>
      {/* 메인 */}
      <Route path="/MAIN"><MN500 /></Route>
      {/* 팀관리 */}
      <Route path="/TIMMNG">{/* TODO */}<div>팀관리</div></Route>
      {/* 프로젝트제안 */}
      <Route path="/PRJINFO"><PO100 /></Route>
      {/* 제안공수산정 */}
      <Route path="/PRJMHR">{/* TODO */}<div>제안공수산정</div></Route>
      {/* 프로젝트견적 */}
      <Route path="/PRJOFR">{/* TODO */}<div>프로젝트견적</div></Route>
      {/* 투입공수산정 */}
      <Route path="/DEPMHR">{/* TODO */}<div>투입공수산정</div></Route>
      {/* 사전원가산정 */}
      <Route path="/BFRFCST">{/* TODO */}<div>사전원가산정</div></Route>
      {/* 사전비용계산 */}
      <Route path="/BFRCST">{/* TODO */}<div>사전비용계산</div></Route>
      {/* 프로젝트관리 */}
      <Route path="/RDEPMHR">{/* TODO */}<div>실투입공수관리</div></Route>
      {/* 비용처리 */}
      <Route path="/CSTTRT">{/* TODO */}<div>비용처리</div></Route>
      {/* 인력관리 */}
      <Route path="/MEMMNG"><ME101 /></Route>
      {/* 문서관리 */}
      <Route path="/DOCMNG">{/* TODO */}<div>문서관리</div></Route>
      {/* 예외상황 */}
      <Route path="/:id">{/* TODO */}<div>error</div></Route>
    </Switch>
    </>
  )
}

export default Body;