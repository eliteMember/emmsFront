/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';

function PM101GridFooter(props) {
    function saveMhr() {
        let grdData = props.gridData;

        axios.post('/api/pm101/saveMhr', grdData, props.selectPrj.prjNum)
            .then((rs) => {
                if (rs.data > 0) alert("저장되었습니다.");
            })
            .catch((rs) => {
                alert("실투입공수 저장 중 오류가 발생하였습니다.");
            })
    }

    return (
        <>
            <div className="gridUtilBottom">
                <div className="fl">
                    <div>
                        <p className="bullet01">작성을 완료하고 [등록/수정] 버튼을 클릭해야 저장됩니다.</p>
                    </div>
                </div>
                <div className="fr">
                    <button type="button" className="btn01" onClick={(e) => { saveMhr(); }}><span>등록/수정</span></button>
                </div>
            </div>
        </>
    )
}

export default PM101GridFooter;