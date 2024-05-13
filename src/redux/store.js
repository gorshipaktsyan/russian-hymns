import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import savedHymnsActions from "./actions/savedhymnsActions";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === savedHymnsActions.REMOVE_SAVED_HYMNS) {
    const savedHymns = JSON.parse(localStorage.getItem("savedHymns")) || [];
    const updatedHymns = savedHymns.filter(
      (hymn) => hymn.number !== action.payload
    );
    localStorage.setItem("savedHymns", JSON.stringify(updatedHymns));
  } else if (action.type === savedHymnsActions.ADD_SAVED_HYMNS) {
    const currentDate = new Date();
    const savedHymns = JSON.parse(localStorage.getItem("savedHymns")) || [];
    const updatedHymns = [
      ...new Set([
        { date: currentDate, number: action.payload },
        ...savedHymns,
      ]),
    ];
    localStorage.setItem("savedHymns", JSON.stringify(updatedHymns));
  }

  return result;
};

const initialState = {};
const middleware = [thunk, localStorageMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});
