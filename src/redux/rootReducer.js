import bookmarksReducer from "./slice/bookmarksSlice";
import contentSliceReducer from "./slice/contentSlice";
import currentNumberReducer from "./slice/currentNumberSlice";
import drawerReducer from "./slice/drawerSlice";
import historyReducer from "./slice/historySlice";
import searchReducer from "./slice/searchSlice";
import settingsReducer from "./slice/settingsSlice";
import titleReducer from "./slice/titleSlice";

const rootReducer = {
  bookmarks: bookmarksReducer,
  content: contentSliceReducer,
  currentNumber: currentNumberReducer,
  drawer: drawerReducer,
  history: historyReducer,
  search: searchReducer,
  settings: settingsReducer,
  title: titleReducer,
};

export default rootReducer;
