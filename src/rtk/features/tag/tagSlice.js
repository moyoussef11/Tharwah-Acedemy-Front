import { createSlice } from "@reduxjs/toolkit";
import { fetchTag, fetchTags } from "./actGetTags";

const initialState = {
  tags: [],
  loading: "idle" | "pending" | "succeeded" | "failed",
  error: null,
  tag: {},
};

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload.tags;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchTag.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchTag.fulfilled, (state, action) => {
        state.tag = action.payload.tags;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchTag.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      });
  },
});

export default tagSlice.reducer;
