import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  comment: {},
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getCommentsStart: (state) => {
      state.loading = true;
    },
    getCommentsSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    getCommentSuccess: (state, action) => {
      state.comment = action.payload;
      state.loading = false;
    },
    getCommentsFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentSuccess,
  getCommentsFailure,
} = userSlice.actions;

export default userSlice.reducer;
