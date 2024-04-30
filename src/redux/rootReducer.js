import { combineReducers } from "redux";
import hymnsInitState from "./initialStates/hymns";
import settingsInitState from "./initialStates/settings";

export default combineReducers({
  hymnsInitState,
  settingsInitState,
});
