/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './MN500.css';

function MN500(props) {
  return (
    <div className="mainPage">
      {/*s : mainWrap*/}
      <div className="mainWrap">
        <div className="mainVisual">

          <div className="mainTit">
            <p>정예맴버</p>
            <p>프로젝트관리시스템</p>

            {/* 20210506 수정 */}
            <div className="mainNewLink">
              <div className="inner">
                <ul>
                  <li><a href="#" className="btnMenuItem"><div className="cate">팀 관리</div><div className="icons"></div><div className="desc">팀원등록부터 팀구성까지<br/>편리하게!</div><div className="btnGo">바로가기</div></a></li>
                  <li><a href="#" className="btnMenuItem"><div className="cate">프로젝트 제안</div><div className="icons"></div><div className="desc">프로젝트 제안과정을<br/>간편하게!</div><div className="btnGo">바로가기</div></a></li>
                  <li><a href="#" className="btnMenuItem"><div className="cate">프로젝트 관리</div><div className="icons"></div><div className="desc">프로젝트 관리를<br/>손쉽게!</div><div className="btnGo">바로가기</div></a></li>
                  <li><a href="#" className="btnMenuItem"><div className="cate">인력관리</div><div className="icons"></div><div className="desc">인력관리를<br/>체계적으로!</div><div className="btnGo">바로가기</div></a></li>
                  <li><a href="#" className="btnMenuItem"><div className="cate">문서관리</div><div className="icons"></div><div className="desc">문서관리까지<br/>자유롭게!</div><div className="btnGo">바로가기</div></a></li>
                </ul>
              </div>
            </div>
            {/* //20210506 수정 */}

          </div>

          <div className="mainCont">
            <ul>
              <li>
                <div className="bbsTabWrap">

                  <ul className="tabs">
                    <li className="current"><a href="#tab01">공지사항</a></li>
                    <li><a href="#tab02">FAQ</a></li>
                    <li><a href="#tab03">문서양식</a></li>
                  </ul>


                  {/*s : 공지사항*/}
                  <div className="tabCont" id="tab01">

                    <ul className="noticeList">
                      <li>
                        <a href="#none">
                          <div><i className="ic_notice st01">공지</i></div>
                          <div><span className="tit">푸르덴셜 RFP 관련 공지를 올립니다. </span><i className="ic_new"></i></div>
                          <div><span className="date">2022-03-03</span></div>
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          <div><span className="ic"><i className="ic_notice st02">업데이트</i></span></div>
                          <div><span className="tit">공지 업데이트 2021년 3월 업데이트안내</span></div>
                          <div><span className="date">2022-02-26</span></div>
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          <div><span className="ic"><i className="ic_notice st03">안내</i></span></div>
                          <div><span className="tit">우리은행 프로젝트 서비스 오픈 임박 안내입니다.</span></div>
                          <div><span className="date">2022-02-18</span></div>
                        </a>
                      </li>
                    </ul>
                    <p className="btn"><a href="#none">더보기</a></p>

                  </div>
                  {/* e : 공지사항*/}
                  {/*s : FAQ*/}
                  <div className="tabCont" id="tab02">

                    <ul className="noticeList">
                      <li>
                        <a href="#none">
                          <div><i className="ic_notice st01">공지</i></div>
                          <div><span className="tit">FAQ 출력 시스템 환경 변경 안내</span></div>
                          <div><span className="date">2022-03-03</span></div>
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          <div><span className="ic"><i className="ic_notice st02">업데이트</i></span></div>
                          <div><span className="tit">FAQ 시스템 2022년 3월 업데이트안내</span><i className="ic_new"></i></div>
                          <div><span className="date">2022-02-28</span></div>
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          <div><span className="ic"><i className="ic_notice st03">안내</i></span></div>
                          <div><span className="tit">FAQ 2022년 출력환경안내입니다.</span></div>
                          <div><span className="date">2022-02-13</span></div>
                        </a>
                      </li>
                    </ul>
                    <p className="btn"><a href="#none">더보기</a></p>
                  </div>
                  {/* e : FAQ*/}
                  {/*s : 문서양식*/}
                  <div className="tabCont" id="tab03">

                    <ul className="noticeList">
                      <li>
                        <a href="#none">
                          <div><span className="tit">문서양식 출력 시스템 환경 변경 안내</span><i className="ic_new"></i></div>
                          <div><span className="date">2022-03-03</span></div>
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          <div><span className="tit">문서양식 시스템 2022년 3월 업데이트안내</span></div>
                          <div><span className="date">2022-02-28</span></div>
                        </a>
                      </li>
                      <li>
                        <a href="#none">
                          <div><span className="tit">2022년 RFP 문서양식입니다.</span></div>
                          <div><span className="date">2022-02-13</span></div>
                        </a>
                      </li>
                    </ul>
                    <p className="btn"><a href="#none">더보기</a></p>

                  </div>
                  {/* e : 문서양식*/}

                </div>{/*//bbsTabWrap*/}

              </li>

              <li>
                <div className="helpDesk">
                  <p className="title">Help Desk</p>
                  <ul>
                    <li><span className="tel">02-2038-2933</span></li>
                    <li><span>업무시간:09:00~18:00<br />(토/일/공휴일 휴무)</span></li>
                  </ul>
                </div>
              </li>
            </ul>

          </div>
          {/* e: mainCont*/}

          <div className="footer">
            <div className="footer_inner">

              <a href="#none" className="groupWare"><span>그룹웨어 바로가기</span></a>
              <dl>
                <dt>TEL</dt>
                <dd>02-2038-2933</dd>
              </dl>
              <div className="ic_dot ml10"></div>
              <dl className="ml10">
                <dt>FAX</dt>
                <dd>070-8282-4283</dd>
              </dl>
              <div className="ic_bar ml20"></div>
              <dl>
                <dt>한국유투더블유 홈페이지</dt>
                <dd>www.u2w.co.kr</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default MN500;