import { configureStore } from "@reduxjs/toolkit";
import { jobhunterApi } from "./jobhunterApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    [jobhunterApi.reducerPath]: jobhunterApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(jobhunterApi.middleware)
  ),
});

setupListeners(store.dispatch);

export default store;