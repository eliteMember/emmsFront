// ACTION 상수 정의
const UPDATE = "HEADER/SUBMENULIST/UPDATE";

// 명명규칙 : ACT_객체명_액션명
// 액션의 파라미터는 payload로 고정 (FSA 규칙)
export const ACT_SUB_MENU_LIST_UPDATE = subMenuList => ({ type: UPDATE, payload: subMenuList })

const initialState      = false;

export const SUB_MENU_LIST = (state = initialState, action) => {
  var copy = { ...state }
  switch (action.type) {
    case UPDATE:
      copy = action.payload;
      return copy;

    default:
      return state;
  }
}

export default SUB_MENU_LIST;