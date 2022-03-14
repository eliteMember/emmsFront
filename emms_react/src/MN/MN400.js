import './MN400.css'
import {React, useState, useEffect} from "react";
import axios from 'axios';
import Modal from '../Component/Modal';

function MN400(){

    let [usr, setusr] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [update, setupdate] = useState({
        id: '',
        column: '',
        value: '',
        defaultValue:''
    });
    
    
    

    useEffect(() => {
        console.log("useEffect 실행됨");
        axios.get('/MN400/api/getList')
        .then((rs) =>{
            setusr(rs.data);
            console.log(rs.data);
        }).catch(() => {
            alert("사용자 불러오기 실패");
        })
    },[])
    

    const closeModal = () => {
        setModalOpen(false);
        setusr(null);
        axios.get('/MN400/api/getList')
        .then((rs) =>{
            setusr(rs.data);
            console.log(rs.data);
        }).catch(() => {
            alert("사용자 불러오기 실패");
        })
    };

    const onChange = (e=>{
        if(e.key === 'Enter'){
            setupdate({
            id : e.target.id,
            column : e.target.name,
            value : e.target.value,
            defaultValue : e.target.defaultValue
        })
        if(e.target.value !== e.target.defaultValue){
            setModalOpen(true);
        }else if(e.target.value === e.target.defaultValue){
          alert("변경내용이 없습니다.");
        }
        }
    })
    

    return(
    
       <div className='MN400_DIV'>
           <Modal open={modalOpen} close={closeModal} header="변경내용 확인" data={update} Impo={setusr} >
                정말 변경하시겠습니까?
           </Modal>
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
                    {usr && usr.USR.map(
                        (usrList, i ) =>
                            <tr key={i}>
                                <td><input id={usrList.usrNum} name="loginId" defaultValue={usrList.loginId} onKeyPress={onChange}></input></td>
                                <td><input id={usrList.usrNum} name="usrName" defaultValue={usrList.usrName} onKeyPress={onChange}></input></td>
                                <td><input id={usrList.usrNum} name="usrBirMd" defaultValue={usrList.usrBirMd} onKeyPress={onChange}></input></td>
                                <td><input id={usrList.usrNum} name="incCd" defaultValue={usrList.incCd} onKeyPress={onChange}></input></td>
                                <td><input id={usrList.usrNum} name="apoCd" defaultValue={usrList.apoCd} onKeyPress={onChange}></input></td>
                                <td><input id={usrList.usrNum} name="usrEmail"  defaultValue={usrList.usrEmail} onKeyPress={onChange}></input></td>
                                <td><input id={usrList.usrNum} name="usrTelNum" defaultValue={usrList.usrTelNum} onKeyPress={onChange}></input></td>
                                <td><input id={usrList.usrNum} name="timNum" defaultValue={usrList.timNum} onKeyPress={onChange}></input></td>
                                {
                                usrList.joinYn === 'Y'
                                ?<td>가입</td>
                                :<td>미가입</td>
                                }
                            </tr>
                        )
                    }
                    
                </tbody>
            </table>
           </div>
       </div>
   );
}


export default MN400;