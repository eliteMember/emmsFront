/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './BottomSlidePop.css';
import {ACT_BOTTOM_SLIDE_POP} from '../reducers/bottomSlidePop';
import { useDispatch, useSelector } from "react-redux";

function BottomSlidePop(props) {

  const bottomUpToggle = useSelector(state => state.bottomSlidePop)

  const dispatch = useDispatch();

  function  fnBottomSlideToggle(data){
    dispatch(ACT_BOTTOM_SLIDE_POP(data))
  }

  return (
    // <div className={"BSPContainer " + slideToggle}>
    //   <button type="button" className="BSP_button"
    //     onClick={() => { setSlideToggle(slideToggle === "DOWN" ? "UP" : "DOWN") }}>{slideToggle === "UP" ? "▼" : "▲"}</button>
    //   <div className="BSP">
    //     this is BottomSlidePop
    //   </div>
    // </div>

    <>
      {props.toggleBtn&&props.toggleBtn === true? <button type="button" className={"bottomupToggleBtn " + bottomUpToggle}
        onClick={() => { bottomUpToggle === "DOWN" ?fnBottomSlideToggle("UP") : fnBottomSlideToggle("DOWN") }}>{bottomUpToggle === "UP" ? "▼" : "▲"}</button>
        : ""}
      <div className={"dimmed " + bottomUpToggle}></div>
      <div className={"bottomup " + bottomUpToggle}>
        <div className="bottomupTitle">
          <h2>사용자 신규등록</h2>
        </div>
        <div className="bottomupCont">
          <div className="inner">
            {props.contents}
          </div>
        </div>
        <a onClick={() => { fnBottomSlideToggle("DOWN") }} className="bottomupClose">창닫기</a>
      </div>
    </>
  )
}

export default BottomSlidePop;