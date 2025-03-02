import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategories, fetchSubCategory } from "./actGetSubCategories";

const initialState = {
  sub_categories: [],
  loading: "idle" | "pending" | "succeeded" | "failed",
  error: null,
  sub_category: {},
};

export const subCategoriesSlice = createSlice({
  name: "sub-categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.sub_categories = action.payload.subCategories;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSubCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.sub_category = action.payload;
        state.loading = "succeeded";
        state.error = null;
      });
  },
});

export default subCategoriesSlice.reducer;
