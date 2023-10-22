import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
  isLoading: false,
  error: false,
  loginRole: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
    logOut: (state) => {
      state.auth = {};
      localStorage.removeItem("auth");
    },
    setLoginRole: (state, action) => {
      state.loginRole = action.payload;
    },
    employeeStartLogin: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    employeeLoginSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    employeeLoginFailure: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export const { startLogin, loginSuccess, loginFailure, logOut, setLoginRole } =
  authSlice.actions;
export default authSlice.reducer;
