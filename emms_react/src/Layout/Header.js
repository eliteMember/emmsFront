/* eslint-disable jsx-a11y/anchor-is-valid */
import './Header.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { ACT_USER_INFO_EXPIRE } from "../reducers/userInfo";
import { ACT_SUB_MENU_LIST_UPDATE } from "../reducers/subMenuList";
import { ACT_SUB_MENU_OVER_UPDATE } from "../reducers/subMenuOver";
import { ACT_SUB_MENU_CLICK_UPDATE } from "../reducers/subMenuClick";
import { ACT_SUB_MENU_CLICK_LIST_UPDATE } from "../reducers/subMenuClickList";
import MN300 from '../MN/MN300';

function Header(props) {

  const [popup, handlePopup] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const setLogout = () => {
    axios.get('/api/logout')
      .then(() => {
        props.isLoginChange(false);
        dispatch(ACT_USER_INFO_EXPIRE());
        history.push('/LOGIN');
      }).catch(() => {
        alert("로그아웃 시도 중 오류가 발생하였습니다.");
      })
  };

  const [menuList, setMenuList] = useState(null);
  const { userInfo, subMenuList, subMenuOver, subMenuClick, subMenuClickList } = useSelector(state => ({
    userInfo: state.userInfo
    , subMenuList: state.subMenuList
    , subMenuOver: state.subMenuOver
    , subMenuClick: state.subMenuClick
    , subMenuClickList: state.subMenuClickList
  }));

  useEffect(() => {
    axios.get('/api/menu/getList')
      .then((rs) => {
        setMenuList(rs.data);
      }).catch(() => {
        setMenuList("메뉴 호출 오류");
      })
  }, [userInfo])

  return (
    <div className="subPage">
      <div className="wrapper">

        <div className="header blue"  onMouseLeave={(subMenuClick === null || subMenuClick.toggle === false)
              ? () => { dispatch(ACT_SUB_MENU_LIST_UPDATE({ menu: null, toggle: false })); overSubMenu({ menu: null, toggle: false }) }
              : subMenuClickList && subMenuClick.toggle === true
                ? () => { subMenuClickList && setSubMenu(subMenuClickList, true) }
                : null}>

          <div className="inner">

            <h1 className="logo"><a onClick={() => { setInitialize(); history.push('/MAIN') }}><img src={require('../imgs/logo_02.png')} alt="회사로고" /><span>정예맴버 프로젝트관리시스템</span></a></h1>

            <nav className="gnbWrap">
              <ul>
                {menuList
                  && menuList.parent.map(
                    (menu) =>
                      <li key={menu.mnuNum}
                        onClick={() => { setSubMenu(menu, true) }}
                        onMouseOver={() => { setSubMenu(menu, true); overSubMenu({ menu: null, toggle: false }) }}
                        className={subMenuList && subMenuList.toggle && menu.mnuNum === subMenuList.mnuNum ? "on" : ""}>
                        <a><i className={"iconGnb " + menu.mnuNum}></i>{menu.mnuNm}</a>
                      </li>
                  )}
              </ul>
            </nav>

            <ul className="gnbUtil">
              <li className="userInfo">
                <a onClick={()=>history.push('/MN400')} className="ic_position">한국유투더블유</a>
                <div className="utilSub">
                  <div className="utilSubMenu">
                    <div className="utilSubTitle">사용자관리</div>
                    <ul>
                      <li><a>- 사용자관리</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="userMypage">
                <a onClick={() => {handlePopup(true);}} className="name">{userInfo.usrName} 님</a>
                <div className="utilSub">
                  <div className="utilSubMenu">
                    <ul>
                      <li><a onClick={() => {handlePopup(true);}}>- 내정보</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li><a onClick={() => setLogout()} className="ic_logout" title="로그아웃">로그아웃</a></li>
              <li><a href="#none" className="ic_fullMenu" title="전체메뉴">전체메뉴</a></li>
            </ul>
          </div>
          {(subMenuList && subMenuList.toggle === true) || (subMenuClick && subMenuClick.toggle === true)
            ? <SubMenu />
            : null
          }
        </div>
      </div>
      {popup && <MN300 onClose={handlePopup} /> }
    </div >
  )

  function setInitialize() {
    dispatch(ACT_SUB_MENU_LIST_UPDATE(null));
    dispatch(ACT_SUB_MENU_OVER_UPDATE(null));
    dispatch(ACT_SUB_MENU_CLICK_UPDATE(null));
    dispatch(ACT_SUB_MENU_CLICK_LIST_UPDATE(null));
  }
  function setSubMenu(menu, toggle) {
    dispatch(ACT_SUB_MENU_LIST_UPDATE({ 'mnuNum': Object.keys(menuList).find(key => key === menu.mnuNum), 'toggle': toggle }));

  }
  function overSubMenu(menu, toggle) {
    dispatch(ACT_SUB_MENU_OVER_UPDATE({ 'mnuNum': menu.mnuNum, 'toggle': toggle }));
  }
  function clickSubMenu(menu, toggle) {
    dispatch(ACT_SUB_MENU_CLICK_UPDATE({ 'mnuNum': menu.mnuNum, 'toggle': toggle }));
    dispatch(ACT_SUB_MENU_CLICK_LIST_UPDATE({ 'mnuNum': menu.prtMnuNum, 'toggle': toggle}));
    history.push('/' + menu.mnuUrl);
  }


  function SubMenu() {
    return (
      <div className="tabsArea">
        <div className='tabs'>
          <ul>
            {menuList && subMenuList && subMenuList.mnuNum &&
              menuList[subMenuList.mnuNum].map(
                (menu) =>
                  <li key={menu.mnuNum}
                    className={(subMenuOver && menu.mnuNum === subMenuOver.mnuNum && subMenuOver.toggle)
                      || (subMenuClick && menu.mnuNum === subMenuClick.mnuNum && subMenuClick.toggle)
                      ? "on"
                      : ""}>
                    <a onClick={() => { clickSubMenu(menu, true) }}
                      onMouseEnter={() => { overSubMenu(menu, true) }}
                      onMouseLeave={() => { overSubMenu(menu, false) }}>{menu.mnuNm}</a>
                  </li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }


}

export default Header;