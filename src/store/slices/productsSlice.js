import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notyf } from "notyf";
import { closeModal } from "./modalSlice";
const apiUrl = import.meta.env.VITE_API_URL;
const notyf = new Notyf();

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch(`${apiUrl}/api/products`);
      const data = res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        return data;
      }
    } catch (err) {
      notyf.err(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch(`${apiUrl}/api/products/${args.id}`);
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

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
        body: args.formData,
      });
      const data = res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success(`Product Added Successfully...👍`);
        dispatch(getProducts());
        args.navigate("/dashboard/products");
        return data;
      }
    } catch (err) {
      notyf.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/products/${args.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${args.token}`,
        },
      });
      const data = res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success(`Product Deleted Successfully...👍`);
        dispatch(closeModal());
        return data;
      }
    } catch (err) {
      notyf.err(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    try {
      const res = await fetch(`${apiUrl}/api/products/${args.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
        body: args.formData,
      });

      const data = res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        dispatch(getProducts());
        args.navigate("/dashboard/products");
        notyf.success(`Product Updated Successfully...👍`);
        return data;
      }
    } catch (err) {
      notyf.error(err.message);
      return rejectWithValue(err.messsage);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isPending: false,
    error: null,
    singleProduct: {
      rating: {
        rate: 0,
        count: 0,
      },
      _id: "",
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = null;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
