import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingEmployees: false,
  loadingSuggestion: false,
  loadingSuggestions: false,
  loadingComment: false,
};
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    employeesLoading: (state, action) => {
      state.loadingEmployees = action.payload;
    },
    suggestionsLoading: (state) => {
      state.loadingSuggestion = true;
    },
    stopSuggestionsLoading: (state) => {
      state.loadingSuggestion = false;
    },
    suggestionLoading: (state, action) => {
      state.loadingSuggestions = action.payload;
    },
    commentLoading: (state, action) => {
      state.loadingComment = action.payload;
    },
  },
});

export const {
  employeesLoading,
  suggestionsLoading,
  stopSuggestionsLoading,
  suggestionLoading,
  commentLoading,
} = loadingSlice.actions;
export default loadingSlice.reducer;
