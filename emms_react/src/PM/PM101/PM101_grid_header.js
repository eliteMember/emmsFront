/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { useSelector } from 'react-redux';

function PM101GridHeader(props) {
    const [prjList, setPrjList] = useState();
    const [searchEvent, setSearchEvent] = useState(null);

    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        axios.post('/api/pm101/getPrjList', { 'mhr': "MHR", 'timNum': userInfo.timNum })
            .then((rs) => {
                if (rs.data.length <= 0) {
                    const errMsg = "null"
                    throw errMsg;
                }
                updatePrjList(rs.data);
                handleChange(rs.data[0]);
            }).catch((e) => {
                if (e === "null") {
                    alert('조회 할 프로젝트가 없습니다.');
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleChange(val) {
        if (typeof (val) !== "object") val = JSON.parse(val);
        props.setGridData(null);
        props.setSelectPrj(val);
        props.setPrjStartYm(val.prjStartYm);
        props.setPrjEndYm(val.prjEndYm);
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
        let result = str;
        
        if (typeof (str) !== 'object') {
            const year = str.substring(0, 4);
            const month = str.substring(4);
            result = new Date(year + "-" + month + "-01");
        }

        return result;
    }

    function fnDate2Str(date) {
        const dt = new Date(date);
        let result;
        result = dt.getFullYear() + ("0" + (dt.getMonth() + 1)).slice(-2);

        return result;
    }

    function checkDate(stDate, endDate) {
        let st = fnStr2Date(stDate);
        let end = fnStr2Date(endDate);
        if (st > end) {
            alert("잘못 된 기간입니다.");
            return false;
        }
        return true;
    }

    function setStartYm(date){
            
        props.setPrjStartYm(date);

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
                                        <DatePicker selected={props.prjStartYm && fnStr2Date(props.prjStartYm)} onChange={(date) => checkDate(date, props.prjEndYm) ? setStartYm(fnDate2Str(date)) : null}
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
                                        <DatePicker selected={props.prjEndYm && fnStr2Date(props.prjEndYm)} onChange={(date) => checkDate(props.prjStartYm, date) ? props.setPrjEndYm(fnDate2Str(date)) : null}
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