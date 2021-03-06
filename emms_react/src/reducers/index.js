/** root reducer */
import { combineReducers } from "redux";

// Redcer-Persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducer list
import userInfo from './userInfo';
import cmmnCode from './cmmnCode';
import subMenuList from './subMenuList';
import subMenuOver from './subMenuOver';
import subMenuClick from './subMenuClick';
import subMenuClickList from './subMenuClickList';
import bottomSlidePop from './bottomSlidePop';

const persistConfig = {
    key: "root",

    //localStorage에 저장
    storage,

    //whitelist 배열에 정의된 reducer만 스토리지에 저장.
    //해당 리스트에 없는 경우 새로고침 시 reducer state가 초기화됩니다.
    whitelist: ["userInfo", "cmmnCode" , "subMenuList" , "subMenuOver" , "subMenuClick" , "subMenuClickList"]
  };

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
const rootReducer = combineReducers({
  userInfo, cmmnCode, subMenuList, subMenuOver, subMenuClick, subMenuClickList, bottomSlidePop
});

export default persistReducer(persistConfig, rootReducer);