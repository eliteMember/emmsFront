import React from "react";
import Td from "./td";

function Tr(props) {
  return (
    props.body.map(
      (bodyTxt, i) => <tr key={i}><Td  data={bodyTxt}/></tr>)
  )
}
export default Tr;