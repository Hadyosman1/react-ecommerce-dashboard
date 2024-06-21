import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notyf } from "notyf";
const notyf = new Notyf();
const apiUrl = import.meta.env.VITE_API_URL;

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

export const getUserByEmail = createAsyncThunk(
  "auth/getUserByEmail",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `${apiUrl}/api/users/get_user_by_email/${args.email}`
      );
      const data = await res.json();
      console.log(res, data);
      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        return data;
      }
    } catch (err) {
      notyf.error(`${err.message}!`);
      return rejectWithValue(err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { email, _id, password, navigate } = args;
    try {
      const res = await fetch(`${apiUrl}/api/users/reset_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, _id, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success(`${data.msg}!`);
        navigate("/")
        return data.user;
      }
    } catch (err) {
      notyf.error(`${err.message}!`);
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    isPending: false,
    error: null,
    confirmUser: {},
    passwordChanged: false,
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
      .addCase(logOut.fulfilled, (state) => {
        state.isPending = false;
        localStorage.removeItem("user");
        state.user = {};
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(getUserByEmail.pending, (state) => {
        state.isPending = true;
        state.error = null;
        state.confirmUser = {};
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = null;
        state.confirmUser = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
        state.confirmUser = {};
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.isPending = true;
        state.error = null;
        state.passwordChanged = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
        state.passwordChanged = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
        state.passwordChanged = true;
      });
  },
});

export default authSlice.reducer;
