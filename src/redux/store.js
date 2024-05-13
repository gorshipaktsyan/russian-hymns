import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const stateToSave = {
    searchedHymns: store.getState().searchedHymns,
    savedHymns: store.getState().savedHymns,
    settings: store.getState().settings,
  };

  localStorage.setItem("reduxState", JSON.stringify(stateToSave));
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
