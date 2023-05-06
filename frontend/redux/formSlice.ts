import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formTitle: "",
  loginForm: false,
  signUpForm: false,
  manageOrgModal: false,
  modal: false,
  modalMsg: null,
};

export const formSlice = createSlice({
  name: "signUpForm",
  initialState,
  reducers: {
    showLoginForm: (state, action) => {
      state.loginForm = true;
      state.formTitle = action.payload;
    },
    hideLoginForm: (state) => {
      state.loginForm = false;
    },
    showSignUpForm: (state, action) => {
      state.signUpForm = true;
      state.formTitle = action.payload;
    },
    hideSignUpForm: (state) => {
      state.signUpForm = false;
    },
    showOrgModal: (state) => {
      state.manageOrgModal = true;
    },
    hideOrgModal: (state) => {
      state.manageOrgModal = false;
    },
    showModal: (state, action) => {
      state.modalMsg = action.payload;
      state.modal = true;
    },
    hideModal: (state) => {
      state.modal = false;
      state.modalMsg = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  showLoginForm,
  hideLoginForm,
  showSignUpForm,
  hideSignUpForm,
  showOrgModal,
  hideOrgModal,
  showModal,
  hideModal,
} = formSlice.actions;

export default formSlice.reducer;
