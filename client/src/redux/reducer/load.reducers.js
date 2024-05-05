import { RELOAD } from "../actionTypes/load.actionTypes";
const initialState = false;
const loadReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case RELOAD:
      return payload;
    default:
      return state;
  }
};

export default loadReducer;