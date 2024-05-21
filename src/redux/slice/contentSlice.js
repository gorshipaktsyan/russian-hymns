import { createSlice } from "@reduxjs/toolkit";

export const content = "content";

export const contentSlice = createSlice({
  name: content,
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
