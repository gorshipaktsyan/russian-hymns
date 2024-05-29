import { createSlice } from "@reduxjs/toolkit";
import subtitles from "../../storage/subtitles.json";
import { InitStateNames } from "../../config/constants/InitStateNames";

export const subtitlesSlice = createSlice({
  name: InitStateNames.subtitles,
  initialState: {
    subtitles: subtitles || [],
    filteredSubtitles: [],
  },
  reducers: {},
});

export default subtitlesSlice.reducer;
