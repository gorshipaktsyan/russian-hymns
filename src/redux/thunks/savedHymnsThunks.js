import savedHymnsActions from "../actions/savedhymnsActions";
import persistentStore from "../../view/services/stores/PersistentStore";
import savedHymnsInitState from "../initialStates/savedHymns";

export const fetchSavedHymns = () => (dispatch) => {
  dispatch({
    type: savedHymnsActions.UPDATE_SAVED_HYMNS,
    payload: savedHymnsInitState,
  });
};
