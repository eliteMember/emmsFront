import React from 'react';
import './Header.css';
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap';

function Header(props){
  return (
    <div className='app-header'>
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">정예멤버</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className='Nav-css'>
              <Nav className="me-auto">
              <NavDropdown title="팀관리" id="basic-nav-dropdown">
                  <NavDropdown.Item href="페이지경로">팀관리</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="프로젝트제안" id="basic-nav-dropdown">
                  <NavDropdown.Item href="페이지경로">프로젝트기본정보</NavDropdown.Item>
                  <NavDropdown.Item href="페이지경로">제안공수산정</NavDropdown.Item>
                  <NavDropdown.Item href="페이지경로">프로젝트견적</NavDropdown.Item>
                  <NavDropdown.Item href="페이지경로">투입공수산정</NavDropdown.Item>
                  <NavDropdown.Item href="페이지경로">사전원가산정</NavDropdown.Item>
                  <NavDropdown.Item href="페이지경로">사전비용계산</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="프로젝트관리" id="basic-nav-dropdown">
                  <NavDropdown.Item href="페이지경로">실투입공수관리</NavDropdown.Item>
                  <NavDropdown.Item href="페이지경로">비용처리</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="인력관리" id="basic-nav-dropdown">
                  <NavDropdown.Item href="페이지경로">인력관리</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="문서관리" id="basic-nav-dropdown">
                  <NavDropdown.Item href="페이지경로">문서관리</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
    
export default Header;