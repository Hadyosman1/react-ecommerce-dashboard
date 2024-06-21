import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";

export default configureStore({
  reducer: {
    authSlice,
    usersSlice,
  },
});
