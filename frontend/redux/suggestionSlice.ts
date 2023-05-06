import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestions: [],
  suggestion: {},
  loading: false,
  error: false,
  currentSuggestionView: "all",
  suggester: false,
  editSuggestionForm: false,
  editSuggestionData: null,
};

export const userSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    getSuggestionsStart: (state) => {
      state.loading = true;
    },
    getSuggestionsSuccess: (state, action) => {
      state.suggestions = action.payload;
      state.loading = false;
    },
    getSuggestionSuccess: (state, action) => {
      state.suggestion = action.payload;
      state.loading = false;
    },
    getSearchSuggestionSuccess: (state, action) => {
      state.suggestion = action.payload;
      state.loading = false;
    },
    getSuggestionsFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    getCurrentSuggestionsView: (state, action) => {
      state.currentSuggestionView = action.payload;
    },
    setSuggester: (state, action) => {
      state.suggester = action.payload;
    },
    showEditSuggestionForm: (state, action) => {
      state.editSuggestionForm = true;
      state.editSuggestionData = action.payload;
    },
    hideEditSuggestionForm: (state) => {
      state.editSuggestionForm = false;
      state.editSuggestionData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getSuggestionsStart,
  getSuggestionsSuccess,
  getSuggestionSuccess,
  getSearchSuggestionSuccess,
  getSuggestionsFailure,
  getCurrentSuggestionsView,
  setSuggester,
  showEditSuggestionForm,
  hideEditSuggestionForm,
} = userSlice.actions;

export default userSlice.reducer;
