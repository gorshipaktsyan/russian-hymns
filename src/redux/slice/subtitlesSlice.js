import { createSlice } from "@reduxjs/toolkit";
import subtitles from "../../storage/subtitles.json";
export const subtitlesSlice = createSlice({
  name: "subtitles",
  initialState: {
    subtitles: subtitles || [],
    filteredSubtitles: [],
  },
  reducers: {},
});

export default subtitlesSlice.reducer;
