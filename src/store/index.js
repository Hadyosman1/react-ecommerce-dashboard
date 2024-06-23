import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";
import modalSlice from "./slices/modalSlice";

export default configureStore({
  reducer: {
    authSlice,
    usersSlice,
    modalSlice,
  },
});
