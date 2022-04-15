import React, { useEffect, useState } from "react";
import axios from 'axios';

function ProjectListSelectOption(props) {

  const [ProjectList, ProjectListModify] = useState([]);

  useEffect(() => {
    axios.get('/api/cmmn/listProject').then(function (res) {
      ProjectListModify(res.data.list);
    })
  }, []);

  return (
    <>
      {
        ProjectList.map((data, i)=>{
          return <option key={i} value={data.prjNum} >{data.prjNm}</option>
        })
      }
    </>
  )
  
}

export default ProjectListSelectOption;