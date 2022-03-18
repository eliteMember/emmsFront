// ACTION 상수 정의
const UPDATE = "HEADER/CLICKLIST/UPDATE";

// 명명규칙 : ACT_객체명_액션명
// 액션의 파라미터는 payload로 고정 (FSA 규칙)
export const ACT_SUB_MENU_CLICK_LIST_UPDATE = subMenuClickList => ({ type: UPDATE, payload: subMenuClickList })

const initialState = false;

export const SUB_MENU_CLICK_LIST = (state = initialState, action) => {
  var copy = { ...state }
  switch (action.type) {
    case UPDATE:
      copy = action.payload;
      return copy;

    default:
      return state;
  }
}

export default SUB_MENU_CLICK_LIST;