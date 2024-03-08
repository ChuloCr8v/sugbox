import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
};
export const sideBarSlice = createSlice({
  name: "sideBarOpener",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.isSideBarOpen = true;
    },
    closeSideBar: (state) => {
      state.isSideBarOpen = false;
    },
  },
});

export const { openSideBar, closeSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
