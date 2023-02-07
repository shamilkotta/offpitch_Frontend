import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  profile: "",
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => ({ ...state, ...action.payload }),
    clearAuth: () => initialState,
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
