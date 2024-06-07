import { combineReducers } from "redux";
import loadReducer from "./load.reducers";
import { authReducer } from "./auth.reducers";
import loginModalReducer from "./loginModal.reducer";

const rootReducer = combineReducers({
  authManager: authReducer,
  loadReducer: loadReducer,
  loginModalReducer: loginModalReducer,
});

export default rootReducer;
