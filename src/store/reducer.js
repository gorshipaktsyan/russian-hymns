import actions from "./actions.js";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_BOOKS: {
      const books = action.payload;
      return {
        ...state,
        home: {
          books,
        },
      };
    }
    case actions.SET_BOOK_VERSES: {
      const data = action.payload;
      return {
        ...state,
        chapter: {
          ...state.chapter,
          ...data,
        },
      };
    }
    case actions.SET_CURRENT_BCV: {
      return {
        ...state,
        chapter: {
          ...state.chapter,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
