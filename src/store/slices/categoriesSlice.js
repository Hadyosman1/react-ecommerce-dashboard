import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notyf } from "notyf";
const notyf = new Notyf();
const apiUrl = import.meta.env.VITE_API_URL;

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/categories`);
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isPending: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
