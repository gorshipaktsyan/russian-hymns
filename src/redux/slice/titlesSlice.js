import { createSlice } from "@reduxjs/toolkit";
import titles from "../../storage/titles.json";

export const titlesSlice = createSlice({
  name: "titles",
  initialState: {
    titles: titles || [],
    filteredTitles: [],
  },
  reducers: {},
});

export default titlesSlice.reducer;
