import { configureStore } from "@reduxjs/toolkit";
import inboxReducer1 from "../reducer/inboxReducer";
import authSliceReducer from "../reducer/authReducer";

export const store = configureStore({
  reducer: {
    authentication: authSliceReducer,
    mail: inboxReducer1,
  },
});
