// ACTION 상수 정의
const UPDATE = "BOTTOMUP/UPDATE";
// 명명규칙 : ACT_객체명_액션명
// 액션의 파라미터는 payload로 고정 (FSA 규칙)
export const ACT_BOTTOM_SLIDE_POP = bottomSlidePop => ({ type: UPDATE, payload: bottomSlidePop })

const initialState  = "DOWN";

export const BOTTOM_SLIDE_POP_TOGGLE = (state = initialState, action) => {
  var copy = { ...state }
  switch (action.type) {
    case UPDATE:
      copy = action.payload;
      return copy;

    default:
      return state;
  }
}

export default BOTTOM_SLIDE_POP_TOGGLE;