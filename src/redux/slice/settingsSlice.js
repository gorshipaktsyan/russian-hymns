import { createSlice } from "@reduxjs/toolkit";
import russian from "../../config/constants/russian";
import { settingsService } from "../../services";

const initialSettings = settingsService.get();

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    fontSize: initialSettings.fontSize || 1,
    isEngSearchVisible: initialSettings.isEngSearchVisible || false,
    isAllowToUseArrows: initialSettings.isAllowToUseArrows || false,
    isMobile: navigator.maxTouchPoints > 0,
    language: initialSettings.language || russian,
  },
  reducers: {
    changeFontSize: (state, action) => {
      state.fontSize = action.payload;
      settingsService.set("fontSize", Number(action.payload.toFixed(1)));
    },
    setIsEngSearchVisible: (state, action) => {
      state.isEngSearchVisible = action.payload;
      settingsService.set("isEngSearchVisible", action.payload);
    },
    setIsAllowToUseArrows: (state, action) => {
      state.isAllowToUseArrows = action.payload;
      settingsService.set("isAllowToUseArrows", action.payload);
    },
  },
});

export const { changeFontSize, setIsEngSearchVisible, setIsAllowToUseArrows } =
  settingsSlice.actions;

export default settingsSlice.reducer;
