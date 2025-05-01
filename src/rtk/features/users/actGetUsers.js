import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../../utils/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/users`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(thunkAPI.rejectWithValue());
    }
  }
);

