import './MN400.css'
import {React, useState, useEffect } from "react";
import axios from 'axios';

function MN400(){

    const [showList, setShowList] = useState();
    const [nextList, setNextList] = useState();
    const [nextYN, setNextYN] = useState();
    //페이지번호
    const [PNo, setPNo] = useState(1);
    //불러오고싶은 데이터 갯수
    const [getCnt, setCnt] = useState(10);
    //데이터 시작번호 
    const [startNo, setstartNo] = useState();
    //데이터 종료번호 
    const [endNo, setendNo] = useState();
    const [test, settest] = useState(0);
    const [scrollY, setscrollY] = useState(0);
    const handleFollow = (e) =>{
        setscrollY(e.target.scrollTop);
        settest(e.target.scrollHeight);
    }
    useEffect( ()=>{
        Paging();   
    },[scrollY])

    function Paging(){
        if((test - scrollY) === scrollSize){
            if(nextYN === 'Y'){
                setShowList([...showList, ...nextList])
                setNextList(null);
                axios.post('/api/pagination/MN400/nextPage',{getCnt : getCnt, nextYN : nextYN, startNo : startNo, endNo : endNo})
                .then((rs) =>{
                    setNextYN(rs.data.nextYn);
                    console.log(rs.data.nextYn);
                    setNextList(rs.data.nextUSR);
                    setstartNo(rs.data.startNo);
                    setendNo(rs.data.endNo);
                }).catch(() => {
                    alert("사용자 불러오기 실패");
                })
            }else{
                return
            }
        }
    }
    

    useEffect(() =>{
        const watch = () =>{
            window.addEventListener('scroll',handleFollow);
        }
        watch();
        return () =>{
            window.removeEventListener('scroll',handleFollow);
        }
    })

    //처음 데이터 불러오기
    useEffect(() => {
        axios.post('/api/pagination/MN400', {PNo : PNo, getCnt : getCnt})
        .then((rs) =>{
            //처음 보여줄데이터
            setShowList(rs.data.USR);
            setNextYN(rs.data.nextYn);
            setNextList(rs.data.nextUSR);
            setstartNo(rs.data.startNo);
            setendNo(rs.data.endNo);
        }).catch(() => {
            alert("사용자 불러오기 실패");
        })
    },[])

    function resetPW(usrNum,usrBirMd){
        axios.post('/api/MN400/resetPW',{usrNum : usrNum, usrBirMd: usrBirMd})
        .then(() =>{
            alert('초기화 성공');
        }).catch(()=>{
            alert('초기화 실패');
        })
    };
    
    const col1 = {width:'40px'};
    const col2 = {width:'120px'};
    const col3 = {width:'100px'};
    const col4 = {width:'auto'};
    const scrollSize = 330;
    const scroll = {overflow:'auto', height:scrollSize + 'px'};

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
                                    <div className="tb02" style=
                                    {   
                                        showList && showList.length > 8
                                        ? scroll
                                        : null
                                    } onScroll={handleFollow}>
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
                                  {/* <Pagination list={usr} ShowList={fnSetShowList} totalPosts={usr.length}>

                                  </Pagination> */}
                             </section>
                             <div className="gridUtilBottom">
                                <div className="fr">
                                    <button type="button" className="btn04"><span>신규등록</span></button>
                                    <button type="button" className="btn08"><span>수정</span></button>
                                    <button type="button" className="btn01"><span>저장</span></button>
                                    <button type="button" className="btn02"><span>더보기</span></button>
                                    <button type="button" className="btn03"><span>삭제</span></button>
                                </div>
                            </div>
                    </div>
                    </div>
        
   );

   
}


export default MN400;