/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PM101GridHeader from './PM101_grid_header';
import PM101GridBody from './PM101_grid_body';
import PM101GridFooter from './PM101_grid_footer';

function PM101Grid(props) {
    return (
        <>
            <PM101GridHeader/>
            <PM101GridBody/>
            <PM101GridFooter/>
        </>
    )
}

export default PM101Grid;