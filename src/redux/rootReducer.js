import { combineReducers } from "redux";
import hymnsReducer from "./reducers/hymns";
import savedHymnsReducer from "./reducers/savedHymns";

export default combineReducers({
  hymns: hymnsReducer,
  savedHymns: savedHymnsReducer,
});
