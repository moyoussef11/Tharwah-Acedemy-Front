import { createSlice } from "@reduxjs/toolkit";
import { fetchALibrary, fetchLibrary } from "./actGetLibrary";

const initialState = {
  library: [],
  loading: "idle" | "pending" | "succeeded" | "failed",
  error: null,
  ALibrary: {},
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibrary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.library = action.payload.library;
      })
      .addCase(fetchALibrary.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchALibrary.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchALibrary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.ALibrary = action.payload.library;
      });
  },
});

export default librarySlice.reducer;
