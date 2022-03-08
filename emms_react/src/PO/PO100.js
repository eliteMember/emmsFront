import { React, useState, useEffect } from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import './PO100.css';



function PO100(props){
  
  const history = useHistory();

  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [prjNm, setPrjNm] = useState('')

  //오류메시지 상태저장
  const [prjNmMessage, setPrjNmMessage] = useState('')

  // 유효성 검사
  const [isPrjNm, setIsPrjNm] = useState(false);
  
  const handleSubmit = () => {
    return false;
  }

  // 이름
  const onChangePrjNm = ((e) => {
    setPrjNm(e.target.value)
    if( e.target.value.length == 0 ){
      setPrjNmMessage('프로젝트명을 입력해주세요.')
      setIsPrjNm(false)
    }else{
      setPrjNmMessage('')
      setIsPrjNm(true)
    }
    
  }, [])
  
  return (
        <div className='PO100_DIV' onSubmit={handleSubmit}>
          <h1>프로젝트 기본정보</h1>
          <form id="loginFrm" name="loginFrm">
            <div>
              <label className='PO100_label'>프로젝트명</label>
              <ProjectNmSetChangeTAG />
              <span className='PO100_span_2'>
                <button type='button'>신규</button>
              </span>
            </div>
            <button type="submit">로그인</button>
          </form>
        </div>
    )
}

function ProjectNmSetChangeTAG(props){
    
  return (

      <span className='PO100_span_1'>
        <input
          type="text" 
          id="prjNm"
          name="prjNm"
        />
      </span>
  
  )

}

export default PO100;