import hymnsInitState from "../initialStates/hymns";
import {
  GET_HYMNS_SUCCESS_ACTION,
  SET_HYMNS_SUCCESS_ACTION,
  SAVE_HYMN_SUCCESS_ACTION,
  DELETE_HYMN_SUCCESS_ACTION,
  ADD_HYMN_TO_HISTORY_SUCCESS_ACTION,
} from "../constants/hymns.js";

const reducer = (state = hymnsInitState, action) => {
  switch (action.type) {
    case GET_HYMNS_SUCCESS_ACTION:
      return {
        ...state,
        hymns: action.payload,
      };
    case SET_HYMNS_SUCCESS_ACTION:
      return {
        ...state,
        selectedHymns: action.payload,
        visible: false,
      };
    case SAVE_HYMN_SUCCESS_ACTION:
      return {
        ...state,
        savedHymns: action.payload,
      };
    case ADD_HYMN_TO_HISTORY_SUCCESS_ACTION:
      return {
        ...state,
        searchedHymns: action.payload,
      };
    case DELETE_HYMN_SUCCESS_ACTION:
      return {
        ...state,
        hymns: state.hymns.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
