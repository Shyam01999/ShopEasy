import { combineReducers } from "redux";
import loadReducer from "./load.reducers";
// import loginModalReducer from "./loginModal.reducer";
import { userDataReducer } from "./userData.reducer";

const rootReducer = combineReducers({
  loadReducer: loadReducer,
  // loginModalReducer: loginModalReducer,
  userDataReducer:userDataReducer,
});

export default rootReducer;
