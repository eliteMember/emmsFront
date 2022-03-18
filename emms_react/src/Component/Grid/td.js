import React from "react";
function Td(props) {
  return (
    props.data.map(
      (bodyTxt, i) =><td key={i}> {bodyTxt} </td>)
  )
}
export default Td;