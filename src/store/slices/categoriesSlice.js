import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notyf } from "notyf";
import { closeModal } from "./modalSlice";
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/categories/${args.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${args.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success(`Category Deleted Successfully...👍`);
        dispatch(getCategories());
        dispatch(closeModal());
        return data;
      }
    } catch (err) {
      notyf.error({
        dismissible: true,
        duration: 6000,
        position: { x: "center", y: "bottom" },
        message: err.message,
      });
      return rejectWithValue(err.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${args.token}`,
        },
        body: JSON.stringify(args.data),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success(`Category Added Successfully...👍`);
        args.navigate("/dashboard/categories");
        return data;
      }
    } catch (err) {
      notyf.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/categories/${args.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${args.token}`,
        },
        body: JSON.stringify(args.data),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success(`Category Updated Successfully...👍`);
        dispatch(getCategories());
        args.navigate("/dashboard/categories");
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

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCategory.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
