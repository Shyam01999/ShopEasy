import { combineReducers } from "redux";
import loadReducer from "./load.reducers";
import { authReducer } from "./auth.reducers";

const rootReducer = combineReducers({
  authManager: authReducer,
  loadReducer:loadReducer
});

export default rootReducer;
