import { useSelector } from "react-redux";

function CodeSelectOption(props) {

  const { cmmnCode } = useSelector(state => state.cmmnCode);  // 공통코드

  return(
    <>
      {
        cmmnCode[props.codeGroup].map((data, i)=>{
          return <option key={i} value={data.cdVal} >{data.cdNm}</option>
        })
      }
    </>
  )
}

export default CodeSelectOption;