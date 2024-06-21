import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notyf } from "notyf";
const notyf = new Notyf();
const apiUrl = import.meta.env.VITE_API_URL;

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${args.token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        return data;
      }
    } catch (err) {
      notyf.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: { users: [], isPending: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

export default users.reducer;
