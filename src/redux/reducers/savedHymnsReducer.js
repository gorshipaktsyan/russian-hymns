import savedHymnsActions from "../actions/savedhymnsActions";
import savedHymnsInitState from "../initialStates/savedHymnsInitState";

const savedHymnsReducer = (state, action) => {
  switch (action.type) {
    case savedHymnsActions.ADD_SAVED_HYMNS:
      return [...state, action.payload];

    case savedHymnsActions.REMOVE_SAVED_HYMNS:
      const idToRemove = action.payload;
      const updatedHymns = state.filter((hymn) => hymn.number !== idToRemove);
      return updatedHymns;

    default:
      return state;
  }
};

export default savedHymnsReducer;
