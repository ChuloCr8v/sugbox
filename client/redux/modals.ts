import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountModal: false,
  signinModal: false,
  alert: false,
  alertText: "",
  alertType: "",
  isLoading: false,
  newEmployeeModal: false,
  newSuggestionModal: false,
  newCommentModal: false,
  editSuggestionModal: {},
};
export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showAccountModal: (state) => {
      state.accountModal = true;
    },
    hideAccountModal: (state) => {
      state.accountModal = false;
    },
    showSigninModal: (state) => {
      state.signinModal = true;
    },
    hideSigninModal: (state) => {
      state.signinModal = false;
    },
    showAlert: (state, action) => {
      state.alert = true;
      state.alertText = action.payload.alertText;
      state.alertType = action.payload.alertType;
    },
    hideAlert: (state) => {
      state.alert = false;
      state.alertText = "";
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    showNewEmployeeModal: (state) => {
      state.newEmployeeModal = true;
    },
    hideNewEmployeeModal: (state) => {
      state.newEmployeeModal = false;
    },
    showNewSuggestionModal: (state) => {
      state.newSuggestionModal = true;
    },
    hideNewSuggestionModal: (state) => {
      state.newSuggestionModal = false;
    },
    showNewCommentModal: (state) => {
      state.newCommentModal = true;
    },
    hideNewCommentModal: (state) => {
      state.newCommentModal = false;
    },
    showEditSuggestionModal: (state, action) => {
      state.editSuggestionModal = action.payload;
    },
    hideEditSuggestionModal: (state) => {
      state.editSuggestionModal = false;
    },
  },
});

export const {
  showAccountModal,
  hideAccountModal,
  hideSigninModal,
  showSigninModal,
  showAlert,
  hideAlert,
  startLoading,
  stopLoading,
  showNewEmployeeModal,
  hideNewEmployeeModal,
  showNewSuggestionModal,
  hideNewSuggestionModal,
  showNewCommentModal,
  hideNewCommentModal,
  showEditSuggestionModal,
  hideEditSuggestionModal,
} = modalSlice.actions;
export default modalSlice.reducer;
