import { React, useState, useEffect } from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import './PO100.css';



function PO100(props){
  
  const history = useHistory();

  const [fields, setFields] = useState({prjNm:''});
  const [errors, setErrors] = useState({prjNm:''});

  const handleChange = event => {
    const { name, value } = event.target;
    let v_fields = {...fields};
    v_fields[name] = value;
    setFields(v_fields);
  }

  //submit 처리
  const submituserRegistrationForm = (e) => {
    e.preventDefault();
      if (validateForm()) {
          alert("Form submitted");
      }
  }


  //유효성 검사
  const validateForm = () => {

    let v_fields = fields;
    let errors = {};
    let formIsValid = true;

    if (!v_fields["prjNm"]) {
      formIsValid = false;
      errors["prjNm"] = "*Please enter your 프로젝트명.";
    }

    setErrors(errors);
    return formIsValid;
  }

  //프로젝트 초기화, 신규 프로젝트 입력
  const resetPrj = () =>{
     let v_fields = {...fields};
     var keys = Object.keys(v_fields); //키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
     for (var i=0; i<keys.length; i++) {
    	var key = keys[i];
    	console.log("key : " + key + ", value : " + v_fields[key]);
      v_fields[key] = '';
    }
    setFields(v_fields);
  }


  // const handleSubmit = () => {
  //   e.preventDefault()

  // }

  // // 이름
  // const onChangePrjNm = ((e) => {
  //   setPrjNm(e.target.value)
  //   if( e.target.value.length == 0 ){
  //     setPrjNmMessage('프로젝트명을 입력해주세요.')
  //     setIsPrjNm(false)
  //   }else{
  //     setPrjNmMessage('')
  //     setIsPrjNm(true)
  //   }
    
  // }, [])
  
  return (
        <div className='PO100_DIV' onSubmit= {submituserRegistrationForm}>
          <h1>프로젝트 기본정보</h1>
          <form id="loginFrm" name="loginFrm">
            
            <div>
              <label className='PO100_label'>프로젝트명</label>
              <span className='PO100_span_1'>
                <input
                  type="text" 
                  id="prjNm"
                  name="prjNm"
                  value={fields.prjNm}
                  onChange={handleChange}
                />
              </span>
              {errors && <p className="valid">{errors?.prjNm}</p>}

              <span>
                <button type='button' onClick={resetPrj}>신규</button>
                <button type='button'>조회</button>
              </span>
            </div>

            <div>
              <label className='PO100_label'>프로젝트팀</label>
              <span className='PO100_span_1'>
              <input
                type="text" 
                id="timNm"
                name="timNm"
              />
              <input
                type="text"
                id="timNum"
                name="timNum"
              />
            </span>
            <span className='PO100_span_2'>
              <button type='button'>우리팀 진행</button>
              <button type='button'>프로젝트 이관</button>
            </span>
            </div>

            <div>
              <label className='PO100_label'>프로젝트구분</label>
              <select id="prjDivCd" name="prjDivCd">

              </select>
              <label className='PO100_label'>프로젝트상태</label>
              <select id="prjStsCd" name="prjStsCd">

              </select>
            </div>

            <div>
              <label className='PO100_label'>프로젝트기간</label>
              <input type="text" id="" name="" /> ~ <input type="text" id="" name="" />
              <input type="text" id="prjNom" name="prjNom" /> 개월
            </div>

            <div>
              <label className='PO100_label'>프로젝트장소</label>
              <input type="text" id="prjPlcNm" name="prjPlcNm" />
            </div>

            <div>
            <label className='PO100_label'>고객사</label>
              <input type="text" id="copNm1" name="copNm1" />
              <input type="text" id="copMgrName1" name="copMgrName1" />
              <input type="text" id="copMgrCtt1" name="copMgrCtt1" />
            </div>

            <div>
            <label className='PO100_label'>수행사</label>
              <input type="text" id="copNm2" name="copNm2" />
              <input type="text" id="copMgrName2" name="copMgrName2" />
              <input type="text" id="copMgrCtt2" name="copMgrCtt2" />
            </div>

            <div>
            <label className='PO100_label'>협력사</label>
              <input type="text" id="copNm3" name="copNm3" />
              <input type="text" id="copMgrName" name="copMgrName3" />
              <input type="text" id="copMgrCtt3" name="copMgrCtt3" />
            </div>

            <button type="submit">저장</button>
          </form>
        </div>
    )
}


export default PO100;