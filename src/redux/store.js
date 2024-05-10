import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { thunk } from "redux-thunk";

import rootReducer from "./rootReducer";

const initialState = {};
const middleware = [thunk];

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
