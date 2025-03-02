import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchCategory } from "./actGetCategories";

const initialState = {
  categories: [],
  loading: "idle" | "pending" | "succeeded" | "failed",
  error: null,
  category: {},
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = "succeeded";
        state.error = null;
      });
  },
});

export default categoriesSlice.reducer;
