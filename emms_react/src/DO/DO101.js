import './DO101.css'
import React from "react";

function DO101(){

    const col1 = {width:'auto'};
    const col2 = {width:'80px'};
    const col3 = {width:'60px'};
    const col4 = {width:'100px'};
    const col5 = {width:'130px'};

    return(
        <>
        <div className="subWrap">
            <div className="inner mt10">
            <section>
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
                                            <select className="w180">
                                                <option>미래에셋생명 비대면업무확대</option>
                                                <option>NH차세대지방재정</option>
                                                <option>푸르덴셜 KB 비대면업무확대</option>
                                                <option>정예맴버 프로젝트관리시스템 구축</option>
                                            </select>
                                        </td>
                                        <th scope="row"><span className="tit ml20">문서종류</span></th>
                                        <td>
                                            <select className="w180">
                                                <option>전체</option>
                                                <option>제안요청서</option>
                                                <option>제안서</option>
                                                <option>견적서</option>
                                                <option>공수표</option>
                                                <option>원가표</option>
                                            </select>
                                        </td>
                                        <th scope="row"><span className="tit ml20">등록기간</span></th>
                                        <td className="txtC">
                                            <span className="datepickerBox"><input type="text" placeholder="2022-03-01"/></span>
                                            <span className="wave">~</span>
                                            <span className="datepickerBox"><input type="text" placeholder="2022-03-11"/></span>
                                        </td>
                                        <th scope="row"><span className="tit ml20">등록자</span></th>
                                        <td className="txtC">
                                            <input type="text" placeholder="입력하세요" className="w130"/>
                                        </td>
                                        <th scope="row"><span className="tit ml20">파일명</span></th>
                                        <td className="txtC">
                                            <input type="text" placeholder="입력하세요" className="w245"/>
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
                        <p className="txtGuide">첨부파일을 클릭하여 해당 문서를 다운로드할 수 있습니다.</p>
                    </div>
                </div>

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