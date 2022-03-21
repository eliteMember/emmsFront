/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PM101Grid from './PM101_grid';
import BottomSlidePop from '../../Component/BottomSlidePop';
import {ACT_BOTTOM_SLIDE_POP} from '../../reducers/bottomSlidePop';
function PM101(props) {
    return (
        <>
            <div className="gridUtil">
                <div className="subPage">
                    <div className="subWrap">
                        <div className="inner mt10">
                            <PM101Grid />
                        </div>
                    </div>
                </div>
            </div>
            <BottomSlidePop contents={<></>} toggleBtn={true} title={"테스트팝업"}/>
        </>

    )
}

export default PM101;