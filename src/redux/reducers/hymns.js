import actions from "../actions/actions";
import hymnsInitState from "../initialStates/hymns";

const reducer = (state = hymnsInitState, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_NUMBER:
      return {
        ...state,
        currentNumber: [action.payload],
      };
    case actions.SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case actions.SET_OPEN_MODAL:
      return {
        ...state,
        modalOpen: action.payload,
      };
    case actions.SET_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: true,
      };
    default:
      return state;
  }
};

export default reducer;
