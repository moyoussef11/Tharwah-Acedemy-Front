import { createSlice } from "@reduxjs/toolkit";
import {  fetchUsers } from "./actGetUsers";

const initialState = {
  users: [],
  loading: "idle" | "pending" | "succeeded" | "failed",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
  
  },
});

export default usersSlice.reducer;
