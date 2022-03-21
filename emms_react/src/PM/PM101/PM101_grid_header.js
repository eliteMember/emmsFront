/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function PM101GridHeader(props) {
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
                                        <select className="mr20">
                                            <option>미래에셋생명 비대면업무확대</option>
                                            <option>NH차세대지방재정 구축</option>
                                        </select>
                                    </td>
                                    <th scope="row"><span className="tit">프로젝트 기간</span></th>
                                    <td className="txtL" colSpan="3">
                                        <span className="datepickerBox"><input type="text" placeholder="2021-08-15" /></span>
                                        ~
                                        <span className="datepickerBox"><input type="text" placeholder="2022-11-15" /></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="fr">
                    <button type="button" className="btn01"><i className="ic_search"></i><span>조회</span></button>
                </div>
            </div>
        </>
    )
}

export default PM101GridHeader;