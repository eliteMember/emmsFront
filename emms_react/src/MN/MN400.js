import './MN400.css'
import {React, useState, useEffect} from "react";
import axios from 'axios';

function MN400(){

    let [usr, setusr] = useState(null);
    const [update, setupdate] = useState({
        id: '',
        column: '',
        value: '',
        defaultValue:''
    });
    
    
    

    useEffect(() => {
        console.log("useEffect 실행됨");
        axios.get(process.env.REACT_APP_HOST+'/MN400/api/getList')
        .then((rs) =>{
            setusr(rs.data.USR);
            console.log(rs.data.USR);
        }).catch(() => {
            alert("사용자 불러오기 실패");
        })
    },[])

    const onChange = (e=>{
        if(e.key === 'Enter'){
            setupdate({
            id : e.target.id,
            column : e.target.name,
            value : e.target.value,
            defaultValue : e.target.defaultValue
            })
            callAxios();
        }
        })
    
    const callAxios = (()=>{
        if(update.value !== update.defaultValue){
            axios.post(process.env.REACT_APP_HOST+'/MN400/api/updateMember',update)
            .then((rs) =>{
                setusr(rs.data.USR);
                console.log(rs.data.USR);
            }).catch(() => {
                alert("업데이트 실패");
            })
        }else if(update.value === update.defaultValue){
              alert("변경내용이 없습니다.");
            }
    })

    
    const tabCont = {display: 'block'};
    const table = {width:'1200px'};
    const col1 = {width:'40px'};
    const col2 = {width:'120px'};
    const col3 = {width:'100px'};
    const col4 = {width:'auto'};

    return(
        <>
        <div className='subWrap'>
            <div className='inner'>
                <div className="popCont">
                    <div className="inner oh">
                        <div className="tbTabWrap">
                            <div className="tabCont mt20" id="tab01" style={tabCont}>
                                <div className="gridUtil">
                                    <div className="fl">
                                        <h3 className="title">사용자관리</h3>
                                    </div>
                                </div> 
                                <div className="gridWrap">
                                    <div className="tb02">
                                        <table style={table}>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {usr && usr.map(
                                                    (usrList, i ) =>
                                                        usrList.loginId !== null
                                                        ?
                                                        <tr key={i}>
                                                            <td className="txtC">{i+1}</td>
                                                            <td className="txtC">{usrList.loginId}</td>
                                                            <td className="txtC">{usrList.usrName}</td>
                                                            <td className="txtC">{usrList.usrBirMd}</td>
                                                            <td className="txtC">{usrList.incCd}</td>
                                                            <td className="txtC">{usrList.apoCd}</td>
                                                            <td className="txtC">{usrList.usrEmail}</td>
                                                            <td className="txtC">{usrList.usrTelNum}</td>
                                                            <td className="txtC">{usrList.timNum}</td>
                                                            {
                                                            usrList.joinYn === 'Y'
                                                            ?<td>가입완료</td>
                                                            :<td>미가입</td>
                                                            }
                                                        </tr>
                                                        :  
                                                        <tr key={i}>
                                                            <td className="txtC">{i+1}</td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="loginId" defaultValue={usrList.loginId} onKeyPress={onChange}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="usrName" defaultValue={usrList.usrName} onKeyPress={onChange}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="usrBirMd" defaultValue={usrList.usrBirMd} onKeyPress={onChange}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="incCd" defaultValue={usrList.incCd} onKeyPress={onChange}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="apoCd" defaultValue={usrList.apoCd} onKeyPress={onChange}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="usrEmail"  defaultValue={usrList.usrEmail} onKeyPress={onChange}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="usrTelNum" defaultValue={usrList.usrTelNum} onKeyPress={onChange}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="timNum" defaultValue={usrList.timNum} onKeyPress={onChange}></input></td>
                                                            {
                                                            usrList.joinYn === 'Y'
                                                            ?<td>가입완료</td>
                                                            :<td>미가입</td>
                                                            }
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {
                                    usr > 5
                                    ?   <div className="gridUtilBottom">
                                            <div className="paging">
                                                <a href="#none" className="prev btn_paging_first">맨앞으로</a>
                                                <a href="#none" className="prev btn_paging_prev">이전</a>
                                                <a href="#none" className="num current">1</a>
                                                <a href="#none" className="num">2</a>
                                                <a href="#none" className="num">3</a>
                                                <a href="#none" className="num">4</a>
                                                <a href="#none" className="num">5</a>
                                                <a href="#none" className="num">6</a>
                                                <a href="#none" className="num">7</a>
                                                <a href="#none" className="num">8</a>
                                                <a href="#none" className="num">9</a>
                                                <a href="#none" className="num">10</a>
                                                <a href="#none" className="next btn_paging_next">다음</a>
                                                <a href="#none" className="next btn_paging_last">맨끝으로</a>
                                            </div>
                                            <div className="fr">
                                            </div>
                                        </div>
                                    : null
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </>
   );
}


export default MN400;