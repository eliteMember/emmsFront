/* eslint-disable jsx-a11y/anchor-is-valid */
import './Header.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { ACT_USER_INFO_EXPIRE } from "../reducers/userInfo";


function Header(props) {
  const dispatch = useDispatch();

  const history = useHistory();

  const setLogout = () => {
    axios.get('/api/logout')
      .then(() => {
        props.isLoginChange(false);
        dispatch(ACT_USER_INFO_EXPIRE());
      }).catch(() => {
        alert("로그아웃 시도 중 오류가 발생하였습니다.");
      })
  };

  const [menuList, setMenuList] = useState(null);
  const [subMenuList, setSubMenuList] = useState(null);
  const [subMenuOver, setSubMenuOver] = useState(null);
  const [subMenuClick, setSubMenuClick] = useState(null);
  const [subMenuClickList, setSubMenuClickList] = useState(null);
  const { userInfo } = useSelector(state => state.userInfo);

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

        <div className="header blue">
          <div className="inner">

            <h1 className="logo"><a onClick={() => {setInitialize(); history.push('/MAIN')}}><img src={require('../imgs/logo_02.png')} alt="회사로고" /><span>정예맴버 프로젝트관리시스템</span></a></h1>

            <nav className="gnbWrap">
              <ul>
                {menuList
                  && menuList.parent.map(
                    (menu) =>
                      <li key={menu.mnuNum}
                        onClick={() => { setSubMenu(menu, true) }}
                        onMouseOver={() => { setSubMenu(menu, true); overSubMenu({ menu: null, toggle: false }) }}>
                        <a><i className={"iconGnb " + menu.mnuNum}></i>{menu.mnuNm}</a>
                      </li>
                  )}
              </ul>
            </nav>

            <ul className="gnbUtil">
              <li className="userInfo">
                <a href="#none" className="ic_position">한국유투더블유</a>
                <div className="utilSub">
                  <div className="utilSubMenu">
                    <div className="utilSubTitle">사용자관리</div>
                    <ul>
                      <li><a href="#">- 사용자관리</a></li>
                      <li><a href="#">- 회사정보</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="userMypage">
                <a onClick={() => history.push('/MYINFO')} className="name">{userInfo.usrName} 님</a>
                <div className="utilSub">
                  <div className="utilSubMenu">
                    <ul>
                      <li><a onClick={() => history.push('/MYINFO')}>- 내정보</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li><a onClick={() => setLogout()} className="ic_logout" title="로그아웃">로그아웃</a></li>
              <li><a href="#none" className="ic_fullMenu" title="전체메뉴">전체메뉴</a></li>
            </ul>
          </div>
          {(subMenuList && subMenuList.toggle === true) || (subMenuClick && subMenuClick.toggle === true)
            ? <SubMenu menuList={menuList} subMenuList={subMenuList} subMenuOver={subMenuOver} subMenuClick={subMenuClick} subMenuClickList={subMenuClickList} />
            : null
          }
        </div>
      </div>
    </div >
  )

  function setInitialize() {
    setSubMenuList(null);
    setSubMenuOver(null);
    setSubMenuClick(null);
    setSubMenuClickList(null);
  }
  function setSubMenu(menu, toggle) {
    setSubMenuList({ 'mnuNum': Object.keys(menuList).find(key => key === menu.mnuNum), 'toggle': toggle });
  }
  function overSubMenu(menu, toggle) {
    setSubMenuOver({ 'mnuNum': menu.mnuNum, 'toggle': toggle });
  }
  function clickSubMenu(menu, toggle) {
    setSubMenuClick({ 'mnuNum': menu.mnuNum, 'toggle': toggle });
    setSubMenuClickList({ 'mnuNum': menu.prtMnuNum });
    history.push('/' + menu.mnuUrl);
  }

  function SubMenu(props) {
    return (
      <div className="tabsArea">
        <div className='tabs'>
          <ul>
            {props.menuList && props.subMenuList &&
              props.menuList[props.subMenuList.mnuNum].map(
                (menu) =>
                  <li onClick={() => { clickSubMenu(menu, true) }}
                    onMouseEnter={() => { overSubMenu(menu, true) }}
                    onMouseLeave={() => { overSubMenu(menu, false) }}
                    className={(props.subMenuOver && menu.mnuNum === props.subMenuOver['mnuNum'] && props.subMenuOver['toggle'])
                      || (props.subMenuClick && menu.mnuNum === props.subMenuClick['mnuNum'] && props.subMenuClick['toggle'])
                      ? "on"
                      : ""}
                    key={menu.mnuNum} >
                    <a>{menu.mnuNm}</a>
                  </li>
              )
            }
          </ul>
          {
            (props.subMenuClick === null || props.subMenuClick.toggle === false)
              ? <div onMouseEnter={() => { setSubMenuList({ menu: null, toggle: false }); overSubMenu({ menu: null, toggle: false }) }} className='headerOut'></div>
              : props.subMenuClickList && props.subMenuClick.toggle === true
                ? <div onMouseEnter={() => { subMenuClickList && setSubMenu(subMenuClickList, true) }} className='headerOut'></div>
                : null
          }
        </div>
      </div>
    )
  }


}

export default Header;