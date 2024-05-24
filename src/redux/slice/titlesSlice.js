import { createSlice } from "@reduxjs/toolkit";
import titles from "../../storage/titles.json";
import { InitStateNames } from "../../config/constants/InitStateNames";

export const titlesSlice = createSlice({
  name: InitStateNames.titles,
  initialState: {
    titles: titles || [],
    filteredTitles: [],
  },
  reducers: {},
});

export default titlesSlice.reducer;
