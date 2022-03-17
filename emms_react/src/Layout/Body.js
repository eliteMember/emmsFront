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
    axios.get(process.env.REACT_APP_HOST + '/api/code/getCode')
      .then((rs) => {
        setCode(rs.data);
      }).catch(() => {
        alert("코드 호출 에러");
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    {/* 메인 일 경우에만 mainFrame 
        그 외 페이지의 경우 subFrame 안에 컴포넌트페이지 작성
        TODO : 처리방법을 고안하지 못해 subFrame 하드코딩. 유기적으로 처리되도록 수정 필요*/}
    <Switch>
      {/* 메인 */}
      <Route path="/MAIN"><div className='mainFrame'><MN500 /></div></Route>      
      {/* 팀관리 */}
      <Route path="/TIMMNG">{/* TODO */}<div className='subFrame'>팀관리</div></Route>
      {/* 프로젝트제안 */}
      <Route path="/PRJINFO"><div className='subFrame'><PO100 /></div></Route>
      {/* 제안공수산정 */}
      <Route path="/PRJMHR">{/* TODO */}<div className='subFrame'>제안공수산정</div></Route>
      {/* 프로젝트견적 */}
      <Route path="/PRJOFR">{/* TODO */}<div className='subFrame'>프로젝트견적</div></Route>
      {/* 투입공수산정 */}
      <Route path="/DEPMHR">{/* TODO */}<div className='subFrame'>투입공수산정</div></Route>
      {/* 사전원가산정 */}
      <Route path="/BFRFCST">{/* TODO */}<div className='subFrame'>사전원가산정</div></Route>
      {/* 사전비용계산 */}
      <Route path="/BFRCST">{/* TODO */}<div className='subFrame'>사전비용계산</div></Route>
      {/* 프로젝트관리 */}
      <Route path="/RDEPMHR">{/* TODO */}<div className='subFrame'>실투입공수관리</div></Route>
      {/* 비용처리 */}
      <Route path="/CSTTRT">{/* TODO */}<div className='subFrame'>비용처리</div></Route>
      {/* 인력관리 */}
      <Route path="/MEMMNG"><div className='subFrame'><ME101 /></div></Route>
      {/* 문서관리 */}
      <Route path="/DOCMNG">{/* TODO */}<div className='subFrame'>문서관리</div></Route>
      {/* 예외상황 */}
      <Route path="/:id">{/* TODO */}<div className='subFrame'>error</div></Route>
    </Switch>
    </>
  )
}

export default Body;