import { createSlice } from "@reduxjs/toolkit";
import { fetchArticle, fetchArticles, fetchArticlesLatest } from "./actGetArticles";

const initialState = {
  articles: [],
  articlesLatest: [],
  loading: "idle" | "pending" | "succeeded" | "failed",
  error: null,
  article: {},
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchArticle.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchArticlesLatest.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchArticlesLatest.fulfilled, (state, action) => {
        state.articlesLatest = action.payload.articles;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchArticlesLatest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default articlesSlice.reducer;
