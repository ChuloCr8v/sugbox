import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestionModal: false,
  singleSuggestion: {},
  suggestions: [],
  isLoading: false,
  error: false,
};
export const suggestionSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    getSuggestions: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getSuggestionSuccess: (state, action) => {
      state.suggestions = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    getSingleSuggestion: (state, action) => {
      state.singleSuggestion = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    addSuggestionSuccess: (state, action) => {
      state.suggestions.push(action.payload);
      state.isLoading = false;
      state.error = false;
    },
    getSuggestionsFailure: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    deleteSuggestion: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteSuggestionSuccess: (state, action) => {
      state.isLoading = false;
      const userId = action.payload;
      const deleted = state.suggestions.filter(
        (user: { _id: string }) => user._id !== userId
      );
      state.suggestions = deleted;
    },
    deleteSuggestionFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    approveSuggestion: (state, action) => {
      const otherSuggestions = state.suggestions.filter(
        (suggestion) => suggestion._id !== action.payload
      );
      const updateSuggestion = state.suggestions.find(
        (suggestion: { _id: string }) => suggestion._id === action.payload
      );

      if (updateSuggestion) {
        updateSuggestion.status = "approve";
      }
      [...otherSuggestions, updateSuggestion];
    },
    rejectSuggestion: (state, action) => {
      const otherSuggestions = state.suggestions.filter(
        (suggestion) => suggestion._id !== action.payload
      );
      const updateSuggestion = state.suggestions.find(
        (suggestion: { _id: string }) => suggestion._id === action.payload
      );
      if (updateSuggestion) {
        updateSuggestion.status = "rejected";
      }
      [...otherSuggestions, updateSuggestion];
    },

    upVoteSingleSuggestion: (state, action) => {
      const { upVotes, downVotes } = state.singleSuggestion;
      const userId = action.payload.userId;

      // Remove userId from the downVotes array if it exists
      const updatedDownVotes = downVotes.filter((item) => item !== userId);

      // Toggle userId in the upVotes array
      const updatedUpVotes = upVotes.includes(userId)
        ? upVotes.filter((item) => item !== userId)
        : [...upVotes, userId];

      return {
        ...state,
        singleSuggestion: {
          ...state.singleSuggestion,
          upVotes: updatedUpVotes,
          downVotes: updatedDownVotes,
        },
      };
    },

    downVoteSingleSuggestion: (state, action) => {
      const { upVotes, downVotes } = state.singleSuggestion;
      const userId = action.payload.userId;

      // Remove userId from the downVotes array if it exists
      const updatedUpVotes = upVotes.filter((item) => item !== userId);

      // Toggle userId in the upVotes array
      const updatedDownVotes = downVotes.includes(userId)
        ? downVotes.filter((item) => item !== userId)
        : [...downVotes, userId];

      return {
        ...state,
        singleSuggestion: {
          ...state.singleSuggestion,
          upVotes: updatedUpVotes,
          downVotes: updatedDownVotes,
        },
      };
    },
  },
});

export const {
  addSuggestionSuccess,
  getSuggestions,
  getSuggestionSuccess,
  getSuggestionsFailure,
  deleteSuggestion,
  deleteSuggestionFailure,
  deleteSuggestionSuccess,
  approveSuggestion,
  getSingleSuggestion,
  rejectSuggestion,
  upVoteSingleSuggestion,
  downVoteSingleSuggestion,
} = suggestionSlice.actions;
export default suggestionSlice.reducer;
