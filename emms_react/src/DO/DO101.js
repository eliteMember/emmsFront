import './DO101.css'
import React, { lazy, useEffect, useState } from "react";
import axios from 'axios';

import { getYear, getMonth } from "date-fns"; // getYear, getMonth 
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ko", ko) // 한국어적용
const _ = require('lodash');


const CodeSelectOption = lazy( ()=> import('../Component/CodeSelectOption.js') );
const ProjectSelectOption = lazy( ()=> import('../Component/ProjectListSelectOption.js') );

function DO101(){

    const col1 = {width:'auto'};
    const col2 = {width:'80px'};
    const col3 = {width:'60px'};
    const col4 = {width:'100px'};
    const col5 = {width:'130px'};
    
    
//---------------------------상세검색테이블---------------------------------------
    function FirstTable(){
        

        const [searchField, setSearchFiled] = useState({
            prjNum : "",        //프로젝트번호
            docClsCd : "",      //서류분류코드
            startDate : "",     //검색시작날짜
            endDate : "",       //검색끝날짜
            crtUsrNum : "",     //작성자
            filNm : ""          //파일명
        });

        const [showFiled, setShowFiled] = useState([]);

        const handleChange = event => {
            const { id, value } = event.target;
            let changeFields = {...searchField};
            changeFields[id] = value;
            setSearchFiled(changeFields);
        }

        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const years = _.range(1950, getYear(new Date()) + 1, 1);
        const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        
        useEffect(() => {
            let changeFields = {...searchField};

            if( startDate != null ){
                changeFields['startDate']  = toStringByFormattingDay(startDate);
            }
            setSearchFiled(changeFields);

            console.log(changeFields['startDate']);

        }, [startDate]);

        useEffect(() => {
            let changeFields = {...searchField};

            if( endDate != null ){
                changeFields['endDate']  = toStringByFormattingDay(endDate);
            }
            setSearchFiled(changeFields);

            console.log(changeFields['endDate']);

        }, [endDate]);

        //월이 1자리 일 경우 앞에 0
        function leftPad(value) { 
            if (value >= 10) { 
                return value; 
            } 
            return `0${value}`; 
        } 

        //dateFormat - 년,월,일
        function toStringByFormattingDay(source, delimiter = '') { 
            const year = source.getFullYear(); 
            const month = leftPad(source.getMonth() + 1); 
            const day = leftPad(source.getDate()); 
            return [year, month, day].join(delimiter); 
        }

        //데이터검색 함수
        function searchData(){
            axios.post('/api/DO101/searchList', searchField)
            .then((rs) =>{
                setShowFiled(rs.data.List);
            }).catch(()=>{
                alert("[시스템 오류] 잠시후 다시 시도해주세요.")
            })
        }

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
                                            <select className="w180" id='prjNum' onChange={handleChange}>
                                                <option value='0' hidden></option>
                                                <ProjectSelectOption />
                                            </select>
                                        </td>
                                        <th scope="row"><span className="tit ml20">문서종류</span></th>
                                        <td>
                                            <select className="w180" id='docClsCd' onChange={handleChange}>
                                                <CodeSelectOption codeGroup={'DOC_CLS_CD'}/>
                                            </select>
                                        </td>
                                        <th scope="row"><span className="tit ml20">등록기간</span></th>
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
                                                selected={startDate}
                                                dateFormat={"yyyy/MM/dd"}
                                                locale={ko}
                                                onChange={(date) => setStartDate(date)}
                                            />
                                            ~
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
                                            <input type="text" placeholder="입력하세요" className="w130" id='crtUsrNum' value={searchField.crtUsrNum} onChange={handleChange}/>
                                        </td>
                                        <th scope="row"><span className="tit ml20">파일명</span></th>
                                        <td className="txtC">
                                            <input type="text" placeholder="입력하세요" className="w245" id='filNm' value={searchField.filNm} onChange={handleChange}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                        <div className="fr">
                            <button type="button" className="btn01" onClick={()=>{searchData();}}><i className="ic_search"></i><span>조회</span></button>
                    </div>
                </div>
            </form>
        )
    }
//---------------------------------------------------------------------------------


//---------------------------문서리스트테이블-----------------------------------------------------
    function SecondTable(){

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
                            <tr>
                                <td className="txtC">10</td>
                                <td className="txtL">미래에셋생명 비대면업무확대</td>
                                <td className="txtC">제안서</td>
                                <td className="txtC">미래에셋생명_RFP_v0.1_20220224.Doc</td>
                                <td className="txtC">201KB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">9</td>
                                <td className="txtL">푸르덴셜 KB 비대면업무확대</td>
                                <td className="txtC">제안요청서</td>
                                <td className="txtC">푸르덴셜_RFP_v0.1_20220311.Doc</td>
                                <td className="txtC">201KB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">8</td>
                                <td className="txtL">NH차세대지방재정</td>
                                <td className="txtC">견적서</td>
                                <td className="txtC">NH_견적서전송_v0.3_20220224.Doc</td>
                                <td className="txtC">10GB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">7</td>
                                <td className="txtL">미래에셋생명 비대면업무확대</td>
                                <td className="txtC">공수표</td>
                                <td className="txtC">미래에셋생명_RFP_v0.1_20220224.Doc</td>
                                <td className="txtC">201KB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">6</td>
                                <td className="txtL">NH차세대지방재정</td>
                                <td className="txtC">원가표</td>
                                <td className="txtC">NH_견적서전송_v0.3_20220224.Doc</td>
                                <td className="txtC">10GB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">5</td>
                                <td className="txtL">NH차세대지방재정</td>
                                <td className="txtC">견적서</td>
                                <td className="txtC">NH_견적서전송_v0.3_20220224.Doc</td>
                                <td className="txtC">10GB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">4</td>
                                <td className="txtL">푸르덴셜 KB 비대면업무확대</td>
                                <td className="txtC">제안요청서</td>
                                <td className="txtC">푸르덴셜_RFP_v0.1_20220311.Doc</td>
                                <td className="txtC">201KB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">3</td>
                                <td className="txtL">NH차세대지방재정</td>
                                <td className="txtC">견적서</td>
                                <td className="txtC">NH_견적서전송_v0.3_20220224.Doc</td>
                                <td className="txtC">10GB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">2</td>
                                <td className="txtL">푸르덴셜 KB 비대면업무확대</td>
                                <td className="txtC">제안요청서</td>
                                <td className="txtC">푸르덴셜_RFP_v0.1_20220311.Doc</td>
                                <td className="txtC">201KB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
                            <tr>
                                <td className="txtC">1</td>
                                <td className="txtL">미래에셋생명 비대면업무확대</td>
                                <td className="txtC">공수표</td>
                                <td className="txtC">미래에셋생명_RFP_v0.1_20220224.Doc</td>
                                <td className="txtC">201KB</td>
                                <td className="txtC"><button type="button" className="btn00"><i className="ic_file"></i><span className="hidden">제안요청서</span></button></td>
                                <td className="txtC">2021-01-27</td>
                                <td className="txtC">홍길동</td>
                            </tr>
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
                </div>

            </section>

                
            </div>
        </div>
        </>
    )
}

export default DO101;