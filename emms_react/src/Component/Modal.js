import axios from 'axios';
import React from 'react';
import './Modal.css';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data, Impo } = props;

  function callAxios(data) {
    console.log("callAxios 실행");
    console.log(data);
    axios.post('/MN400/api/updateList', data)
    .then((res) =>{
      Impo(res.data);
    }).catch(()=>{
      alert("update 실패");
    })
  
    close()
};

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
          <button className="save" onClick={() =>{callAxios(data)}}>
              save
            </button>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;