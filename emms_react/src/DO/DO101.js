import './DO101.css'
import React, { lazy, useEffect, useState } from "react";
import axios from 'axios';
import FileSaver from "file-saver";
import { getYear, getMonth } from "date-fns"; // getYear, getMonth 
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import * as common from '../Common/common';
registerLocale("ko", ko) // 한국어적용
const _ = require('lodash');

function DO101(){

    const col1 = {width:'auto'};
    const col2 = {width:'80px'};
    const col3 = {width:'60px'};
    const col4 = {width:'100px'};
    const col5 = {width:'130px'};
    
    const [showFiled, setShowFiled] = useState([]);

    //공통코드
    const { cmmnCode } = useSelector(state => state.cmmnCode);

//---------------------------상세검색테이블---------------------------------------
    function FirstTable(){
        
        var previous = new Date();
        previous.setMonth(previous.getMonth() - 3);
        
        const [ProjectList, ProjectListModify] = useState([]);  //프로젝트 리스트
        const [prjNum, setPrjNum] = useState();                 //프로젝트번호
        const [prjNm, setPrjNm] = useState();                   //프로젝트이름
        const [docClsCd, setDocClsCd] = useState();             //서류분류코드
        const [docClsCdNm, setDocClsCdNm] = useState();         //서류분류명
        const [startDate, setStartDate] = useState();           //검색시작날짜
        const [endDate, setEndDate] = useState();               //검색끝날짜
        const [searchWriter, setSearchWriter] = useState('');   //등록자
        const [searchFileNm, setSearchFileNm] = useState('');   //파일명

        const years = _.range(1950, getYear(new Date()) + 1, 1);
        const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        
        //월이 1자리 일 경우 앞에 0
        function leftPad(value) { 
            if (value >= 10) { 
                return value; 
            } 
            return `0${value}`; 
        }

        //dateFormat - 년,월,일
        function toStringByFormattingDay(source, delimiter = '') {
            if(source !== '' && source !== null && source !== undefined){
                const year = source.getFullYear(); 
                const month = leftPad(source.getMonth() + 1); 
                const day = leftPad(source.getDate()); 
            return [year, month, day].join(delimiter); 
            }
        }


        //데이터검색 함수
        function searchData(){

            let changeStartDate = toStringByFormattingDay(startDate);
            let changeEndDate = toStringByFormattingDay(endDate);

            const searchField = {
                "prjNum" : prjNum,        //프로젝트번호
                "docClsCd" : docClsCd,      //서류분류코드
                "startDate" : changeStartDate,     //검색시작날짜
                "endDate" : changeEndDate,       //검색끝날짜
                "crtUsrNum" : searchWriter,     //작성자
                "filNm" : searchFileNm          //파일명
            }

            let now = toStringByFormattingDay(new Date());
            
            let isNull = true;
            let dateNull = false;
            let comparisonDate = false;
            let today = false;

            for(let data in searchField){
                if(common.isEmpty(searchField[data]) === false) isNull=false;
            }
            
            if(common.isEmpty(searchField["startDate"]) === false) {
                if(common.isEmpty(searchField["endDate"])=== true){
                    dateNull = true;
                }
            }

            if(searchField["startDate"] > searchField["endDate"]){
                comparisonDate = true;
            }

            if(searchField["startDate"] > now || searchField["endDate"] > now){
                today = true;
            }

            if(isNull){
                alert("조회할 조건를 선택해주세요.");
            }else if(dateNull){
                alert("등록기간을 모두 선택해주세요.");
            }else if(comparisonDate){
                alert("검색시작날짜가 검색종료날짜보다 빠를수 없습니다.");
            }else if(today){
                alert("검색날짜가 오늘날짜보다 빠를수 없습니다.");
            }else{
                console.log(searchField);
                axios.post('/api/DO101/searchList', searchField)
                .then((rs) =>{
                    setShowFiled(rs.data.List);
                    console.log(rs.data.List);
                }).catch(()=>{
                    alert("[시스템 오류] 잠시후 다시 시도해주세요.")
                })
            }
        }


//------------------프로젝트 다중선택------------------------------------------------------
        

        useEffect(() => {
            axios.get('/api/cmmn/listProject').then(function (res) {
                ProjectListModify(res.data.list);
            })
        },[]);
        
        const [selectBoxIndex, setSelectBoxIndex] = useState([]);

        function ProjectSelect(){
            return (
                <>
                {
                    ProjectList.map((data, i)=>{
                        return (
                            selectBoxIndex && selectBoxIndex.indexOf(data.prjNum) < 0
                        ? <option key={i} value={data.prjNum}>{data.prjNm}</option>
                        : null
                        )
                    })
                }
                </>
            )
        }

        function optionClick(e){
            e.preventDefault();
            let opt = [...selectBoxIndex]
            opt[opt.length] = e.target.value
            setSelectBoxIndex(opt)
        }    

        function findProjectNm(data){
            let prj = prjNum;
            if(prj === "" || prj === null || prj === undefined){
                setPrjNum("'"+data+"'");
            }else{
                prj += ",'"+data+"'";
                setPrjNum(prj);
            }

            for(var i = 0; i < ProjectList.length; i++){
                if(ProjectList[i].prjNum === data){
                    let prjName = prjNm;
                    if(prjName === "" || prjName === null || prjName === undefined){
                        setPrjNm("'"+ProjectList[i].prjNm+"'");
                    }else{
                        prjName += ",'"+ProjectList[i].prjNm+"'";
                        setPrjNm(prjName);
                    }
                }
            }
            
        }

//------------------------------------------------------------------------------
//------------------------공통코드(문서종류) 다중선택-----------------------------
        const { cmmnCode } = useSelector(state => state.cmmnCode);  // 공통코드
        
        
        
        function findDocClsCdNm(data){
            let doc = docClsCd;
            if(doc === "" || doc === null || doc === undefined){
                setDocClsCd("'"+data+"'");
            }else{
                doc += ",'"+data+"'";
                setDocClsCd(doc);
            }
            for(var i = 0; i < cmmnCode['DOC_CLS_CD'].length; i++){
                if(cmmnCode['DOC_CLS_CD'][i].cdVal === data){
                    let docName = docClsCdNm;
                    if(docName === "" || docName === null || docName === undefined){
                        setDocClsCdNm("'"+cmmnCode['DOC_CLS_CD'][i].cdNm+"'");
                    }else{
                        docName += ",'"+cmmnCode['DOC_CLS_CD'][i].cdNm+"'";
                        setDocClsCdNm(docName);
                    }
                }
            }
            
        }


        function DocClsCdSelect(){
            return(
            <>
                {
                cmmnCode['DOC_CLS_CD'].map((data, i)=>{
                    var optionText = data.cdNm;
                    if  ( data.cdVal == 0 )  optionText = "선택";
                    return(
                        selectBoxIndex && selectBoxIndex.indexOf(data.cdVal) < 0 
                        ? <option key={i} value={data.cdVal} >{optionText}</option>
                        : null
                        ) 
                })
                }
            </>
            )
        }



//------------------------------------------------------------------------------
//------------------------검색 초기화 버튼---------------------------------------
        function resetSearch(){
            setSelectBoxIndex([]);
            setPrjNum();
            setPrjNm();
            setDocClsCd();
            setDocClsCdNm();
            setStartDate('');
            setEndDate('');
            setSearchWriter('');
            setSearchFileNm('');
        }
//------------------------------------------------------------------------------

        return(
            <form id='fileSearch'>
                <div className="gridUtil">
                    <div className="fl">
                        <div className="tb01">
                        
                            <table>
                                <colgroup>
                                    <col style={col2}/>
                                    <col style={col1}/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row"><span className="tit">프로젝트</span></th>
                                        <td>
                                            <select className="w180" id='prjNum' onChange={(e)=>{
                                               optionClick(e);
                                                findProjectNm(e.target.value);}}>
                                                <option value='0' hidden>선택</option>
                                                <ProjectSelect/>
                                            </select>
                                            <span className="ml10 point01 bold">{prjNm}</span>
                                        </td>
                                        <th scope="row"><span className="tit ml20">문서종류</span></th>
                                        <td>
                                            <select className="w180" id='docClsCd' onChange={(e)=>{optionClick(e); findDocClsCdNm(e.target.value);}}>
                                                <DocClsCdSelect/>
                                            </select>
                                            <span className="ml10 point01 bold">{docClsCdNm}</span>
                                        </td>
                                        <th scope="row"><span className="tit ml20">등록기간</span></th>
                                        <td className="txtC">
                                            <DatePicker
                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    changeMonth,
                                                }) => (
                                                <div
                                                    style={{
                                                        margin: 10,
                                                        display: "flex",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <select
                                                        value={getYear(date)}
                                                        onChange={({ target: { value } }) => changeYear(value)}
                                                    >
                                                    {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                    </select>

                                                    <select
                                                        value={months[getMonth(date)]}
                                                        onChange={({ target: { value } }) =>
                                                            changeMonth(months.indexOf(value))
                                                        }
                                                    >
                                                    {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                    </select>
                                                </div>
                                                )}
                                                selected={startDate}
                                                dateFormat={"yyyy/MM/dd"}
                                                locale={ko}
                                                onChange={(date) => setStartDate(date)}
                                            />
                                        </td>
                                        <td className="txtC">&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                        <td className="txtC">
                                        <DatePicker
                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    changeMonth,
                                                    decreaseMonth,
                                                    increaseMonth,
                                                    prevMonthButtonDisabled,
                                                    nextMonthButtonDisabled,
                                                }) => (
                                                <div
                                                    style={{
                                                        margin: 10,
                                                        display: "flex",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                        {"<"}
                                                    </button>
                                                    <select
                                                        value={getYear(date)}
                                                        onChange={({ target: { value } }) => changeYear(value)}
                                                    >
                                                    {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                    </select>

                                                    <select
                                                        value={months[getMonth(date)]}
                                                        onChange={({ target: { value } }) =>
                                                            changeMonth(months.indexOf(value))
                                                        }
                                                    >
                                                    {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                    </select>

                                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                        {">"}
                                                    </button>
                                                </div>
                                                )}
                                                selected={endDate}
                                                dateFormat={"yyyy/MM/dd"}
                                                locale={ko}
                                                onChange={(date) => setEndDate(date)}
                                            />
                                        </td>
                                        <th scope="row"><span className="tit ml20">등록자</span></th>
                                        <td className="txtC">
                                            <input type="text" placeholder="입력하세요" className="w130" id='crtUsrNum' value={searchWriter} onChange={(e)=>{setSearchWriter(e.target.value);}}/>
                                        </td>
                                        <th scope="row"><span className="tit ml20">파일명</span></th>
                                        <td className="txtC">
                                            <input type="text" placeholder="입력하세요" className="w245" id='filNm' value={searchFileNm} onChange={(e)=>{setSearchFileNm(e.target.value);}}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                        <div className="fr">
                            <button type="button" className="btn01" onClick={()=>{searchData()}}><i className="ic_search"></i><span>조회</span></button>
                            <button type="button" className="btn01" onClick={()=>{resetSearch();}}><span>초기화</span></button>
                    </div>
                </div>
            </form>
        )
    }
//---------------------------------------------------------------------------------


//---------------------------문서리스트테이블-----------------------------------------------------
    function SecondTable(){

        function fileSave(url,fileNm, fileExt){
            // FileSaver.saveAs(url, fileNm + "." + fileExt)
            axios({
                url: '/api/DO101/download',
                method: 'POST',
                data:{
                    url: url,
                    fileNm : fileNm,
                    fileExt : fileExt
                },
                responseType: 'blob', // important
              }).then((response) => {
                FileSaver.saveAs(new Blob([response.data]), fileNm + "." + fileExt);
              });
        }

        return(
            <div className="tb02">                            
                    <table>
                        <caption>테이블</caption>
                        <colgroup>
                            <col style={col3}/>
                            <col style={col1}/>
                            <col style={col4}/>
                            <col style={col1}/>
                            <col style={col3}/>
                            <col style={col3}/>
                            <col style={col5}/>
                            <col style={col2}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">프로젝트명</th>
                                <th scope="col">문서종류</th>
                                <th scope="col">문서명</th>
                                <th scope="col">파일크기</th>
                                <th scope="col">첨부파일</th>
                                <th scope="col">등록일</th>
                                <th scope="col">등록자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showFiled.length === 0
                            ?   <tr>
                                    <td colSpan={11}>데이터가 없습니다.</td>
                                </tr>
                            :   showFiled && showFiled.map(
                                (List, i) =>
                                cmmnCode['DOC_CLS_CD'].map(
                                    (data,j) =>
                                    data.cdVal === List.docClsCd
                                    ?
                                    <tr key={i}>
                                        <td className="txtC">{i+1}</td>
                                        <td className="txtL">{List.prjNm}</td>
                                        <td className="txtC">{data.cdNm}</td>
                                        <td className="txtC">{List.filNm}.{List.filExt}</td>
                                        {
                                            List.filSiz < 1024
                                            ? <td className="txtC">{parseInt(List.filSiz)}B</td>
                                            : (List.filSiz < 1048576
                                                ? <td className="txtC">{parseInt(List.filSiz/1024)}KB</td>
                                                : (List.filSiz < 1073741824
                                                    ? <td className="txtC">{parseInt(List.filSiz/1024/1024)}MB</td>
                                                    : <td className="txtC">{parseInt(List.filSiz/1024/1024/1024)}GB</td>
                                                  )
                                              )
                                        }
                                        <td className="txtC"><button type="button" className="btn00" onClick={()=>{fileSave(List.orgFilNm, List.filNm, List.filExt);}}><i className="ic_file"></i><span className="hidden">{List.filNm}</span></button></td>
                                        <td className="txtC">{List.crtDtm.substring(0,4)}-{List.crtDtm.substring(4,7)}-{List.crtDtm.substring(7,10)}</td>
                                        <td className="txtC">{List.usrName}</td>
                                    </tr>
                                    : null
                                )
                                
                            )
                            }
                        </tbody>
                    </table>
                </div>
        )
    }
//------------------------------------------------------------------------------------
    return(
        <>
        <div className="subWrap">
            <div className="inner mt10">
            <section>
                <FirstTable/>
                <div className="hr20"></div>

                <div className="gridUtil">
                    <div className="fl">
                        <p className="txtGuide">첨부파일을 클릭하여 해당 문서를 다운로드할 수 있습니다.</p>
                    </div>
                </div>
                <SecondTable/>
                <div className="gridUtilBottom mt30">
                    {/* <div className="paging">
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
                    </div> */}
                </div>

            </section>

                
            </div>
        </div>
        </>
    )
}

export default DO101;