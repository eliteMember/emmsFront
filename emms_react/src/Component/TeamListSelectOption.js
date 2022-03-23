import React, { useEffect, useState } from "react";
import axios from 'axios';

function TeamListSelectOption(props) {

  const [teamList, teamListModify] = useState([]);

  useEffect(() => {
    axios.get('/api/cmmn/listTeam').then(function (res) {
      teamListModify(res.data.list);
    })
  }, []);

  return (
    <>
      {
        teamList.map((data, i)=>{
          return <option key={i} value={data.timNum} >{data.timNm}</option>
        })
      }
    </>
  )
  
}

export default TeamListSelectOption;