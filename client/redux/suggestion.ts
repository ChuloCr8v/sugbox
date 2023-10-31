import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestionModal: false,
  singleSuggestion: {},
  singleUserSuggestions: [],
  suggestions: [],
  loadingSuggestions: false,
  isLoading: false,
  error: false,
};
export const suggestionSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    getSuggestionsStart: (state) => {
      state.loadingSuggestions = true;
      state.error = false;
    },
    getSuggestionSuccess: (state, action) => {
      state.suggestions = action.payload;
      state.loadingSuggestions = false;
      state.error = false;
    },
    getSuggestionsFailure: (state) => {
      state.error = true;
      state.loadingSuggestions = false;
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

    getSingleUserSuggestions: (state, action) => {
      state.singleUserSuggestions = action.payload;
    },
    addSingleUserSuggestion: (state, action) => {
      state.singleUserSuggestions.push(action.payload);
    },
    deleteSuggestion: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    editSingleSuggestion: (state, action) => {
      const { title, suggestion, isAnonymous } = action.payload;
      return {
        ...state,
        singleSuggestion: {
          ...state.singleSuggestion,
          title,
          suggestion,
          isAnonymous,
        },
      };
    },
    deleteSuggestionSuccess: (state, action) => {
      state.isLoading = false;
      const id = action.payload;

      const deleted = state.suggestions.filter(
        (suggestion: { _id: string }) => suggestion._id !== id
      );
      state.suggestions = deleted;
      console.log(state.suggestions);
    },
    deleteSuggestionFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    approveSingleSuggestion: (state, action) => {
      return {
        ...state,
        singleSuggestion: {
          ...state.singleSuggestion,
          status: "approved",
        },
      };
    },
    rejectSingleSuggestion: (state, action) => {
      return {
        ...state,
        singleSuggestion: {
          ...state.singleSuggestion,
          status: "rejected",
        },
      };
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
  getSuggestionsStart,
  getSuggestionSuccess,
  getSuggestionsFailure,
  addSingleUserSuggestion,
  editSingleSuggestion,
  deleteSuggestion,
  deleteSuggestionFailure,
  deleteSuggestionSuccess,
  approveSingleSuggestion,
  getSingleSuggestion,
  getSingleUserSuggestions,
  rejectSingleSuggestion,
  upVoteSingleSuggestion,
  downVoteSingleSuggestion,
} = suggestionSlice.actions;
export default suggestionSlice.reducer;
