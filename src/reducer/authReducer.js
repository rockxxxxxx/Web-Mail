import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: Cookies.get("jwtToken") ? true : false,
  jwtToken: Cookies.get("jwtToken") ? Cookies.get("jwtToken") : "",
  email: Cookies.get("email") ? Cookies.get("email") : "",
  displayName: Cookies.get("name") ? Cookies.get("name") : "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.jwtToken = action.payload.jwtToken;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.jwtToken = "";
      state.displayName = "";
      state.email = "";
      Cookies.remove("email", { path: "" });
      Cookies.remove("jwtToken", { path: "" });
      Cookies.remove("name", { path: "" });
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
