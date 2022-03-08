/* eslint-disable jsx-a11y/anchor-is-valid */
import './Header.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { ACT_USER_INFO_EXPIRE } from "../reducers/userInfo";


function Header(props) {
  const dispatch = useDispatch();

  const setLogout = () => {
    axios.get('/api/logout')
      .then(() => {
        dispatch(ACT_USER_INFO_EXPIRE());
    props.isLoginChange(false);
      }).catch(() => {
        alert("로그아웃 시도 중 오류가 발생하였습니다.");
      })
  };

  let [menuList, setMenuList] = useState(null);

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
    <div>
      <ul className="nav">
        <li><Link to="/MAIN" className="home">정예멤버</Link></li>
        {menuList
          && menuList.parent.map(
            (menu) =>
              <li className="dropdown" key={menu.mnuNum}>
                <NavBar menu={menu}></NavBar>
                <NavDrop prtMnuNum={menu.mnuNum}></NavDrop>
              </li>
          )
        }
        <li className="right">{userInfo.usrName}<p> 님</p></li>
        <div className="vl1"></div>
        <li><Link to="/myInfo" className="myInfo">사용자관리</Link></li>
        <div className="vl2"></div>
        <li><a className="logOut" onClick={() => setLogout()}>로그아웃</a></li>
      </ul>
    </div>
  )

  function NavBar(props) {
    return (<Link to="" className="dropbtn">{props.menu.mnuNm}</Link>);
  }


  function NavDrop(props) {
    return (
      <div className="dropdown-content">
        {
          menuList[props.prtMnuNum].map(
            (menu) => <Link className="menu" to={"/" + menu.mnuUrl} key={menu.mnuNum}>{menu.mnuNm}</Link>
          )
        }
      </div>
    );
  }
}

export default Header;