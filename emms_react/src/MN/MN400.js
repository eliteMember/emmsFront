import './MN400.css'
import {React, useState, useEffect} from "react";
import axios from 'axios';
import Pagination from '../Component/pagination';

function MN400(){

    let [usr, setusr] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    console.log(currentPage);
    const [showList, setShowList] = useState();

    const [reset, setReset] = useState({
        id: '',
        bir: ''
    });
    const [update, setupdate] = useState({
        id: '',
        column: '',
        value: '',
        defaultValue:''
    });
    
    
    

    useEffect(() => {
        console.log("useEffect 실행됨");
        axios.get('/api/MN400/getList')
        .then((rs) =>{
            setusr(rs.data.USR);
            console.log(rs.data.USR);
        }).catch(() => {
            alert("사용자 불러오기 실패");
        })
    },[])
    console.log(showList);
    function resetPW(usrNum,usrBirMd){
        axios.post('/api/MN400/resetPW',{usrNum : usrNum, usrBirMd: usrBirMd})
        .then(() =>{
            alert('초기화 성공');
        }).catch(()=>{
            alert('초기화 실패');
        })
    };

    const onChange = ((e)=>{
        if(e.key === 'Enter'){
            setupdate({
            id : e.target.id,
            column : e.target.name,
            value : e.target.value,
            defaultValue : e.target.defaultValue
            })
            return setupdate();
        }
    })
    const callAxios = (()=>{
        if(update.value !== update.defaultValue){
            axios.post('/api/MN400/updateMember',update)
            .then((rs) =>{
                setusr(rs.data.USR);
                console.log(rs.data.USR);
                alert('변경 성공');
            }).catch(() => {
                alert("업데이트 실패");
            })
        }else if(update.value === update.defaultValue){
              alert("변경내용이 없습니다.");
            }
    })

    
    const col1 = {width:'40px'};
    const col2 = {width:'120px'};
    const col3 = {width:'100px'};
    const col4 = {width:'auto'};

    return(
        <div className="subWrap">
        <div className="inner mt10">

            <section>
                <div className="gridUtil">
                    <div className="fl">
                        <div className="tb01">
                            <table>
                                <colgroup>
                                    <col style={col4}/>
                                    <col style={col4}/>
                                    <col style={col4}/>
                                    <col style={col4}/>
                                    <col style={col4}/>
                                    <col style={col4}/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row"><span className="tit">성명</span></th>
                                        <td>
                                            <input type="text" className="w130"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="fr">
                        <button type="button" className="btn01"><i className="ic_search"></i><span>조회</span></button>
                    </div>
                </div>

                <div className="hr20"></div>

                <div className="gridUtil">
                    <div className="fl">
                        <p className="txtGuide">신규사용자를 등록하거나 비밀번호 초기화 및 사용자 상세정보를 수정할 수 있습니다. </p>
                    </div>
                </div>
                                <div className="gridWrap">
                                    <div className="tb02">
                                        <table>
                                            <caption>표</caption>
                                            <colgroup>
                                                <col style={col1}/>
                                                <col style={col2}/>
                                                <col style={col3}/>
                                                <col style={col3}/>
                                                <col style={col3}/>
                                                <col style={col3}/>
                                                <col style={col4}/>
                                                <col style={col4}/>
                                                <col style={col4}/>
                                                <col style={col4}/>
                                                <col style={col3}/>
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th scope="col">번호</th>
                                                    <th scope="col">아이디</th>
                                                    <th scope="col">이름</th>
                                                    <th scope="col">생년월일</th>
                                                    <th scope="col">직위</th>
                                                    <th scope="col">직책</th>
                                                    <th scope="col">이메일</th>
                                                    <th scope="col">전화번호</th>
                                                    <th scope="col">소속팀</th>
                                                    <th scope="col">가입여부</th>
                                                    <th scope="col">비밀번호</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {showList && showList.map(
                                                    (usrList, i ) =>
                                                        <tr key={i}>
                                                            <td className="txtC">{i+1}</td>
                                                            <td className="txtC">{usrList.loginId}</td>
                                                            <td className="txtC">{usrList.usrName}</td>
                                                            {
                                                                usrList.usrBirMd !== null
                                                                ? <td className="txtC">{usrList.usrBirMd.substring(0,4)}.{usrList.usrBirMd.substring(4,6)}.{usrList.usrBirMd.substring(6,8)}</td>
                                                                : <td className="txtC">{usrList.usrBirMd}</td>
                                                            }
                                                            <td className="txtC">{usrList.incCd}</td>
                                                            <td className="txtC">{usrList.apoCd}</td>
                                                            <td className="txtC">{usrList.usrEmail}</td>
                                                            {
                                                                usrList.usrBirMd !== null
                                                                ? <td className="txtC">{usrList.usrTelNum.substring(0,3)}-{usrList.usrTelNum.substring(3,7)}-{usrList.usrTelNum.substring(7,11)}</td>
                                                                : <td className="txtC">{usrList.usrTelNum}</td>
                                                            }
                                                            <td className="txtC">{usrList.timNum}</td>
                                                            {
                                                            usrList.joinYn === 'Y'
                                                            ?<td>가입완료</td>
                                                            :<td>미가입</td>
                                                            }
                                                            {
                                                                usrList.loginId !== null
                                                                ? <td><button type="button" className="btn05 borderC2" onClick={() =>{resetPW(usrList.usrNum,usrList.usrBirMd)}}>초기화</button></td>
                                                                : <td><button type="button" className="btn05 borderC2" onClick={()=>{alert('비밀번호가 없는 사용자입니다.')}}>초기화</button></td>
                                                            }
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                  <Pagination list={usr} ShowList={fnSetShowList} currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={usr.length} paginate={setCurrentPage}>

                                  </Pagination>
                             </section>
                             <div className="gridUtilBottom">
                                <div className="fr">
                                    <button type="button" className="btn04"><span>신규등록</span></button>
                                    <button type="button" className="btn08"><span>수정</span></button>
                                    <button type="button" className="btn01"><span>저장</span></button>
                                    <button type="button" className="btn02"><span>취소</span></button>
                                    <button type="button" className="btn03"><span>삭제</span></button>
                                </div>
                            </div>
                    </div>
                    </div>
        
   );

   function fnSetShowList(list){
    setShowList(list);

   }
}


export default MN400;