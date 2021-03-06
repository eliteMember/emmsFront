/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import './MN500.css';
import MN500_TAB1 from './MN500_TAB1.js';
import MN500_TAB2 from './MN500_TAB2.js';
import MN500_TAB3 from './MN500_TAB3.js';
import { ACT_SUB_MENU_LIST_UPDATE } from "../reducers/subMenuList";
import { ACT_SUB_MENU_OVER_UPDATE } from "../reducers/subMenuOver";
import { ACT_SUB_MENU_CLICK_UPDATE } from "../reducers/subMenuClick";
import { ACT_SUB_MENU_CLICK_LIST_UPDATE } from "../reducers/subMenuClickList";

function MN500(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [contents, setContents] = useState('MN500_TAB1');
  useEffect(() => {
    dispatch(ACT_SUB_MENU_LIST_UPDATE(null));
    dispatch(ACT_SUB_MENU_OVER_UPDATE(null));
    dispatch(ACT_SUB_MENU_CLICK_UPDATE(null));
    dispatch(ACT_SUB_MENU_CLICK_LIST_UPDATE(null));
  }, [dispatch])

  const [menuList, setMenuList] = useState(null);

  useEffect(() => {
    axios.get('/api/menu/getList')
      .then((rs) => {
        setMenuList(rs.data);
      }).catch(() => {
        setMenuList("메뉴 호출 오류");
      })
  }, [])

  function locationMenu(prtNum, mnuNum, URL) {
    dispatch(ACT_SUB_MENU_LIST_UPDATE({ 'mnuNum': Object.keys(menuList).find(key => key === prtNum), 'toggle': true }));
    dispatch(ACT_SUB_MENU_CLICK_UPDATE({ 'mnuNum': mnuNum, 'toggle': true }));
    history.push(URL)
  }

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
                <li><a onClick={() => {locationMenu('TM100','TM101','/TIMMNG')}}
                  className="btnMenuItem"><div className="cate">팀 관리</div><div className="icons"></div><div className="desc">팀원등록부터 팀구성까지<br />편리하게!</div><div className="btnGo">바로가기</div></a></li>
                <li><a onClick={() => {locationMenu('PO100','PO101','/PRJINFO')}}
                  className="btnMenuItem"><div className="cate">프로젝트 제안</div><div className="icons"></div><div className="desc">프로젝트 제안과정을<br />간편하게!</div><div className="btnGo">바로가기</div></a></li>
                <li><a onClick={() => {locationMenu('PM100','PM101','/RDEPMHR')}}
                  className="btnMenuItem"><div className="cate">프로젝트 관리</div><div className="icons"></div><div className="desc">프로젝트 관리를<br />손쉽게!</div><div className="btnGo">바로가기</div></a></li>
                <li><a onClick={() => {locationMenu('ME100','ME101','/MEMMNG')}}
                  className="btnMenuItem"><div className="cate">인력관리</div><div className="icons"></div><div className="desc">인력관리를<br />체계적으로!</div><div className="btnGo">바로가기</div></a></li>
                <li><a onClick={() => {locationMenu('DO100','DO101','/DOCMNG')}}
                  className="btnMenuItem"><div className="cate">문서관리</div><div className="icons"></div><div className="desc">문서관리까지<br />자유롭게!</div><div className="btnGo">바로가기</div></a></li>
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
                  <li className={contents === 'MN500_TAB1' ? "current" : ""}><a onClick={() => setContents('MN500_TAB1')}>공지사항</a></li>
                  <li className={contents === 'MN500_TAB2' ? "current" : ""}><a onClick={() => setContents('MN500_TAB2')}>FAQ</a></li>
                  <li className={contents === 'MN500_TAB3' ? "current" : ""}><a onClick={() => setContents('MN500_TAB3')}>문서양식</a></li>
                </ul>
                {
                  contents === 'MN500_TAB1' ? <MN500_TAB1 />
                    : contents === 'MN500_TAB2' ? <MN500_TAB2 />
                      : contents === 'MN500_TAB3' ? <MN500_TAB3 />
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