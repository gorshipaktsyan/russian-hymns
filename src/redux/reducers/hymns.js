import actions from "../actions/actions";
import hymnsInitState from "../initialStates/hymns";

const reducer = (state = hymnsInitState, action) => {
  switch (action.type) {
    case actions.SET_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: action.payload,
      };
    case actions.SET_SEARCHED_HYMNS_LIST_OPEN:
      return {
        ...state,
        searchedHymnsListOpen: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
