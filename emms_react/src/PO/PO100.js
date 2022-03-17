import { React, useState, useEffect } from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import './PO100.css';

import './POP_PO200';
import POP_PO200 from './POP_PO200';

function PO100(props){
  
  const history = useHistory();

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log('모달 열기');
    setModalOpen(true);
  };
  const closeModal = () => {
    console.log('모달 닫기');
    setModalOpen(false);
  };

  //필드값
  const [fields, setFields] = useState({prjNm:''});
  const [errors, setErrors] = useState({prjNm:''});

  const handleChange = event => {
    const { name, value } = event.target;
    let v_fields = {...fields};
    v_fields[name] = value;
    setFields(v_fields);
  }

  //submit 처리
  const onSubmitHandle = (e) => {
    e.preventDefault();
      if (validatehtmlForm()) {
          alert("htmlForm submitted");
      }
  }


  //유효성 검사
  const validatehtmlForm = () => {

    let v_fields = fields;
    let errors = {};
    let htmlFormIsValid = true;

    if (!v_fields["prjNm"]) {
      htmlFormIsValid = false;
      errors["prjNm"] = "*프로젝트명을 입력하세요.";
    }

    setErrors(errors);
    return htmlFormIsValid;
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

  //팀명 조회
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    
    //프로젝트 팀 조회 ( DB )
    axios.get('/api/cmmn/listTeam', {})
        .then(function (res) {
            console.log(res);
            console.log(res.data);
            setTeamList(res.data.list)
        })
        .catch(function (res) {
          console.log('팀조회 실패');
        })
  
  }, []);
  

  return (

    <div className="subWrap">
        <div className="inner">

            <div className="dTable mt10">
               
                {/* <div className="colR" style="width:1000px"> */}
                <div className="colR">
                    <div className="ml10">

                        <div className="tbTabWrap mt10">

                            <ul className="tbTab01">
                                <li className="current"><a href="#tab01">기본정보</a></li>
                            </ul>

                            {/* <div className="tabCont mt20" id="tab01" style="display: block;"> */}
                            <div className="tabCont mt20" id="tab01">

                              <form id="prjInfoForm" name="prjInfoForm" onSubmit={onSubmitHandle}>

                                <div className="abTR">
                                    <button type="button" className="btn05 borderC2"><i className="ic_reset"></i><span>초기화</span></button>
                                </div>
                                <div className="tb03">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트명</span></th>
                                                <td className="txtL">
                                                    <input
                                                      type="text" 
                                                      className="w250"
                                                      id="prjNm"
                                                      name="prjNm"
                                                      value={fields.prjNm}
                                                      onChange={handleChange}
                                                    />
                                                    <button type="button" className="btn01" onClick={openModal}><span>프로젝트 조회</span></button>
                                                    <POP_PO200 open={ modalOpen } close={ closeModal } header="팀 조회"></POP_PO200>
                                                    {errors && <p className="valid">{errors?.prjNm}</p>}
                                                </td>
                                                <th scope="row"><span className="tit">프로젝트팀</span></th>
                                                <td className="txtL">
                                                    <select className="w250">
                                                    {
                                                        teamList.map((data, i)=>{
                                                            return <option key={i} value={data.timNum} >{data.timNm}</option>
                                                        })
                                                    }
                                                    </select>
                                                    <button type="button" className="btn01"><span>우리팀진행</span></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tb03 mt5 lineTopGray">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트 구분</span></th>
                                                <td className="txtL">
                                                    <select className="w110">
                                                        <option>하도급</option>
                                                        <option>내부프로젝트</option>
                                                        <option>수의계약</option>
                                                        <option>용역계약</option>
                                                    </select>
                                                </td>
                                                <th scope="row"><span className="tit">프로젝트 상태</span></th>
                                                <td className="txtL" colSpan="">
                                                    <select className="w110">
                                                        <option>예정</option>
                                                        <option>제안</option>
                                                        <option>분석</option>
                                                        <option>설계</option>
                                                        <option>개발</option>
                                                        <option>테스트</option>
                                                        <option>유지보수</option>
                                                        <option>종료</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트 기간</span></th>
                                                <td className="txtL" colSpan="3">
                                                    <span className="datepickerBox"><input type="text" placeholder="2022-03-20"/></span>
                                                    ~
                                                    <span className="datepickerBox"><input type="text" placeholder="2022-10-31"/></span>
                                                    <input type="text" className="w50 ml30 mr5"/>년
                                                    <input type="text" className="w50 ml10 mr5"/>개월
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><span className="tit">프로젝트 장소</span></th>
                                                <td className="txtL" colSpan="3">
                                                    <input type="text" />
                                                    <button type="button" className="btn02s"><i className="ic_search_blue"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tb03 mt10 lineTopGray">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th scope="row">고객사</th>
                                                <td>
                                                    <input type="text" className="w250"/>
                                                </td>
                                                <th scope="row">담당자</th>
                                                <td>
                                                    <input type="text" className="w100" placeholder="홍길동 부장"/>
                                                </td>
                                                <th scope="row">연락처</th>
                                                <td>
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">수행사</th>
                                                <td>
                                                    <input type="text" className="w250"/>
                                                </td>
                                                <th scope="row">담당자</th>
                                                <td>
                                                    <input type="text" className="w100" placeholder="박민영 차장"/>
                                                </td>
                                                <th scope="row">연락처</th>
                                                <td>
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">협력사</th>
                                                <td>
                                                    <input type="text" className="w250"/>
                                                </td>
                                                <th scope="row">담당자</th>
                                                <td>
                                                    <input type="text" className="w100" placeholder="김우빈 부장"/>
                                                </td>
                                                <th scope="row">연락처</th>
                                                <td>
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                    -
                                                    <input type="text" className="w60"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">참조사항</th>
                                                <td colSpan="6">
                                                    <textarea className="h150">
                                                    </textarea>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="tb03 mt5 lineTopGray">
                                    <table>
                                        <tbody>

                                            <tr>
                                                <th className="txtC">첨부파일</th>
                                                <td className="txtL">
                                                    <div className="mt10 mb10">
                                                    
                                                        <div className="dFlex">

                                                            <div className="tb04 mr20">                            

                                                                    <div className="txtL mb10">
                                                                        <select className="w110">
                                                                            <option>제안요청서</option>
                                                                            <option>제안서</option>
                                                                            <option>견적서</option>
                                                                            <option>공수표</option>
                                                                            <option>원가표</option>
                                                                            <option>산출물</option>
                                                                            <option>기타첨부</option>
                                                                        </select>
                                                                        <span className="filebox ml5"> 
                                                                            <input type="file" id="file"/> 
                                                                            <input className="uploadName"/>
                                                                                <button type="button" className="btn01s"><span>파일찾기</span></button>
                                                                                <button type="button" className="btn02s"><span>삭제</span></button>
                                                                        </span>
                                                                    </div>

                                                                <table>
                                                                    <caption>테이블</caption>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">선택</th>
                                                                            <th scope="col">번호</th>
                                                                            <th scope="col">파일명</th>
                                                                            <th scope="col">크기</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        
                                                                        <tr>
                                                                            <td className="txtC"><span className="customhtmlForm"><input type="checkbox" name="check1" id="check11"/><label htmlFor="check11"><span></span></label></span></td>
                                                                            <td className="txtC">1</td>
                                                                            <td className="txtL">
                                                                                <button type="button" className="attachedFile"><i className="ic_file"></i><span className="">정예맴버프로젝트관리시스템 사용자 매뉴얼_v1.0.pdf</span></button>
                                                                            </td>
                                                                            <td className="txtC">3Mb</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="txtC"><span className="customhtmlForm"><input type="checkbox" name="check1" id="check12"/><label htmlFor="check12"><span></span></label></span></td>
                                                                            <td className="txtC">2</td>
                                                                            <td className="txtL">
                                                                                <button type="button" className="attachedFile"><i className="ic_file"></i><span className="">KB 푸르덴셜 비대면 구축 RFP_v2.0KB 푸르덴셜 비대면 구축 RFP_v2.0..pdf</span></button>
                                                                            </td>
                                                                            <td className="txtC">3Mb</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="txtC"><span className="customhtmlForm"><input type="checkbox" name="check1" id="check13"/><label htmlFor="check13"><span></span></label></span></td>
                                                                            <td className="txtC">3</td>
                                                                            <td className="txtL">
                                                                                <button type="button" className="attachedFile"><i className="ic_file"></i><span className="">KB 푸르덴셜 비대면 구축 공수산정_v1.0.pdf</span></button>
                                                                            </td>
                                                                            <td className="txtC">3Mb</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>



                                                        </div>

                                                    </div>
                                                </td>
                                            </tr> 
                                        </tbody>
                                    </table>
                                </div>

                                <div className="gridUtilBottom">
                                    <div className="fr">
                                        <button type="submit" className="btn01"><span>저장</span></button>
                                        <button type="button" className="btn03"><span>취소</span></button>
                                    </div>
                                </div> 

                              </form>

                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>

          </div>

        </div>
    )
}




export default PO100;