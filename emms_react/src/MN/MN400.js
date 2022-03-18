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
        axios.get('/api/MN400/getList')
        .then((rs) =>{
            setusr(rs.data.USR);
            console.log(rs.data.USR);
        }).catch(() => {
            alert("사용자 불러오기 실패");
        })
    },[])

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

    
    const tabCont = {display: 'block'};
    const table = {width:'1200px'};
    const col1 = {width:'40px'};
    const col2 = {width:'120px'};
    const col3 = {width:'100px'};
    const col4 = {width:'auto'};

    return(
        <div class="subWrap">
        <div class="inner mt10">

            <section>
                <div class="gridUtil">
                    <div class="fl">
                        <div class="tb01">
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
                                        <th scope="row"><span class="tit">성명</span></th>
                                        <td>
                                            <input type="text" value="" class="w130"/>
                                        </td>
                                        <th scope="row"><span class="tit ml30">등급</span></th>
                                        <td>
                                            <select class="w130  mr30">
                                                <option>전체</option>
                                                <option>특급</option>
                                                <option>고급</option>
                                                <option>중급</option>
                                                <option>초급</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="fr">
                        <button type="button" class="btn01"><i class="ic_search"></i><span>조회</span></button>
                    </div>
                </div>

                <div class="hr20"></div>

                <div class="gridUtil">
                    <div class="fl">
                        <p class="txtGuide">신규사용자를 등록하거나 비밀번호 초기화 및 사용자 상세정보를 수정할 수 있습니다. </p>
                    </div>
                </div>
                                <div className="gridWrap">
                                    <div className="tb02">
                                        <table style={table}>
                                            <caption>표</caption>
                                            <colgroup>
                                                <col style={col1}/>
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
                                                            <td className="txtC"><input id={usrList.usrNum} name="LOGIN_ID" defaultValue={usrList.loginId} onChange={onChange} onKeyPress={callAxios}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="USR_NAME" defaultValue={usrList.usrName} onChange={onChange} onKeyPress={callAxios}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="USR_BIR_MD" defaultValue={usrList.usrBirMd} onChange={onChange} onKeyPress={callAxios}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="INC_CD" defaultValue={usrList.incCd} onChange={onChange} onKeyPress={callAxios}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="APO_CD" defaultValue={usrList.apoCd} onChange={onChange} onKeyPress={callAxios}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="USR_EMAIL"  defaultValue={usrList.usrEmail} onChange={onChange} onKeyPress={callAxios}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="USR_TEL_NUM" defaultValue={usrList.usrTelNum} onChange={onChange} onKeyPress={callAxios}></input></td>
                                                            <td className="txtC"><input id={usrList.usrNum} name="TIM_NUM" defaultValue={usrList.timNum} onChange={onChange} onKeyPress={callAxios}></input></td>
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
                             </section>
                             <div class="gridUtilBottom">
                                <div class="fr">
                                    <button type="button" class="btn04"><span>신규등록</span></button>
                                    <button type="button" class="btn08"><span>수정</span></button>
                                    <button type="button" class="btn01"><span>저장</span></button>
                                    <button type="button" class="btn02"><span>취소</span></button>
                                    <button type="button" class="btn03"><span>삭제</span></button>
                                </div>
                            </div>
                    </div>
                    </div>
        
   );
}


export default MN400;