import React from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './PO100.css';



function PO100(props){
  
  const history = useHistory();
  
  const { register, watch, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axios.post('/api/po100', data)
    .then(function(res){
      console.log(res);
      alert('앙?');
    })
    .catch(function(res){
      console.log('오류');
      alert('오류');
    })

  }

  const onError = (error) => {
    console.log(error);
  }


  console.log(watch());

  return (
        <div className='PO100_DIV' onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>프로젝트 기본정보</h1>
          <form id="loginFrm" name="loginFrm">
            <div>
              <label className='PO100_label'>프로젝트명</label>
              <ProjectNmSetChangeTAG />
              <span className='PO100_span_2'>
                <button type='button'>신규</button>
              </span>
            </div>
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