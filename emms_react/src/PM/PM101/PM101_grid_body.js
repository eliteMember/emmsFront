/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BottomSlidePop from '../../Component/BottomSlidePop';
import * as common from '../../Common/common';

function PM101GridBody(props) {

    const { cmmnCode } = useSelector(state => state.cmmnCode);

    const [periodMonth, setPeriodMonth] = useState(1)
    const [selectRow, setSelectRow] = useState({ row: [], data: "" });
    const [copyRow, setCopyRow] = useState();

    let stYear = props.prjStartYm && props.prjStartYm.substring(0, 4);
    let endYear = props.prjEndYm && props.prjEndYm.substring(0, 4);
    let stMonth = props.prjStartYm && props.prjStartYm.substring(4);
    let endMonth = props.prjEndYm && props.prjEndYm.substring(4);

    /////////////////////////////////////////////////////////////////////////
    // 그리드 데이터 초기값
    /////////////////////////////////////////////////////////////////////////

    const newMhr = {
        mhrYm: '',      //투입년월
        mmPurQty: ''    //월매입수량
    }
    //      ↓
    const newMem = {
        rolNm: '',          //역할명
        memName: '',        //인력이름
        memRnkCd: '',       //인력등급
        depStartDt: '',     //투입시작일자
        depEndDt: '',       //투입종료일자
        mhr: [newMhr],      //월투입공수
        qtyTotal: 0,        //투입수량합계
        rmk: ''             //비고
    }
    //      ↓
    const newWrkSc = {
        wrkScNm: '',        //업무중분류명
        mem: [newMem]       //인력
    }
    //      ↓
    const newWrkMc = {
        wrkMcNm: '',        //업무대분류명
        wrkSc: [newWrkSc]   //중분류
    }


    //그리드데이터 초기화
    useEffect(() => {
        if (props.gridData === null || props.gridData === undefined || props.gridData.length <= 0) {
            props.setGridData(newWrkMc)
            setSelectRow({ row: "", data: "" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //프로젝트 기간을 계산하여 state에 저장
    useEffect(() => {
        if (props.prjStartYm !== undefined && props.prjEndYm !== undefined) {
            let period = 0;

            if (endYear - stYear > 0) {
                period = Number(endMonth) + ((12 * (endYear - stYear - 1)) + (12 - stMonth))
            } else {
                period = Number(endMonth) - Number(stMonth)
            }

            period += 1;

            setPeriodMonth(period);
        }
    }, [props.prjStartYm, props.prjEndYm, endYear, stYear, endMonth, stMonth])

    useEffect(() => {
        props.selectPrj &&
            axios.post('/api/pm101/getMhrList', { 'prjNum': props.selectPrj.prjNum })
                .then((rs) => {
                    if(rs.data.length > 0){
                        props.setGridData(rs.data)
                    }else{
                        props.setGridData([newWrkMc])
                        setSelectRow({ row: "", data: "" });
                    }
                }).catch((e) => {
                    if (e === "null") {
                        alert('조회 할 프로젝트가 없습니다.');
                    }
                })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectPrj])

    /////////////////////////////////////////////////////////////////////////
    // 그리드 행 추가 삭제 수정 관련함수
    /////////////////////////////////////////////////////////////////////////

    //인력 추가
    function addMem(e, mc, sc, mem) { //mc : 대분류, sc : 중분류, mem : 인력
        e.preventDefault();

        let gridData = [...props.gridData];
        gridData[mc].wrkSc[sc].mem.splice(mem + 1, 0, newMem);
        props.setGridData(gridData);
    }
    //인력 삭제
    function removeMem(e, mc, sc, mem) { //mc : 대분류, sc : 중분류, mem : 인력
        e.preventDefault();

        let gridData = [...props.gridData];

        if (gridData[mc].wrkSc[sc].mem.length > 1) {
            gridData[mc].wrkSc[sc].mem.splice(mem, 1);
        } else {
            gridData[mc].wrkSc[sc].mem[mem] = newMem;
        }
        props.setGridData(gridData);
    }

    //중분류 추가
    function addSc(e, mc, sc) { //mc : 대분류, sc : 중분류, mem : 인력
        e.preventDefault();

        let gridData = [...props.gridData];
        gridData[mc].wrkSc.splice(sc + 1, 0, newWrkSc);
        props.setGridData(gridData);
    }
    //중분류 삭제
    function removeSc(e, mc, sc) { //mc : 대분류, sc : 중분류, mem : 인력
        e.preventDefault();

        let gridData = [...props.gridData];

        if (gridData[mc].wrkSc.length > 1) {
            gridData[mc].wrkSc.splice(sc, 1);
        } else {
            gridData[mc].wrkSc[sc] = newWrkSc;
        }
        props.setGridData(gridData);
    }

    //대분류 추가
    function addMc(e, mc) { //mc : 대분류, sc : 중분류, mem : 인력
        e.preventDefault();

        let gridData = [...props.gridData];
        gridData.splice(mc + 1, 0, newWrkMc);
        props.setGridData(gridData);
    }
    //대분류 삭제
    function removeMc(e, mc) { //mc : 대분류, sc : 중분류, mem : 인력
        e.preventDefault();

        let gridData = [...props.gridData];

        if (gridData.length > 1) {
            gridData.splice(mc, 1);
        } else {
            gridData[mc] = newWrkMc;
        }
        props.setGridData(gridData);
    }

    //행 클릭 이벤트
    function clickRow(e, i, data) {
        e.preventDefault();
        setSelectRow({ row: i, data: data })
    }

    //행 위로 버튼 이벤트
    function rowUp(e) {
        e.preventDefault();

        let grdData = props.gridData;

        if(Number(selectRow.row) > 0){
            let temp = props.gridData;
        }

    }

    //행 복사 이벤트
    function copy(e) {
        e.preventDefault();
        if(common.isEmpty(selectRow.data)){
            alert("복사 할 수 없는 데이터입니다.");
        }else{
            setCopyRow({row:selectRow.row, data:selectRow.data})
        }
    }

    //행 붙여넣기 이벤트
    function paste(e) {
        e.preventDefault();
        let copyClass = copyRow.row.length === 1 ? "mc"
            : copyRow.row.length === 2 ? "sc"
                : copyRow.row.length === 3 ? "mem"
                    : ""

        let grdData = props.gridData;
        
        if (copyClass === "mc") {
            grdData[selectRow.row[0]] = copyRow.data;
            selectRow.data = copyRow.data;
        }
        else if (copyClass === "sc") {
            grdData[selectRow.row[0]].wrkSc[selectRow.row[1]] = copyRow.data;
            selectRow.data = copyRow.data;
        }
        else if (copyClass === "mem") {
            grdData[selectRow.row[0]].wrkSc[selectRow.row[1]].mem[selectRow.row[2]] = copyRow.data;
            selectRow.data = copyRow.data;
        }
        else return false;

        props.setGridData(grdData);

    }

    //현재 선택된 행의 위치 파악
    function chkRowPosition() {
        let selectClass = selectRow.row.length === 1 ? "mc"
            : selectRow.row.length === 2 ? "sc"
                : selectRow.row.length === 3 ? "mem"
                    : ""
        let curPosition = selectRow.row;
        let grdData = props.gridData;

        if (grdData != null && grdData !== undefined) {
            if (selectClass === "mc") {
                if(grdData.length === 1) curPosition = 0;
                else if (curPosition[0] === 0) curPosition = "top";
                else if (curPosition[0] === grdData.length - 1) curPosition = "bottom";
                else curPosition = "middle";
            }
            else if (selectClass === "sc") {
                if(grdData.length === 1 && grdData[0].wrkSc.length === 1) curPosition = 0;
                else if (common.isSame(curPosition,[0,0])) curPosition = "top";
                else if (curPosition[0] === grdData.length - 1
                    && curPosition[1] === grdData[grdData.length - 1].wrkSc.length - 1) curPosition = "bottom";
                else curPosition = "middle";
            }
            else if (selectClass === "mem") {
                if(grdData.length === 1 && grdData[0].wrkSc.length === 1 && grdData[0].wrkSc[0].mem.length === 1) curPosition = 0;
                else if (common.isSame(curPosition,[0,0,0])) curPosition = "top";
                else if (curPosition[0] === grdData.length - 1
                    && curPosition[1] === grdData[grdData.length - 1].wrkSc.length - 1
                    && curPosition[2] === grdData[grdData.length - 1].wrkSc[grdData[grdData.length - 1].wrkSc.length - 1].mem.length - 1) curPosition = "bottom";
                else curPosition = "middle";
            }
            else curPosition = 0;
        }
        return curPosition;
    }
    /////////////////////////////////////////////////////////////////////////
    // 그리드 컴포넌트
    /////////////////////////////////////////////////////////////////////////
    function Mc() {         //그리드 헤더 컴포넌트
        return (
            <tr>
                <th scope="col">업무구분</th>
                <th scope="col">하위업무구분</th>
                <th scope="col">역할</th>
                <th scope="col">이름</th>
                <th scope="col">등급</th>
                {
                    stYear &&
                    [...Array(periodMonth)].map((n, index) => {
                        const period = Number(stMonth) + index;
                        const year = Number(stYear.substring(2)) + Math.floor((period - 1) / 12)
                        const month = ((period - 1) % 12) + 1
                        return (<th scope="col" key={index}>M{index + 1}<br />({year}.{month})</th>)
                    })
                }
                <th scope="col">합계</th>
                <th scope="col">비고</th>
            </tr>
        )
    }

    function Row() {    //행 컴포넌트
        let total = 0;  //전체 공수합계
        let colTotal = Array.from({ length: periodMonth }, () => 0); //전체 공수 월별합계
        return (
            <>
                {props.selectPrj && props.gridData && props.gridData[0] &&
                    props.gridData.map((data1, i) => {
                        let wrkScSpan = 0; //대분류 rowspan
                        let mcTotal = 0;   //대분류 공수 합계
                        let mcColTotal = Array.from({ length: periodMonth }, () => 0); //대분류 공수 월별합계
                        if (data1.wrkSc.length > 1) wrkScSpan += 1;

                        // 대분류 rowspan 값 계산을 위한 MAP
                        data1.wrkSc.map((data2) => {
                            wrkScSpan += data2.mem.length;
                            if (data2.mem.length > 1) wrkScSpan += 1;
                            return wrkScSpan
                        })
                        return (
                            <React.Fragment key={data1.wrkMcNm + i}>{
                                data1.wrkSc.map((data2, j) => {
                                    let subTotal = 0; //중분류 공수 합계
                                    let subColTotal = Array.from({ length: periodMonth }, () => 0); //인력 공수 월별합계
                                    return (
                                        data2.mem.map((data3, k) => {
                                            let memTotal = 0; //인력 공수 합계
                                            return (
                                                <React.Fragment key={data1.wrkMcNm + data2.wrkScNm + data3.memName + k}>
                                                    <tr>
                                                        {k === 0 && j === 0 &&
                                                            //대분류
                                                            <td className={"txtC mrg noWrap" + (selectRow.row === ""+i ? " click" : "")} rowSpan={wrkScSpan} onClick={(e) => clickRow(e, [i], data1)}>
                                                                <div className="txtC">
                                                                    <span>{data1.wrkMcNm}</span>
                                                                </div>
                                                                <div className="txtC">
                                                                    <button type="button" className="btnS6 rad50 borderC2" onClick={(e) => { addMc(e, i) }}><i className="ic_rowPlusBlue"></i></button>
                                                                    <button type="button" className="btnS7 rad50 borderC2" onClick={(e) => { removeMc(e, i) }}><i className="ic_rowMinusRed"></i></button>
                                                                </div>
                                                            </td>
                                                        }

                                                        {k === 0 &&
                                                            //중분류
                                                            <td className={"noWrap" + (selectRow.row === "" + i + j ? " click" : "")} rowSpan={data2.mem.length > 1 ? (data2.mem.length) + 1 : (data2.mem.length)} onClick={(e) => clickRow(e, [i,j], data2)}>
                                                                <div className="txtC">
                                                                    <span>{data2.wrkScNm}</span>
                                                                </div>
                                                                <div className="txtC">
                                                                    <button type="button" className="btnS6 rad50 borderC2" onClick={(e) => { addSc(e, i, j) }}><i className="ic_rowPlusBlue"></i></button>
                                                                    <button type="button" className="btnS7 rad50 borderC2" onClick={(e) => { removeSc(e, i, j) }}><i className="ic_rowMinusRed"></i></button>
                                                                </div>
                                                            </td>
                                                        }

                                                        {/* 소분류(인력) */}
                                                        <td className={"noWrap" + (selectRow.row === "" + i + j + k ? " click" : "")} onClick={(e) => clickRow(e, [i,j,k], data3)}>
                                                            <div className="txtC">
                                                                <span>{data3.rolNm}</span>
                                                            </div>
                                                            <div className="txtC">
                                                                <button type="button" className="btnS6 rad50 borderC2 " onClick={(e) => { addMem(e, i, j, k) }}><i className="ic_rowPlusBlue"></i></button>
                                                                <button type="button" className="btnS7 rad50 borderC2 " onClick={(e) => { removeMem(e, i, j, k) }}><i className="ic_rowMinusRed"></i></button>
                                                            </div>
                                                        </td>
                                                        {/* 이름 */}
                                                        <td className={"txtC noWrap" + (selectRow.row === "" + i + j + k ? " click" : "")} onClick={(e) => clickRow(e,[i,j,k], data3)}>
                                                            {data3.memName}
                                                        </td>
                                                        {/* 등급 */}
                                                        <td className={"txtC" + (selectRow.row === "" + i + j + k ? " click" : "")} onClick={(e) => clickRow(e,[i,j,k], data3)}>
                                                            {cmmnCode.RNK_CD && cmmnCode.RNK_CD.map(
                                                                (code, l) => code.cdVal === data3.memRnkCd ?
                                                                    <div key={code + l}>{code.cdNm}</div> : null)}
                                                        </td>
                                                        {/* 투입공수 */}
                                                        {
                                                            [...Array(periodMonth)].map((n, index) => {
                                                                const period = Number(stMonth) + index;
                                                                const year = Number(stYear.substring(2)) + Math.floor((period - 1) / 12)
                                                                const month = ((period - 1) % 12) + 1
                                                                let drawable = true;

                                                                if (data3.mhr.length > 0) {
                                                                    return (
                                                                        data3.mhr.map((data4, idx) => {
                                                                            if (stYear.substring(0, 2) + year + ("0" + month).substring(-2) === data4.mhrYm) {

                                                                                total += data4.mmPurQty; //전체 공수합계
                                                                                mcTotal += data4.mmPurQty; //대분류 공수합계
                                                                                subTotal += data4.mmPurQty; //중분류 공수합계
                                                                                memTotal += data4.mmPurQty; //인력 공수합계

                                                                                colTotal[index] += data4.mmPurQty;  //전체 공수 월별합계
                                                                                mcColTotal[index] += data4.mmPurQty; //대분류 공수 월별합계
                                                                                subColTotal[index] += data4.mmPurQty; //중분류 공수 월별합계

                                                                                drawable = false;
                                                                                return (
                                                                                    <td className={"txtC" + (selectRow.row === [i,j,k] ? " click" : "")} onClick={(e) => clickRow(e, [i,j,k], data3)} key={data3.memName + data4.mhrYm + idx}>
                                                                                        {data4.mmPurQty}
                                                                                    </td>
                                                                                )
                                                                            }
                                                                            else if (drawable && idx === data3.mhr.length - 1) {
                                                                                return (
                                                                                    <td className={"txtC" + (selectRow.row === [i,j,k] ? " click" : "")} onClick={(e) => clickRow(e, [i,j,k], data3)} key={data3.memName + data4.mhrYm + idx}></td>
                                                                                )
                                                                            } else return true
                                                                        }
                                                                        )
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <td className={"txtC" + (selectRow.row === [i,j,k] ? " click" : "")} onClick={(e) => clickRow(e, "" + i + j + k, data3)} key={data3.memName + index}></td>
                                                                    )
                                                                }
                                                            }
                                                            )
                                                        }

                                                        {/* 투입공수 합계 */}
                                                        <td className={"txtR" + (selectRow.row === [i,j,k]? " click" : "")} onClick={(e) => clickRow(e, [i,j,k], data3)}>{memTotal}</td>

                                                        {/* 비고 */}
                                                        <td className={"txtL" + (selectRow.row === [i,j,k] ? " click" : "")} onClick={(e) => clickRow(e, [i,j,k], data3)}>{data3.rmk}</td>
                                                    </tr>

                                                    {/* 중분류 소계 */}
                                                    {data2.mem.length > 1 && k === data2.mem.length - 1 &&
                                                        <tr className="tfoot">
                                                            <td className="txtC" colSpan="3">소계</td>
                                                            {[...Array(periodMonth)].map((n, index) =>
                                                                <td className="txtC" key={"memSum" + index}>{subColTotal[index]}</td>)}
                                                            <td className="txtR">{subTotal}</td>
                                                            <td className="txtR"></td>
                                                        </tr>
                                                    }
                                                    {/* 대분류 소계 */}
                                                    {data1.wrkSc.length > 1 && j === data1.wrkSc.length - 1 && k === data2.mem.length - 1 &&
                                                        <tr className="tfoot">
                                                            <td className="txtC" colSpan="4">소계</td>
                                                            {[...Array(periodMonth)].map((n, index) =>
                                                                <td className="txtC" key={"scSum" + index}>{mcColTotal[index]}</td>)}
                                                            <td className="txtR">{mcTotal}</td>
                                                            <td className="txtR"></td>
                                                        </tr>
                                                    }

                                                </React.Fragment>
                                            )
                                        }
                                        )
                                    )
                                }
                                )
                            }
                                {/* 합계 */}
                                {props.gridData.length - 1 === i &&
                                    <>
                                        <tr><td className="non" colSpan={7 + periodMonth}></td></tr>
                                        <tr className="tfoot total">
                                            <td className="txtC" colSpan="5">합계</td>
                                            {[...Array(periodMonth)].map((n, index) =>
                                                <td className="txtC" key={"sum" + index}>{colTotal[index]}</td>)}
                                            <td className="txtR">{total}</td>
                                            <td className="txtR"></td>
                                        </tr>
                                    </>
                                }
                            </React.Fragment>
                        )
                    }
                    )
                }
            </>
        )
    }

    return (
        <>
            {/* 그리드 상단 안내문구 및 버튼 */}
            <div className="hr20"></div>

            <div className="gridUtil">
                <div className="fl">
                    <p className="txtGuide">플러스 마이너스를 눌러 행을 추가하거나 삭제 할 수 있습니다.</p>
                </div>

                <div className="fr">
                    <button type="button" className={"btn" + (chkRowPosition() === "bottom" || chkRowPosition() === "middle" ? " btn010 " : " btn02 ") + "rad50 borderC2"} onClick={(e) => rowUp(e)}>
                        <i className="ic_rowUp"></i><span>위로</span>
                    </button>
                    <button type="button" className={"btn" + (chkRowPosition() === "top" || chkRowPosition() === "middle" ? " btn010 " : " btn02 ") + "rad50 borderC2"}>
                        <i className="ic_rowDown"></i><span>아래로</span>
                    </button>
                    <button type="button" className={"btn" + (!common.isEmpty(selectRow.row) && !common.isEmpty(selectRow.data)? " btn010 " : " btn02 ") + "rad50 borderC2"} onClick={(e) => copy(e)}>
                        <span>복사</span>
                    </button>
                    <button type="button" className={"btn" + (!common.isEmpty(selectRow.row) && !common.isEmpty(copyRow) ? " btn010 " : " btn02 ") + "rad50 borderC2"} onClick={(e) => paste(e)}>
                        <span>붙여넣기</span>
                    </button>
                    <button type="button" className="btn05">
                        <i className="ic_excel"></i><span>다운로드</span>
                    </button>
                </div>
            </div>


            {/* 그리드 */}
            <div className="gridWrap mt10">
                <div className="tb02">
                    <table>
                        <caption>실투입공수관리</caption>
                        {/* 그리드 헤더 */}
                        <thead>
                            <Mc />
                        </thead>
                        {/* 그리드 바디 */}
                        <tbody>
                            <Row />
                        </tbody>
                    </table>
                </div>
            </div>

            <BottomSlidePop contents={<></>} toggleBtn={true} title={"테스트팝업"} />
        </>
    )
}

export default PM101GridBody;