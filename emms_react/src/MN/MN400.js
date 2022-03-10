import './MN400.css'
import {React, useState, useEffect} from "react";
import axios from 'axios';

function MN400(){

   return(
    
       <div className='MN400_DIV'>
           <h1 className='Title'>사용자관리</h1>
           <div className='buttonBox'>
               <button>신규</button>
               <button>비밀번호초기화</button>
            </div>
           <div className='table'>
            <table className='type11'>
                <thead>
                    <tr>
                        <th scope="cols">로그인ID</th>
                        <th scope="cols">이름</th>
                        <th scope="cols">생년월일</th>
                        <th scope="cols">직위</th>
                        <th scope="cols">직책</th>
                        <th scope="cols">이메일</th>
                        <th scope="cols">전화번호</th>
                        <th scope="cols">소속팀</th>
                        <th scope="cols">가입여부</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
           </div>
       </div>
   );
}

export default MN400;