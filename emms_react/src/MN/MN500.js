/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './MN500.css';
import MN500_TAB1 from './MN500_TAB1.js';
import MN500_TAB2 from './MN500_TAB2.js';
import MN500_TAB3 from './MN500_TAB3.js';

function MN500(props) {

  const [contents, setContents] = useState('MN500_TAB1');

  return (
    <div className="mainPage">
      {/*s : mainWrap*/}
      <div className="mainWrap">
        <div className="mainVisual">

          <div className="mainTit">
            <p>정예맴버</p>
            <p>프로젝트관리시스템</p>
          </div>
          {/* 20210506 수정 */}
          <div className="mainNewLink">
            <div className="inner">
              <ul>
                <li><a href="#" className="btnMenuItem"><div className="cate">팀 관리</div><div className="icons"></div><div className="desc">팀원등록부터 팀구성까지<br />편리하게!</div><div className="btnGo">바로가기</div></a></li>
                <li><a href="#" className="btnMenuItem"><div className="cate">프로젝트 제안</div><div className="icons"></div><div className="desc">프로젝트 제안과정을<br />간편하게!</div><div className="btnGo">바로가기</div></a></li>
                <li><a href="#" className="btnMenuItem"><div className="cate">프로젝트 관리</div><div className="icons"></div><div className="desc">프로젝트 관리를<br />손쉽게!</div><div className="btnGo">바로가기</div></a></li>
                <li><a href="#" className="btnMenuItem"><div className="cate">인력관리</div><div className="icons"></div><div className="desc">인력관리를<br />체계적으로!</div><div className="btnGo">바로가기</div></a></li>
                <li><a href="#" className="btnMenuItem"><div className="cate">문서관리</div><div className="icons"></div><div className="desc">문서관리까지<br />자유롭게!</div><div className="btnGo">바로가기</div></a></li>
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
                  <li className="current"><a onClick={()=>setContents('MN500_TAB1')}>공지사항</a></li>
                  <li><a onClick={()=>setContents('MN500_TAB2')}>FAQ</a></li>
                  <li><a onClick={()=>setContents('MN500_TAB3')}>문서양식</a></li>
                </ul>
                {
                  contents === 'MN500_TAB1' ? <MN500_TAB1/>
                  : contents === 'MN500_TAB2' ? <MN500_TAB2/>
                  : contents === 'MN500_TAB3' ? <MN500_TAB3/>
                  : null
                }

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
  )
}


export default MN500;