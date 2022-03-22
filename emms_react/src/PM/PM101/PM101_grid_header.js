/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function PM101GridHeader(props) {
    const [prjList, setPrjList] = useState(null);
    const [prjStartYm, setPrjStartYm] = useState(null);
    const [prjEndYm, setPrjEndYm] = useState(null);
    const [searchEvent, setSearchEvent] = useState(null);

    useEffect(() => {
        searchPrj();
    }, [])

    function searchPrj() {
        axios.post('/api/pm101/getPrjList', { prjStartYm: prjStartYm, prjEndYm: prjEndYm })
            .then((rs) => {
                rs.data && updatePrjList(rs.data);
                console.log(JSON.stringify(prjList));
            }).catch(() => {
                updatePrjList("메뉴 호출 오류");
            })
    }
    function updatePrjList(data) {
        setPrjList(data);
        setSearchEvent("evt");
    }

    return (
        <>
            <div className="gridUtil">
                <div className="fl">
                    <div className="tb01">
                        <table>
                            <colgroup>
                                <col></col>
                                <col></col>
                                <col></col>
                                <col></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row"><span className="tit">프로젝트</span></th>
                                    <td className="txtL">
                                        <select className={"mr20 " + searchEvent}>
                                            {prjList && prjList.map((prj) => <option key={prj.prjNum}>{prj.prjNm}</option>)}
                                        </select>
                                    </td>
                                    <th scope="row"><span className="tit">프로젝트 기간</span></th>
                                    <td className="txtL" colSpan="3">
                                        <span className="datepickerBox"><input type="text" onChange={(event) => setPrjStartYm(event.target.value)} placeholder="2021-08-15" /></span>
                                        ~
                                        <span className="datepickerBox"><input type="text" onChange={(event) => setPrjEndYm(event.target.value)} placeholder="2022-11-15" /></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="fr">
                    <button type="button" onClick={()=>searchPrj()} className="btn01"><i className="ic_search"></i><span>조회</span></button>
                </div>
            </div>
        </>
    )
}

export default PM101GridHeader;