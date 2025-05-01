import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL, LATEST, QUESTIONS } from "../../../utils/api";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${QUESTIONS}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchQuestionsRequests = createAsyncThunk(
  "questions/fetchQuestionsRequests",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/request-add-question`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchQuestion = createAsyncThunk(
  "question/fetchQuestion",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${QUESTIONS}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchQuestionsLatest = createAsyncThunk(
  "questionsLatest/fetchQuestionsLatest",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${QUESTIONS}/${LATEST}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);
