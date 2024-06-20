import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (args, thunkAPI) => {
    try {
        let res = await fetch();
    } catch (err) {
        console.log(err);
        
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: {},
});

export default users.reducer;
