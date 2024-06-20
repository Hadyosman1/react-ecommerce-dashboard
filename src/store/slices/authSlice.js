import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const apiUrl = import.meta.env.VITE_API_URL;
const notyf = new Notyf();

export const logIn = createAsyncThunk("auth/logIn", async (args, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await fetch(`${apiUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.msg);
    } else {
      notyf.success("you logged in successfully 👍");
      return data;
    }
  } catch (err) {
    notyf.error(`${err.message}!`);
    return rejectWithValue(err.message);
  }
});

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/users/logout/${args.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${args.token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success("you logged out successfully 👍");
        return data;
      }
    } catch (err) {
      notyf.error(`${err.message}!`);
      return rejectWithValue(err.msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    isPending: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isPending = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isPending = false;
        console.log(action);
        state.error = action.payload;
      });
    builder
      .addCase(logOut.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isPending = false;
        localStorage.removeItem("user");
        console.log(" action ===> ", action);
        state.user = {};
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
