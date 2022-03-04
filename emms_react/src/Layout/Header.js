/* eslint-disable jsx-a11y/anchor-is-valid */
import './Header.css';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch} from 'react-router-dom';
import axios from 'axios'


function Header(props) {
  let [menuList, setMenuList] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/menu/getList')
      .then((rs) => {
        setMenuList(rs.data);
      }).catch(() => {
        setMenuList("메뉴 호출 오류");
      })
  }, [])

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
      </ul>
    </div>
  )

  function NavBar(props) {
    return (<Link to="" className="dropbtn">{props.menu.mnuNm}</Link>);
  }

  
  function NavDrop(props) {
    console.log(menuList[props.prtMnuNum]);
    return (
      <div className="dropdown-content">
        {
          menuList[props.prtMnuNum].map(
            (menu) => <Link className="menu" to={"/"+menu.mnuUrl} key={menu.mnuNum}>{menu.mnuNm}</Link>
          )
        }
      </div>
    );
  }
}

export default Header;