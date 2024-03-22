import { createSlice } from "@reduxjs/toolkit";

export const reRenderSlice = createSlice({
  name: "reRender",
  initialState: {
    reRender: false,
  },
  reducers: {
    reRender: (state) => {
      state.reRender = !state.reRender;
    },
  },
});

export const { reRender } = reRenderSlice.actions;
export default reRenderSlice.reducer;
