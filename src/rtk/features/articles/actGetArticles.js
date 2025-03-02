import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ARTICLES, BASEURL } from "../../../utils/api";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${ARTICLES}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${ARTICLES}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);



export const fetchArticlesLatest = createAsyncThunk(
  "articlesLatest/fetchArticlesLatest",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${ARTICLES}/latest`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);