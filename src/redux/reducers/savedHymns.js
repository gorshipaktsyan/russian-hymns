import savedHymnsActions from "../actions/savedhymnsActions";
import savedHymnsInitState from "../initialStates/savedHymns";

const savedHymnsReducer = (state = savedHymnsInitState, action) => {
  switch (action.type) {
    case savedHymnsActions.ADD_SAVED_HYMNS:
      return [...state, action.payload];

    case savedHymnsActions.REMOVE_SAVED_HYMNS:
      const idToRemove = action.payload;
      const updatedHymns = state.filter((hymn) => hymn.number !== idToRemove);
      return updatedHymns;
    case savedHymnsActions.UPDATE_SAVED_HYMNS:
      return action.payload;
    default:
      return state;
  }
};

export default savedHymnsReducer;
