import './MN400.css'
import {React, useState, useEffect, lazy, useRef, useCallback } from "react";
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import BottomSlidePop from '../Component/BottomSlidePop';
import {ACT_BOTTOM_SLIDE_POP} from '../reducers/bottomSlidePop';
import InfiniteScroll from '../Component/InfiniteScroll';

const CodeSelectOption = lazy( ()=> import('../Component/CodeSelectOption.js') );
const TeamSelectOption = lazy( ()=> import('../Component/TeamListSelectOption.js') );

function MN400(){
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);

//--------------------------페이징관련-----------------------------------
    //처음보여줄 페이지데이터
    const [showList, setShowList] = useState([]);
    //다음에 보여줄 페이지데이터
    const [nextList, setNextList] = useState();
    //다음페이지 여부
    const [nextYN, setNextYN] = useState();
    //페이지번호
    const [PNo, setPNo] = useState(1);
    //불러오고싶은 데이터 갯수
    const [getCnt, setCnt] = useState(10);
    //데이터 시작번호 
    const [startNo, setstartNo] = useState();
    //데이터 종료번호 
    const [endNo, setendNo] = useState();
    
    //공통코드
    const { cmmnCode } = useSelector(state => state.cmmnCode);

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
    },[count])

    //두번째 페이지부터 데이터 가져오기
    const Paging = () => {
        if(nextYN === 'Y'){
            setTimeout(() => {
                setShowList([...showList, ...nextList])
                axios.post('/api/pagination/MN400/nextPage',{getCnt : getCnt, nextYN : nextYN, startNo : startNo, endNo : endNo})
                .then((rs) =>{
                    setNextYN(rs.data.nextYn);
                    setNextList(rs.data.nextUSR);
                    setstartNo(rs.data.startNo);
                    setendNo(rs.data.endNo);
                }).catch(() => {
                    alert("사용자 불러오기 실패");
                })
            }, 500);
        }else{
            return
        }
    }

    function Colgroup(){
        return(
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
        )
    }

    function Thead(){
        return(
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
        )
    }
      
    //화면에 뿌리는 리스트 컴포넌트
    function Tbody() {
        if  ( showList.length === 0 )  {
          return (
            <tr>
                <td colSpan={11}>데이터가 없습니다.</td>
            </tr>
          )
        }  else  {
          return (
            showList && showList.map(
                (usrList, i ) =>
                cmmnCode['APO_CD'].map(
                    (list,j) =>
                        list.cdVal === usrList.apoCd
                        ?
                        cmmnCode['INC_CD'].map(
                            (data,k) => 
                                data.cdVal === usrList.incCd
                                ? 
                                    <tr key={i} id={usrList.usrNum} onClick={()=>{fn_getMemTargetData(usrList.usrNum); setBottomPopTitle('사용자 수정');}}>
                                        <td className="txtC">{i+1}</td>
                                        <td className="txtC">{usrList.loginId}</td>
                                        <td className="txtC">{usrList.usrName}</td>
                                        {
                                            usrList.usrBirMd !== null
                                            ? <td className="txtC">{usrList.usrBirMd.substring(0,4)}.{usrList.usrBirMd.substring(4,6)}.{usrList.usrBirMd.substring(6,8)}</td>
                                            : <td className="txtC">{usrList.usrBirMd}</td>
                                        }
                                        <td className="txtC" key={k}>{data.cdNm}</td>
                                        <td className="txtC">{list.cdNm}</td>
                                        <td className="txtC">{usrList.usrEmail}</td>
                                        <td className="txtC">{usrList.usrTelNum}</td>
                                        <td className="txtC">{usrList.timNm}</td>
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
                                
                                : null
                            )
                            :null
                    )
                )
          )
        }
      }
 //----------------------------------------------------------------------  
 
 //-----------------------비밀번호 초기화---------------------------------
    //비밀번호 초기화
    function resetPW(usrNum,usrBirMd){
        axios.post('/api/MN400/resetPW',{usrNum : usrNum, usrBirMd: usrBirMd})
        .then(() =>{
            alert('초기화 성공');
        }).catch(()=>{
            alert('초기화 실패');
        })
    };
//-----------------------------------------------------------------------
//하단 레이어 title
    let [bottomPopTitle, setBottomPopTitle] = useState('');

//------------------회원클릭 및 수정--------------------------------------
    function fn_getMemTargetData(paramUsrNum) {
        axios.post('/api/MN400/targetData', {
        usrNum: paramUsrNum
        }).then(function (res) {
        for(var i = 0; i < res.data.value.length; i++ )  {
            setUsrNum(res.data.value[i].usrNum);
            setUsrName(res.data.value[i].usrName);
            setUsrBirMd(res.data.value[i].usrBirMd);
            setIncCd(res.data.value[i].incCd);
            setApoCd(res.data.value[i].apoCd);
            setusrEmail(res.data.value[i].usrEmail);
            setusrTelNum(res.data.value[i].usrTelNum);
            setTimNum(res.data.value[i].timNum);
        }
        });
        dispatch(ACT_BOTTOM_SLIDE_POP('UP'));
    }

//-----------------------------------------------------------------------

//-------------------회원 조회--------------------------------------------

    let [getSearchName, setSearchName] = useState('');

    function searchName(searchName){
        if(searchName === ''){
            setCount(count + 1);
        }else if(searchName !== ''){
            axios.post('/api/MN400/searchName', {"usrName":searchName})
            .then((rs) =>{
                //처음 보여줄데이터
                setShowList(rs.data.value);
                setNextYN('N');
            })
        }
    }
//-----------------------------------------------------------------------

//-------------------------------신규등록---------------------------------
    //신규등록 (하단레이어 보이기)
    function fn_addUSR(){
        resetForm();
        dispatch(ACT_BOTTOM_SLIDE_POP('UP'));
    }

    let [usrNum, setUsrNum] = useState('');
    let [usrName, setUsrName] = useState('');
    let [usrBirMd, setUsrBirMd] = useState('');
    let [incCd, setIncCd] = useState();
    let [apoCd, setApoCd] = useState();
    let [usrEmail, setusrEmail] = useState('');
    let [usrTelNum, setusrTelNum] = useState('');
    let [timNum ,setTimNum] = useState();

    let formDataList = ([setUsrNum,setUsrName,setUsrBirMd,setIncCd,setApoCd,setusrEmail,setusrTelNum,setTimNum])

    function resetForm(){
        formDataList.map((elNm, i)=>{
            return elNm('');
          });
    }

    function Validationcheck(){
        
        let Validation = true;

        const allDataList = [usrNum,usrName,usrBirMd,incCd,apoCd,usrEmail,usrTelNum,timNum];
        const notNull = [usrName,usrBirMd,incCd,apoCd,usrEmail,usrTelNum];
        const numberType = [usrBirMd];
        const numberCheckStyle = /^[0-9]*$/;
        const phoneNumCheck = /^\d{3}-\d{3,4}-\d{4}$/;
        const EmailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;


        for  ( var objNum in allDataList )  {
            /* 필수항목 체크 */
            if  ( notNull.includes(allDataList[objNum]) && (allDataList[objNum] === "" || allDataList[objNum] === "0") )  {
              alert('필수 입력학목이 누락되었습니다.');
              Validation = false;
              break;
            }

            /* 숫자항목 체크 */
            if  ( numberType.includes(allDataList[objNum]) && allDataList[objNum] !== "" && !numberCheckStyle.test(allDataList[objNum]) )  {
                let targetNm = '';
                if  ( allDataList[objNum] === usrBirMd )  targetNm = "생년월일";

                alert(targetNm+' 항목은 숫자만 입력 가능합니다.');
                Validation = false;
                break;
            }

            /* 생년월일 자리수 체크 */
            if  ( usrBirMd === allDataList[objNum] && allDataList[objNum] !== "" && allDataList[objNum].length !== 8 )  {
                alert("생년월일은 YYYYMMDD 형태로 입력해주세요.");
                Validation = false;
                break;
            }

            /* 핸드폰번호 자리수 체크 */
            if  ( usrTelNum === allDataList[objNum] && allDataList[objNum] !== "" && !phoneNumCheck.test(allDataList[objNum] ) ) {
                alert("전화번호는 000-0000-0000 형태로 입력해주세요.");
                Validation = false;
                break;
            }

            /* 이메일 데이터 체크 */
            if  ( usrEmail === allDataList[objNum] && allDataList[objNum] !== "" && !EmailCheck.test(allDataList[objNum] ) ) {
                alert("입력된 값은 이메일형태가 아닙니다.");
                Validation = false;
                break;
            }
        }

            /* 데이터 전송*/
            if (Validation && window.confirm("저장 하시겠습니까?") ) {
                let forData = {"usrNum":usrNum, "usrName":usrName, "usrBirMd":usrBirMd, "incCd":incCd, "apoCd":apoCd, "usrEmail":usrEmail, "usrTelNum":usrTelNum, "timNum":timNum}
                
                axios.post('/api/MN400/updateMember',forData)
                .then((rs)=>{
                    if(rs.data.result > 0){
                        alert("정상처리 되었습니다.");
                        resetForm();
                        setCount(count + 1);
                        dispatch(ACT_BOTTOM_SLIDE_POP('DOWN'));
                    }else {
                        alert("[오류] 잠시 후 다시 이용해주세요.");
                    }
                });
            }
    }

//------------------------------------------------------------------------

//-------------------------style관련--------------------------------------    
    const col1 = {width:'40px'};
    const col2 = {width:'120px'};
    const col3 = {width:'100px'};
    const col4 = {width:'auto'};
    const scrollSize = 330;
//-------------------------------------------------------------------------    
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
                                            <input type="text" className="w130" value={getSearchName} onChange={(e)=>{setSearchName(e.target.value); }} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="fr">
                        <button type="button" className="btn01" onClick={()=>{searchName(getSearchName); setShowList('');} }><i className="ic_search"></i><span>조회</span></button>
                    </div>
                </div>

                <div className="hr20"></div>

                <div className="gridUtil">
                    <div className="fl">
                        <p className="txtGuide">신규사용자를 등록하거나 비밀번호 초기화 및 사용자 상세정보를 수정할 수 있습니다. </p>
                    </div>
                </div>
                                <div className="gridWrap">
                                    <InfiniteScroll scrollSize={scrollSize} Paging={Paging} colgroup={Colgroup} showList={showList} thead={Thead} tbody={Tbody}/>
                                </div>
                                  {/* <Pagination list={usr} ShowList={fnSetShowList} totalPosts={usr.length}>

                                  </Pagination> */}
                             </section>
                             <div className="gridUtilBottom">
                                <div className="fr">
                                    <button type="button" className="btn01" onClick={()=>{fn_addUSR(); setBottomPopTitle('사용자 등록');}}><span>신규등록</span></button>
                                </div>
                            </div>
                            <BottomSlidePop contents={bottomSlidePop()} toggleBtn={false}  title={bottomPopTitle}></BottomSlidePop>
                    </div>
                </div>
        
   );

   


function bottomSlidePop(){
    const col2 = {width:'100%'};



    return(

        <form id='goForm'>
            <input type={"hidden"} value={usrNum}/>
            <div className="gridUtil">
                <div className="fl" style={col2}>
                    <div className="tb02">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="w10p">이름</th>
                                    <td className="txtC">
                                        <input type="text" placeholder="홍길동" className="w110" id='usrName' value={usrName} onChange={(e)=>{ setUsrName(e.target.value);}}/>
                                    </td>
                                    <th className="w10p">생년월일</th>
                                    <td className="txtC">
                                        <input type="text" placeholder="20221031" value={usrBirMd} onChange={(e)=>{ setUsrBirMd(e.target.value);}}/>
                                    </td>
                                    <th className="w10p">직위</th>
                                    <td className="txtC">
                                        <select className="w110" id='incCd' onChange={(e)=>{ setIncCd(e.target.value);}} value={incCd}>
                                            <CodeSelectOption codeGroup={'INC_CD'} />
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="w10p">직책</th>
                                    <td className="txtC">
                                        <select className="w110" id='apoCd' onChange={(e)=>{ setApoCd(e.target.value);}} value={apoCd}>
                                        <CodeSelectOption codeGroup={'APO_CD'} />
                                        </select>
                                    </td>
                                    <th className="w10p">이메일</th>
                                    <td className="txtC">
                                        <input type="text" value={usrEmail} onChange={(e)=>{ setusrEmail(e.target.value);}}/>
                                    </td>
                                    <th className="w10p">전화번호</th>
                                    <td className="txtC">
                                        <input type="text" placeholder="010-1234-5678" value={usrTelNum} onChange={(e)=>{ setusrTelNum(e.target.value);}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="w10p">소속팀</th>
                                    <td className="txtC">
                                        <select className="w110" id='timNum' onChange={(e)=>{ setTimNum(e.target.value);}} value={timNum}>
                                            <option>선택</option>
                                            <TeamSelectOption />
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="gridUtilBottom">
            <div className="fr">
            <button type="button" className="btn01" onClick={() => { Validationcheck();}} ><span>등록</span></button>
            </div>
        </div>
      </form>
    )
}

}
export default MN400;