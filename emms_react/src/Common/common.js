//객체가 빈 값(Null, "", undefined, [], {})인지 확인하는 함수
export function isEmpty(obj){
    let result = false;

    if(obj === null) result = true;
    if(obj === "") result = true;
    if(obj === undefined) result = true;
    if(obj === "null") result = true;
    if(obj === []) result = true;
    if(obj === {}) result = true;

    return result;
}

//두 비교대상의 값이 동일한지 확인하는 함수
export function isSame(arg1,arg2){
    let result = false

    if(typeof(arg1) === typeof(arg2)){
        if(typeof(arg1) === "object"){
            if(JSON.stringify(arg1) === JSON.stringify(arg2)) result = true;
        }else if(arg1 === arg2) result = true;
    }
    
    return result;
}

export default isEmpty;