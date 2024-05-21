import storage from "redux-persist/lib/storage";
import { InitStateNames } from "./constants/InitStateNames";

export const persistConfig = {
  key: "ru-hymns",
  storage,
  whitelist: [
    InitStateNames.bookmarks,
    InitStateNames.history,
    InitStateNames.settings,
  ],
};
