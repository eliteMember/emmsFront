/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function PM101GridBody(props) {

    const [periodMonth, setPeriodMonth] = useState(1)
    const { cmmnCode } = useSelector(state => state.cmmnCode);

    let stYear = props.prjStartYm && props.prjStartYm.substring(0, 4);
    let endYear = props.prjEndYm && props.prjEndYm.substring(0, 4);
    let stMonth = props.prjStartYm && props.prjStartYm.substring(4);
    let endMonth = props.prjEndYm && props.prjEndYm.substring(4);

    useEffect(() => {
        if (props.gridData === null || props.gridData === undefined) {
            props.setGridData(newWrkMcNm)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    console.log(rs.data)
                    rs.data && props.setGridData(rs.data);
                }).catch((e) => {
                    if (e === "null") {
                        alert('조회 할 프로젝트가 없습니다.');
                    }
                })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectPrj])

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
    const newWrkScNm = {
        wrkScNm: '',        //업무중분류명
        mem: [newMem]       //인력
    }
    //      ↓
    const newWrkMcNm = {
        wrkMcNm: '',        //업무대분류명
        wrkSc: [newWrkScNm] //중분류
    }

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
                        const year = Number(stMonth) + index > 12 ? Number(stYear.substring(2)) + 1 : stYear.substring(2);
                        const month = Number(stMonth) + index > 12 ? Number(stMonth) + index - 12 : Number(stMonth) + index;
                        return (<th scope="col" key={index}>M{index + 1}<br />({year}.{month})</th>)
                    })
                }
                <th scope="col">합계</th>
                <th scope="col">비고</th>
            </tr>
        )
    }

    function Row() {          //행 컴포넌트
        return (
            <>
                {props.selectPrj && props.gridData && props.gridData[0] &&
                    props.gridData.map((data1, i) => {
                        return (
                            data1.wrkSc.map((data2, j) => {
                                return (
                                    data2.mem.map((data3, k) => {
                                        return (
                                            <>
                                                <tr key={data1.wrkMcNm + data2.wrkScNm + data3.memName}>
                                                    {k === 0 && j === 0 &&
                                                        //대분류
                                                        <td className="txtC mrg" rowSpan={(data1.wrkSc.length) + 1}>
                                                            {data1.wrkMcNm}
                                                            <div className="mt10">
                                                                <button type="button" className="btnS6 rad50 borderC2"><i className="ic_rowPlusBlue"></i></button>
                                                                <button type="button" className="btnS7 rad50 borderC2"><i className="ic_rowMinusRed"></i></button>
                                                            </div>
                                                        </td>
                                                    }
                                                    {k === 0 &&
                                                        //중분류
                                                        <td className="" rowSpan={(data2.mem.length)}>
                                                            <div className="txtL">
                                                                <span>{data2.wrkScNm}</span>
                                                            </div>
                                                            <div className="txtR">
                                                                <button type="button" className="btnS6 rad50 borderC2"><i className="ic_rowPlusBlue"></i></button>
                                                                <button type="button" className="btnS7 rad50 borderC2"><i className="ic_rowMinusRed"></i></button>
                                                            </div>
                                                        </td>
                                                    }

                                                    {/* 소분류(인력) */}
                                                    <td className="">
                                                        <div className="txtL">
                                                            <span>{data3.rolNm}</span>
                                                        </div>
                                                        <div className="txtR">
                                                            <button type="button" className="btnS6 rad50 borderC2 "><i className="ic_rowPlusBlue"></i></button>
                                                            <button type="button" className="btnS7 rad50 borderC2 "><i className="ic_rowMinusRed"></i></button>
                                                        </div>
                                                    </td>
                                                    {/* 이름 */}
                                                    <td className="txtC">
                                                        {data3.memName}
                                                    </td>
                                                    {/* 등급 */}
                                                    <td className="txtC">
                                                        {cmmnCode.RNK_CD && cmmnCode.RNK_CD.map(
                                                            (code, l) => code.cdVal === data3.memRnkCd ?
                                                                <div key={l}>{code.cdNm}</div> : null)}
                                                    </td>
                                                    {/* 투입공수 */}
                                                    {
                                                        [...Array(periodMonth)].map((n, index) => {
                                                            const year = Number(stMonth) + index > 12 ? Number(stYear.substring(2)) + 1 : stYear.substring(2);
                                                            const month = Number(stMonth) + index > 12 ? Number(stMonth) + index - 12 : Number(stMonth) + index;
                                                            let drawable = true;

                                                            if (data3.mhr.length > 0) {
                                                                return (
                                                                    data3.mhr.map((data4) => {
                                                                        if (year + "" + month === data4.mhrYm) {
                                                                            drawable = false;
                                                                            return (
                                                                                <td className="txtC" key={data3.memName + data4.mhrYm}>
                                                                                    {data4.mmPurQty}
                                                                                </td>
                                                                            )
                                                                        }
                                                                        else if (drawable) {
                                                                            return (
                                                                                <td className="txtC" key={data3.memName + data4.mhrYm}></td>
                                                                            )
                                                                        } else return (null)
                                                                    }
                                                                    )
                                                                )
                                                            } else {
                                                                return (
                                                                    <td className="txtC" key={data3.memName + index}></td>
                                                                )
                                                            }
                                                        }
                                                        )
                                                    }
                                                    <td className="txtR">합계</td>
                                                    <td className="txtL">비고</td>
                                                </tr>

                                            </>
                                        )
                                    }
                                    )
                                )
                            }
                            )
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
                    <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowUp"></i><span>위로</span></button>
                    <button type="button" className="btn btn02 rad50 borderC2"><i className="ic_rowDown"></i><span>아래로</span></button>
                    <button type="button" className="btn btn02 rad50 borderC2"><span>복사</span></button>
                    <button type="button" className="btn btn02 rad50 borderC2"><span>붙여넣기</span></button>
                    <button type="button" className="btn05"><i className="ic_excel"></i><span>다운로드</span></button>
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
            <div className="tb02 mt10">
                <table>
                    <caption>실투입공수관리</caption>
                    <colgroup>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                    </colgroup>
                    <tbody>
                        <tr className="tfoot">
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR"></td>
                            <td className="txtR">189,072,917</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PM101GridBody;