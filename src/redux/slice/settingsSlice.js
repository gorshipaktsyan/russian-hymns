import { createSlice } from "@reduxjs/toolkit";
import russian from "../../config/constants/russian";
import settingsStore from "../../view/services/stores/SettingsStore";

const initialSettings = settingsStore.get();

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    fontSize: initialSettings.fontSize || 1,
    isEngSearchVisible: initialSettings.englishSearch || false,
    useArrows: initialSettings.useArrows || false,
    isMobile: navigator.maxTouchPoints > 0,
    language: initialSettings.language || russian,
  },
  reducers: {
    changeFontSize: (state, action) => {
      state.fontSize = action.payload;
      settingsStore.set("fontSize", Number(action.payload.toFixed(1)));
    },
    setEnglishSearch: (state, action) => {
      state.englishSearch = action.payload;
      settingsStore.set("englishSearch", action.payload);
    },
    setUseArrow: (state, action) => {
      state.useArrows = action.payload;
      settingsStore.set("useArrows", action.payload);
    },
  },
});

export const { changeFontSize, setEnglishSearch, setUseArrow } =
  settingsSlice.actions;

export default settingsSlice.reducer;
