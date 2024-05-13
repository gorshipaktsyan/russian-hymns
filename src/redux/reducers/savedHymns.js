const savedHymnsReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_SAVED_HYMNS":
      return action.payload;
    default:
      return state;
  }
};

export default savedHymnsReducer;
