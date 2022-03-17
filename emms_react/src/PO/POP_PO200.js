import { React, useState, useEffect } from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import './POP_PO200.css';

import Modal from 'react-modal';


function POP_PO200(props){
  
  console.log( props );
  const { open, close, header } = props;
  console.log( open );

  useEffect(() => {
    
  });

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              여기 입니다.
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    )
}


export default POP_PO200;