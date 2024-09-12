import storage from 'redux-persist/lib/storage';

import { InitStateNames, russian } from './constants';

const persistConfig = {
  key: russian.key,
  storage,
  whitelist: [InitStateNames.bookmarks, InitStateNames.history, InitStateNames.settings]
};

export default persistConfig;
