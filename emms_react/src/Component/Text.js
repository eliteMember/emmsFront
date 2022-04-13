import React, { useState } from 'react';



function Text(props) {

  const [inputVal,setInputVal] = useState(props.value);
  
  return (
    <>
      <input type='text' id={props.id} name={props.name} onChange={(e) => { setInputVal(e.target.value) }} onBlur={props.setValue(inputVal)} />
    </>
  )
}

export default Text;