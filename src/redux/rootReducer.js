import { combineReducers } from "redux";
import hymnsReducer from "./reducers/hymns";

export default combineReducers({
  hymns: hymnsReducer,
});
