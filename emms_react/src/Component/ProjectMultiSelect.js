import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from "react-select";

function ProjectMultiSelect(props) {

    const [options, setOptions] = useState([]);

    useEffect(() => {
    axios.get('/api/cmmn/listProject').then(function (res) {
        setOptions(res.data.option);
    })
    }, []);

    return (
    <>
        <Select
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </>
    )

}

export default ProjectMultiSelect;