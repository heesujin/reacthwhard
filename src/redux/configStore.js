//store 만들기
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import sns from "./modules/sns";

const middlewares = [thunk];
const rootReducer = combineReducers({ sns });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
