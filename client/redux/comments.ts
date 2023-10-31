import { createSlice } from "@reduxjs/toolkit";

// interface stateProps {
//   isLoading: boolean,
//   comments: {upVotes: [], downVotes: []}[],
//   error: boolean
// }

const initialState = {
  comments: [],
  loadingComments: false,
  addCommentLoading: false,
  error: false,
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getCommentsStart: (state) => {
      state.loadingComments = true;
      state.error = false;
    },
    getCommentsSuccess: (state, action) => {
      state.comments = action.payload;
      state.loadingComments = false;
      state.error = false;
    },
    getCommentsFailure: (state, action) => {
      state.loadingComments = false;
      state.error = true;
    },
    addCommentStart: (state) => {
      state.addCommentLoading = true;
      state.error = false;
    },
    addCommentSuccessful: (state, action) => {
      state.comments.push(action.payload);
      state.error = false;
      state.addCommentLoading = false;
    },
    addCommentFailure: (state) => {
      state.error = true;
      state.addCommentLoading = false;
    },
    // upvoteComment: (state, action) => {
    //   const id = action.payload.id;
    //   const commentId = action.payload.commentId;

    //   // Find the comment with the specified commentId
    //   const comment = state.comments.find(
    //     (comment) => comment._id === commentId
    //   );

    //   if (comment) {
    //     // Check if the id exists in the comment's upVotes array
    //     if (!comment.upVotes.includes(id)) {
    //       // If it doesn't exist, add it to the upVotes array
    //       comment.upVotes.push(id);
    //     } else {
    //       comment.upVotes.pull(id);
    //       console.log(pulled);
    //     }

    //     // Now, you need to create an updated array of comments with the modified comment
    //     const updatedComments = state.comments.map((c) =>
    //       c._id === commentId ? comment : c
    //     );

    //     // Return the updated state with the modified comments
    //     return { ...state, comments: updatedComments };
    //   }

    //   console.log(state.comments);

    //   // // Return the original state if the comment doesn't exist
    //   // return state;
    // },
  },
});

export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure,
  addCommentStart,
  addCommentSuccessful,
  addCommentFailure,
} = commentsSlice.actions;
export default commentsSlice.reducer;
