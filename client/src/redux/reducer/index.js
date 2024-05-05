import { combineReducers } from "redux";
import loadReducer from "./load.reducers";

const rootReducer = combineReducers({
  loadReducer:loadReducer
});

export default rootReducer;
