import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: "startLoading",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
