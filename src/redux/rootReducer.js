import appBarReducer from "./slice/appBarSlice";
import bookmarksReducer from "./slice/bookmarksSlice";
import contentSliceReducer from "./slice/contentSlice";
import currentNumberReducer from "./slice/currentNumberSlice";
import drawerReducer from "./slice/drawerSlice";
import historyReducer from "./slice/historySlice";
import searchReducer from "./slice/searchSlice";
import settingsReducer from "./slice/settingsSlice";
import hymnsReducer from "./slice/hymnsSlice";
import titlesReducer from "./slice/titlesSlice";
import subtitlesReducer from "./slice/subtitlesSlice";

const rootReducer = {
  bookmarks: bookmarksReducer,
  content: contentSliceReducer,
  currentNumber: currentNumberReducer,
  drawer: drawerReducer,
  history: historyReducer,
  search: searchReducer,
  settings: settingsReducer,
  appBar: appBarReducer,
  hymns: hymnsReducer,
  titles: titlesReducer,
  subtitles: subtitlesReducer,
};

export default rootReducer;
