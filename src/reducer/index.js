import { combineReducers } from "redux";
import modalReducer from './modalReducer';
import salonReducer from "./salonReducer";

export default combineReducers({  modalReducer, salonReducer });
