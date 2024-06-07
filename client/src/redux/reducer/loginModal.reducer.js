import { OPEN_LOGIN_MODAL } from "../actionTypes/loginTogle.action";

const initialState = false;
const loginModalReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case OPEN_LOGIN_MODAL:
      return payload;
    default:
      return state;
  }
};

export default loginModalReducer;