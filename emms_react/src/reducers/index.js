/** root reducer */
import { combineReducers } from "redux";
import userInfo from './userInfo';

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
const rootReducer = combineReducers({
    userInfo
});
export default rootReducer;
 