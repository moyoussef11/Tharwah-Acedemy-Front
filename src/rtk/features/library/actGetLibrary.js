import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL, LIBRARY } from "../../../utils/api";

export const fetchLibrary = createAsyncThunk(
  "library/fetchLibrary",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${LIBRARY}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

export const fetchALibrary = createAsyncThunk(
  "ALibrary/fetchALibrary",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/${LIBRARY}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);
