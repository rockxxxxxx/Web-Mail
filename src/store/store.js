import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../reducer/authReducer";

export const store = configureStore({
  reducer: {
    authentication: authSliceReducer,
  },
});
