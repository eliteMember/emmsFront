/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PM101Grid from './PM101_grid';

function PM101(props) {
    const [prjStartYm, setPrjStartYm] = useState();
    const [prjEndYm, setPrjEndYm] = useState();
    const [selectPrj, setSelectPrj] = useState();
    const [gridData, setGridData] = useState();

    return (
        <>
            <div className="gridUtil">
                <div className="subPage">
                    <div className="subWrap">
                        <div className="inner mt10">
                            <PM101Grid 
                                prjStartYm  = {prjStartYm} 
                                prjEndYm    = {prjEndYm} 
                                selectPrj   = {selectPrj} 
                                gridData    = {gridData}

                                setPrjStartYm   = {setPrjStartYm} 
                                setPrjEndYm     = {setPrjEndYm}
                                setSelectPrj    = {setSelectPrj}
                                setGridData     = {setGridData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default PM101;