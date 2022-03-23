import { useSelector } from "react-redux";

function CodeSelectOption(props) {

  const { cmmnCode } = useSelector(state => state.cmmnCode);  // 공통코드

  return(
    <>
      {
        cmmnCode[props.codeGroup].map((data, i)=>{
          var optionText = data.cdNm;
          if  ( data.cdVal == 0 )  optionText = "선택";
          return <option key={i} value={data.cdVal} >{optionText}</option>
        })
      }
    </>
  )
}

export default CodeSelectOption;