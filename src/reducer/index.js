import { combineReducers } from "redux";
import modalReducer from './modalReducer';
import salonReducer from "./salonReducer";
import personaReducer from "./personaReducer";

export default combineReducers({  modalReducer, salonReducer, personaReducer });
