import {React, useState, useEffect } from "react";
import axios from 'axios';
//순서대로 {DB데이터(get), 보여주고싶은 데이터(set), 선택한페이지(get), 데이터를 보여줄갯수(get), 원래데이터의 길이(get), 선택한페이지세팅(set)}
const Pagination = (props) => {
    const {list, ShowList , totalPosts} = props;
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    function setPaginate(list,number){
        console.log(number);
        fnsetcurrentPage(number);
        currentPosts(list);
    }

    useEffect(()=>{
        currentPosts(list);
    },[currentPage])
    
    function currentPosts(list) {
        let currentPosts = 0;
        console.log("indexOfFirst:"+indexOfFirst);
        console.log("indexOfLast:"+indexOfLast);
        currentPosts = list.slice(indexOfFirst, indexOfLast);
        console.log(currentPosts);
        ShowList(currentPosts);
    }

    function fnsetcurrentPage(number){
        setCurrentPage(number);
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    return (
        <div className="gridUtilBottom">
            <div className="paging">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <a onClick={() => setPaginate(list,number)} className="num">{number}</a>
                    </li>
            ))}
            </div>
            <div className="fr">
            </div>
      </div>
    );
  };
  

  export default Pagination;