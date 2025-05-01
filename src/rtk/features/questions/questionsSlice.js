import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuestion,
  fetchQuestions,
  fetchQuestionsLatest,
  fetchQuestionsRequests,
} from "./actGetQuestions";

const initialState = {
  questions: [],
  requestsQuestions: [],
  questionsLatest: [],
  loading: "idle" | "pending" | "succeeded" | "failed",
  error: null,
  question: {},
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.questions;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchQuestionsRequests.fulfilled, (state, action) => {
        state.requestsQuestions = action.payload.requestQuestions;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchQuestion.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchQuestion.fulfilled, (state, action) => {
        state.question = action.payload.question;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchQuestion.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchQuestionsLatest.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchQuestionsLatest.fulfilled, (state, action) => {
        state.questionsLatest = action.payload.questions;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchQuestionsLatest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default questionsSlice.reducer;
