const actions = {
  SET_SEARCHED_HYMNS_LIST_OPEN: "SET_SEARCHED_HYMNS_LIST_OPEN",
  SET_DRAWER_OPEN: "SET_DRAWER_OPEN",
  SET_TITLE: "SET_TITLE",
};

export const setTitle = (title) => ({
  type: actions.SET_TITLE,
  payload: title,
});

export default actions;
