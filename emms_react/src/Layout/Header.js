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
    console.log(Object.keys(menuList));
    console.log(Object.keys(menuList).find(key => key === menu.mnuNm));
    // setSubMenuList(menuList.find(mnu => mnu === menu.mnuNum));
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
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div >
  )

  function NavDrop(props) {
    return (
      <>
        {menuList
          &&
          menuList[props.prtMnuNum].map(
            (menu) =>
              <li id={menu.prtMnuNum} onClick={() => history.push('/' + menu.mnuUrl)} key={menu.mnuNum}>
                <a>{menu.mnuNm}</a>
              </li>
          )
        }
      </>
    );
  }
}

export default Header;