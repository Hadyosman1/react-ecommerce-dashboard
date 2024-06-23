import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notyf } from "notyf";
import { closeModal } from "./modalSlice";
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

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/users/${args.id}`);
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

export const addUser = createAsyncThunk(
  "users/addUsers",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/users/register`, {
        method: "POST",
        body: args.formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success("user added successfully 👍");
        dispatch(getUsers({ token: args.token }));
        args.navigate("/dashboard/users");
        return data;
      }
    } catch (err) {
      notyf.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getUsersRoles = createAsyncThunk(
  "users/getUsersRoles",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/users/roles`, {
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

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      console.log("===========", args.token, args.id);
      const res = await fetch(`${apiUrl}/api/users/${args.id}`, {
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
        notyf.success("user deleted successfully 👍");
        dispatch(closeModal());
        dispatch(getUsers({ token: args.token }));
        return data;
      }
    } catch (err) {
      notyf.error(`${err.message} 👍`);
      return rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${apiUrl}/api/users/${args.id}`, {
        method: "PUT",
        body: args.formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      } else {
        notyf.success("user updated successfully 👍");
        dispatch(getUsers({ token: args.token }));
        args.navigate("/dashboard/users");
        return data;
      }
    } catch (err) {
      notyf.error(`${err.message}`);
      return rejectWithValue(err.message);
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: {
    users: [],
    singleUser: {
      _id: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      role: "",
      avatar: "",
      token: "",
      __v: "",
    },
    isPending: false,
    error: null,
    roles: [],
  },
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

    builder
      .addCase(addUser.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(getUsersRoles.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(getUsersRoles.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = null;
        state.roles = action.payload;
      })
      .addCase(getUsersRoles.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });

    builder
      .addCase(getSingleUser.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.error = null;
        state.singleUser = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
        state.singleUser = {};
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isPending = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
      });
  },
});

export default users.reducer;
