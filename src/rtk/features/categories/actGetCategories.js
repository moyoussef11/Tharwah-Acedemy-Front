import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL, CATEGORIES } from "../../../utils/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${CATEGORIES}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async ({ slug }, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${CATEGORIES}/${slug}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);
