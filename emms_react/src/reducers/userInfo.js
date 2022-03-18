// ACTION 상수 정의
const UPDATE = "USERINFO/UPDATE"; //로그인 또는 사용자정보 변경 시 사용
const EXPIRE = "USERINFO/EXPIRE"; //로그아웃 시 사용

// 명명규칙 : ACT_객체명_액션명
// 액션의 파라미터는 payload로 고정 (FSA 규칙)
export const ACT_USER_INFO_UPDATE = userInfo => ({ type: UPDATE, payload: userInfo })
export const ACT_USER_INFO_EXPIRE = userInfo => ({ type: EXPIRE, payload: userInfo })

//선언된 사용자정보의 초기값
const initialState = {
    usrNum: null
    , usrName: null
    , usrBirMd: null
    , usrEmail: null
    , usrTelNum: null
    , usrAdr: null
    , incCd: null
    , apoCd: null
    , eduCd: null
    , timNum: null
    , loginId: null
    , passNum: null
    , joinYn: null
    , delYn: null
    , rmk: null
    , crtDtm: null
    , crtUsrNum: null
    , mdfDtm: null
    , mdfUsrNum: null
<<<<<<< HEAD
    , timNm: null
  }
=======
>>>>>>> 3be0b2a71697b781791ce027150d63830c9f84d6
};

const USER_INFO = (state = initialState, action) => {
  var copyUserInfo = { ...state }
  switch (action.type) {
    case UPDATE:
      console.log(action.payload.userInfo);
      copyUserInfo = action.payload.userInfo;
      return copyUserInfo;

    case EXPIRE:
      copyUserInfo = initialState;
      return copyUserInfo;

    // default를 쓰지 않으면 맨처음 state에 값이 undefined가 나옴 꼭! default문을 넣어야함
    default:
      return state;
  }
}

export default USER_INFO;