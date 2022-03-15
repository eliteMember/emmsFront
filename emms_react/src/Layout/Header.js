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
  const { userInfo } = useSelector(state => state.userInfo);

  useEffect(() => {
    axios.get('/api/menu/getList')
      .then((rs) => {
        setMenuList(rs.data);
      }).catch(() => {
        setMenuList("메뉴 호출 오류");
      })
  }, [userInfo])

  function setSubMenu(menu){
    setSubMenuList(Object.keys(menuList).find(key => key === menu.mnuNum));
  }
  function overSubMenu(menu,toggle){
    setSubMenuOver({'mnuNum':menu.mnuNum, 'toggle':toggle});
  }
  function clickSubMenu(menu,toggle){
    setSubMenuClick({'mnuNum':menu.mnuNum, 'toggle':toggle});
    history.push('/' + menu.mnuUrl);
  }

  return (
    <div className="subPage">
      <div className="wrapper">

        <div className="header blue">
          <div className="inner">

            <h1 className="logo"><a onClick={() => history.push('/MAIN')}><img src={require('../imgs/logo_02.png')} alt="회사로고" /><span>정예맴버 프로젝트관리시스템</span></a></h1>

            <nav className="gnbWrap">
              <ul>
                {menuList
                  && menuList.parent.map(
                    (menu) =>
                      <li key={menu.mnuNum}
                        onMouseOver={() => { setSubMenu(menu) }}>
                        <a onClick={() => history.push('/' + menu.mnuUrl)}><i className={"iconGnb " + menu.mnuNum}></i>{menu.mnuNm}</a>
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
          <div className="tabsArea">
            <div className='tabs'>
              <ul>
                {menuList && subMenuList &&
                  menuList[subMenuList].map(
                    (menu) =>
                      <li id={menu.mnuNum} 
                        onClick={() => {clickSubMenu(menu,true)}} 
                        onMouseOver={() => { overSubMenu(menu,true) }}
                        onMouseOut={() => { overSubMenu(menu,false) }}
                        className={subMenuOver && menu.mnuNum === subMenuOver['mnuNum'] && subMenuOver['toggle']?"on":""}
                        key={menu.mnuNum} >
                        <a>{menu.mnuNm}</a>
                      </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header;