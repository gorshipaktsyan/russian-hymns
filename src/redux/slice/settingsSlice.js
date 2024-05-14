import { createSlice } from "@reduxjs/toolkit";
import russian from "../../config/constants/russian";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    fontSize: 1,
    englishSearch: false,
    useArrows: false,
    isMobile: navigator.maxTouchPoints > 0,
    language: russian,
  },
  reducers: {
    changeFontSize: (state, action) => {
      state.settings = {
        ...state.settings,
        fontSize: action.payload,
      };
    },
    setEnglishSearch: (state, action) => {
      state.settings = {
        ...state.settings,
        englishSearch: action.payload,
      };
    },
    setUseArrow: (state, action) => {
      state.settings = {
        ...state.settings,
        useArrows: action.payload,
      };
    },
  },
});

export const { changeFontSize, setEnglishSearch, setUseArrow } =
  settingsSlice.actions;

export default settingsSlice.reducer;
