import React from "react";
import "./grid.css";
import Th from "./th";
import Tr from "./tr";

function Grid(props) {

  let style = [];
  let bodyStyle = null;
  let bodyCellStyle = null;

  if(props.style.body){
    style = props.style.body.split(",");
  }


  return (
    <div className="gridUtil">
      <div className="gridWrap mt10">
        <div className={props.type?props.type:'tb02'}>
          <table>
            <thead>
              <tr>
                <Th header={props.data.header}/>
              </tr>
            </thead>
            <tbody>
              <Tr body={props.data.body}/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Grid;