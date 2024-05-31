import { createSlice } from "@reduxjs/toolkit";
import { jobhunterApi } from "./jobhunterApi.js";

const authSlice = createSlice({
  initialState: {
    auth: JSON.parse(localStorage.getItem("auth"))
  },
  name: 'auth',
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      state.auth = action.payload.data;
    },
    clearUser: (state) => {
      localStorage.removeItem("auth");
      state.auth = {};
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;