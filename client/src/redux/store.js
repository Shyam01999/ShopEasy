import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";

//for redux devtool extension on chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store
export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);