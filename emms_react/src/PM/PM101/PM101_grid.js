/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PM101GridHeader from './PM101_grid_header';
import PM101GridBody from './PM101_grid_body';
import PM101GridFooter from './PM101_grid_footer';

function PM101Grid(props) {
    return (
        <>
            <PM101GridHeader
                prjStartYm      = {props.prjStartYm}
                prjEndYm        = {props.prjEndYm}
                selectPrj       = {props.selectPrj}

                setGridData     = {props.setGridData}
                setPrjStartYm   = {props.setPrjStartYm}
                setPrjEndYm     = {props.setPrjEndYm}
                setSelectPrj     ={props.setSelectPrj} />

            <PM101GridBody
                selectPrj       = {props.selectPrj}
                gridData        = {props.gridData}
                prjStartYm      = {props.prjStartYm}
                prjEndYm        = {props.prjEndYm}

                setPrjStartYm   = {props.setPrjStartYm}
                setPrjEndYm     = {props.setPrjEndYm}
                setGridData     = {props.setGridData}
                />
            <PM101GridFooter 
                gridData        = {props.gridData}
                prjStartYm      = {props.prjStartYm}
                prjEndYm        = {props.prjEndYm}
                selectPrj       = {props.selectPrj}
                
                setGridData     = {props.setGridData}
            />
        </>
    )
}

export default PM101Grid;