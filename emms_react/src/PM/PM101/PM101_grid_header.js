/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

function PM101GridHeader(props) {
    const [prjList, setPrjList] = useState();
    const [prjStartYm, setPrjStartYm] = useState();
    const [prjEndYm, setPrjEndYm] = useState();
    const [searchEvent, setSearchEvent] = useState(null);
    const [selectPrj, setSelectPrj] = useState(null);

    useEffect(() => {
        axios.post('/api/pm101/getPrjList', {})
            .then((rs) => {
                rs.data && updatePrjList(rs.data);
                handleChange(rs.data[0]);
            }).catch(() => {
                console.log("error");
            })
    }, [])

    function updateSelectPrj(prj) {
        setSelectPrj(prj);
    }

    function handleChange(val) {
        if(typeof(val) !== "object") val = JSON.parse(val);
        updateSelectPrj(val);
        setPrjStartYm(val.prjStartYm);
        setPrjEndYm(val.prjEndYm);
    }

    function updatePrjList(data) {
        setPrjList(data);
        selectEvt("evt");
        setTimeout(() => { selectEvt("evtEnd") }, 1);
    }

    function selectEvt(className) {
        setSearchEvent(className);
    }

    function fnStr2Date(str) {
        const year = str.substring(0, 4);
        const month = str.substring(4);
        return new Date(year + "-" + month + "-01");
    }

    function fnDate2Str(date) {
        const dt = new Date(date);
        return dt.getFullYear + ("0"+dt.getMonth).slice(-2);
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

                                    {/* PROJECT SELECTBOX */}
                                    <td className="txtL">
                                        <select className={"mr20 " + searchEvent} onChange={(e) => { handleChange(e.target.value) }}>
                                            {prjList && prjList.map((prj) => <option key={prj.prjNum} value={JSON.stringify(prj)}>{prj.prjNm}</option>)}
                                        </select>
                                    </td>
                                    <th scope="row"><span className="tit">프로젝트 기간</span></th>

                                    {/* START DATE DATEPICKER */}
                                    <td className="txtL">
                                        <DatePicker selected={prjStartYm && fnStr2Date(prjStartYm)} onChange={(date) => setPrjStartYm(date)}
                                            locale="ko"
                                            dateFormat="yyyy-MM"
                                            showMonthYearPicker
                                            className="datepickerBox"
                                        />
                                    </td>

                                    <td className="txtL">
                                        ~
                                    </td>

                                    {/* END DATE DATEPICKER */}
                                    <td className="txtL">
                                        <DatePicker selected={prjEndYm && fnStr2Date(prjEndYm)} onChange={(date) => setPrjEndYm(date)}
                                            locale="ko"
                                            dateFormat="yyyy-MM"
                                            showMonthYearPicker
                                            className="datepickerBox"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PM101GridHeader;