import { createSlice } from "@reduxjs/toolkit";

// interface stateProps {
//   isLoading: boolean,
//   comments: {upVotes: [], downVotes: []}[],
//   error: boolean
// }
const initialState = {
  comment: {},
  isLoading: false,
  error: false,
};
export const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getComment: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getCommentSuccess: (state, action) => {
      state.comment = action.payload;
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const { getCommentSuccess } = commentsSlice.actions;
export default commentsSlice.reducer;
