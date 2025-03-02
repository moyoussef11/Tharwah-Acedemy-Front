import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL, TAGS } from "../../../utils/api";

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${TAGS}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchTag = createAsyncThunk(
  "tag/fetchTag",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${TAGS}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);
