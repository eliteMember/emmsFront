import { React, useState, useEffect } from 'react';
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import './POP_PO100.css';



function POP_PO100(props){
  
  const history = useHistory();

  return (
        <div className='POP_PO100_DIV'>
          <h1>팀 조회</h1>
          <form id="popTeamFrm" name="popTeamFrm">
            


            <button type="button">조회</button>
          </form>
        </div>
    )
}


export default POP_PO100;