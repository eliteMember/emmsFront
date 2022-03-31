import { React, useEffect, useState } from "react";

// scrollY=스크롤이 하단에 도착여부, scrollSize=스크롤크기, Paging=서버로 다음데이터 요청을 보내는 함수

function InfiniteScroll(props){

    //중첩으로 데이터생성막기위한 state
    const [isMount, setIsMount] = useState(false);
    //스크롤 style
    const scroll = {overflow:'auto', height:props.scrollSize + 'px'};
    //스크롤 이벤트 함수
    const handleFollow = (e) =>{
        if(e.target.scrollHeight - e.target.scrollTop === props.scrollSize){
            props.setscrollY('Y')
            setIsMount(true);
        }else if(e.target.scrollHeight - e.target.scrollTop !== props.scrollSize){
            props.setscrollY('N')
        }
    }

    useEffect(()=> {
        if (isMount) {
            props.Paging();
            setIsMount(false);
        }
        return () => {
            setIsMount(false);
        };
    },[props.scrollY])

    useEffect(() =>{
        const watch = () =>{
            window.addEventListener('scroll',handleFollow);
        }
        watch();
        return () =>{
            window.removeEventListener('scroll',handleFollow);
        }
    })

    return(
        <div className="tb02" style=
        {   
            props.showList && props.showList.length > 8
            ? scroll
            : null
        } onScroll={handleFollow}>
            <table>
                <caption>표</caption> 
                    <props.colgroup/>
                <thead>
                    <props.thead/>
                </thead>
                <tbody>
                    <props.tbody/>
                </tbody>
            </table>
        </div>
    );
};


export default InfiniteScroll;