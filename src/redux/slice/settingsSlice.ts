import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitStateNames, russian } from '../../config/constants';
import { RussianLanguageTypes } from '../../types';

interface SettingsState {
  fontSize: number;
  isEngSearchVisible: boolean;
  isAllowToUseArrows: boolean;
  isMobile: boolean;
  language: RussianLanguageTypes;
}

const initialState: SettingsState = {
  fontSize: 1,
  isEngSearchVisible: false,
  isAllowToUseArrows: false,
  isMobile: navigator.maxTouchPoints > 0,
  language: russian
};

export const settingsSlice = createSlice({
  name: InitStateNames.settings,
  initialState,
  reducers: {
    changeFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = Number(action.payload.toFixed(1));
    },
    setIsEngSearchVisible: (state, action: PayloadAction<boolean>) => {
      state.isEngSearchVisible = action.payload;
    },
    setIsAllowToUseArrows: (state, action: PayloadAction<boolean>) => {
      state.isAllowToUseArrows = action.payload;
    }
  }
});

export const { changeFontSize, setIsEngSearchVisible, setIsAllowToUseArrows } =
  settingsSlice.actions;

export default settingsSlice.reducer;
