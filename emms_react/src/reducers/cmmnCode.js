const GETCODE = "cmmnCode/getCode"; //로그인시 공통코드를 가져올 떄 사용


//명명규칙 : ACT_객체명_액션명
//액션의 파라미터는 payload로 고정 (FSA 규칙)
export const ACT_CMMN_CODE_GETLIST = getCode => ({type: GETCODE, payload: getCode})


//선언된 코드의 초기값
const initialState = {
    getCode: {
          cdDivVal : null
        , cdVal : null
        , cdDivNm : null
        , cdNm : null
    }
};

const CMMN_CODE = (state = initialState, action) =>{
    var copyCmmnCode = {...state}
    switch(action.type){
        case GETCODE:
            copyCmmnCode = action.payload;
            console.log(copyCmmnCode);
        return copyCmmnCode;

        default:
            return state;
    }
}

export default CMMN_CODE;