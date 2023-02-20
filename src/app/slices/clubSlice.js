import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    setClubData: (state, action) => ({ ...state, ...action.payload }),
    clearClubData: () => initialState,
  },
});

export const { setClubData, clearClubData } = clubSlice.actions;
export default clubSlice.reducer;
