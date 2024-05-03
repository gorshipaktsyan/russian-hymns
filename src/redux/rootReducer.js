import { combineReducers } from "redux";
import hymnsReducer from "./reducers/hymns";
import settingsReducer from "./initialStates/settings";

export default combineReducers({
  hymns: hymnsReducer,
  settings: settingsReducer,
});
