import { createSlice } from "@reduxjs/toolkit";
import { jobhunterApi } from "./jobhunterApi.js";

const getFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("auth"));
  } catch (error) {
    localStorage.removeItem("auth");
    return {};
  }
};

const authSlice = createSlice({
  initialState: {
    auth: getFromLocalStorage()
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