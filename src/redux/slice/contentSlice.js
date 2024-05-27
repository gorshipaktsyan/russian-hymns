import { createSlice } from "@reduxjs/toolkit";
import { InitStateNames } from "../../config/constants/InitStateNames";

export const contentSlice = createSlice({
  name: InitStateNames.content,
  initialState: {
    contentExpandedList: {
      titleId: "",
      subtitleId: "",
    },
  },
  reducers: {
    resetContentValues: (state) => {
      state.contentExpandedList = {
        titleId: "",
        subtitleId: "",
      };
    },
    setTitleId: (state, action) => {
      state.contentExpandedList = {
        ...state.contentExpandedList,
        titleId: action.payload,
      };
    },
    setSubtitleId: (state, action) => {
      state.contentExpandedList = {
        ...state.contentExpandedList,
        subtitleId: action.payload,
      };
    },
  },
});

export const { resetContentValues, setTitleId, setSubtitleId } =
  contentSlice.actions;

export default contentSlice.reducer;
