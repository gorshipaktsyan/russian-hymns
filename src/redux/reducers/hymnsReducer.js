import HymnActions from "../actions/HymnActions";
import hymnsInitState from "../initialStates/hymnsInitState";

const Hymnsreducer = (state = hymnsInitState, action) => {
  switch (action.type) {
    case HymnActions.SET_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: action.payload,
      };
    case HymnActions.SET_SEARCHED_HYMNS_LIST_OPEN:
      return {
        ...state,
        searchedHymnsListOpen: action.payload,
      };
    case HymnActions.SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case HymnActions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case HymnActions.SET_CURRENT_NUMBER: {
      return {
        ...state,
        currentNumber: action.payload,
      };
    }
    case HymnActions.SET_CONTENT_SELECTED_TITLE_ID: {
      return {
        ...state,
        contentSelectedTitleId: action.payload,
      };
    }
    case HymnActions.SET_CONTENT_EXPANDED_LIST: {
      return {
        ...state,
        contentExpandedList: {
          ...state.contentExpandedList,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default Hymnsreducer;
