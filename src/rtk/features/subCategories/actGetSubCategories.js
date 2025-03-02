import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL, CATEGORIES, SUB_CATEGORIES } from "../../../utils/api";

export const fetchSubCategories = createAsyncThunk(
  "subcategories/fetchSubCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASEURL}/${CATEGORIES}/${SUB_CATEGORIES}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchSubCategory = createAsyncThunk(
  "subcategory/fetchSubCategory",
  async ({ slug }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASEURL}/${CATEGORIES}/${SUB_CATEGORIES}/${slug}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);
