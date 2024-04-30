import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

const initialState = {};
const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const composedEnhancers = compose(applyMiddleware(...middleware));

export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  enhancers: () => [composedEnhancers],
});
