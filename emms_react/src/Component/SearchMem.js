import React, { useEffect, lazy, useState } from "react";
import axios from 'axios';
import '../ME/ME101.css';
import './SearchMem.css';


let CodeSelectOption = lazy( ()=> import('../Component/CodeSelectOption.js') );

function SearchMem(props) {
  let [listData, listDataModify] = useState([]);              // 목록
  let [searchName, searchNameModify] = useState('');          // 이름 검색
  let [searchRnkCd, searchRnkCdModify] = useState('all');     // 등급 검색
  
  // INIT
  useEffect(() => {
    axios.post('/api/memList', {
      memRnkCd: 'all'
    }).then(function (res) {
      listDataModify(res.data.list);
    })
  }, []);

  // 조회
  function fn_search(){
    axios.post('/api/memList', {
      memName : searchName,
      memRnkCd: searchRnkCd
    }).then(function (res) {
      listDataModify(res.data.list);
    });
  }

  // Enter Key Event
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      fn_search();
    }
  }

  // ========[Component]======== 목록
  function List() {
    if  ( listData.length === 0 )  {
      return (
        <tr><td colSpan={11}>데이터가 없습니다.</td></tr>
      )
    }  else  {
      return (
        listData.map((data, i)=>{ 
          return (
            <tr key={i} id={data.memNum} onClick={()=> {props.modifyMemName(data)}} className="trSt" >
              <td>{i+1}</td>
              <td>{data.memName}</td>
              <td>{data.memBirMd.substring(0,4)}.{data.memBirMd.substring(4,6)}.{data.memBirMd.substring(6,8)}</td>
              <td>{data.incNm}</td>
              <td>{data.memRnkNm}</td>
              <td>{data.eduNm}</td>
              <td>{data.ctfNm}</td>
              <td>{data.memUnp.toLocaleString()}</td>
              <td>{data.memFcst.toLocaleString()}</td>
              <td>{data.memCtt}</td>
              <td>{data.memAdr}</td>
            </tr>
          )
        })
      )
    }
  }

  return(
    <>
            <div className="gridUtil">
              <div className="fl">
                <div className="tb01">
                  <table>
                    <tbody>
                      <tr>
                        <th scope="row"><span className="tit">성명</span></th>
                        <td>
                            <input type="text" className="w130" onChange={(e)=>{ searchNameModify(e.target.value); }} onKeyPress={onKeyPress} />
                        </td>
                        <th scope="row"><span className="tit ml30">등급</span></th>
                        <td>
                            <select className="w130  mr30" onChange={(e)=>{ searchRnkCdModify(e.target.value); }} >
                              <option value={'all'} >전체</option>
                              <CodeSelectOption codeGroup={'RNK_CD'} />
                            </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="fr">
                  <button type="button" className="btn01" onClick={()=>{fn_search()}} ><i className="ic_search"></i><span>조회</span></button>
              </div>
            </div>
            
            <div className="gridWrap">
              <div className="tb02 searchMem">
                <table className="searchMem">
                    <caption>표</caption>
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">성명</th>
                            <th scope="col">생년월일</th>
                            <th scope="col">직위</th>
                            <th scope="col">등급</th>
                            <th scope="col">학력</th>
                            <th scope="col">자격증</th>
                            <th scope="col">단가</th>
                            <th scope="col">원가</th>
                            <th scope="col">연락처</th>
                            <th scope="col">주소</th>
                        </tr>
                    </thead>
                    <tbody>
                      <List />
                    </tbody>
                </table>
              </div>
            </div>
    </>
  )
}


export default SearchMem;