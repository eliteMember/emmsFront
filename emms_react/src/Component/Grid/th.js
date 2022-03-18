import React from "react";
function Th(props) {
  return (
    props.header.map(
      (headerTxt,i) => <th key={i}>{headerTxt}</th>)
  )
}
export default Th;