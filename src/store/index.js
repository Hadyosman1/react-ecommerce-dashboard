import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";
import modalSlice from "./slices/modalSlice";
import imageLightBoxSlice from "./slices/imageLightBoxSlice";
import productsSlice from "./slices/productsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import themeSlice from "./slices/themeSlice";

export default configureStore({
  reducer: {
    authSlice,
    usersSlice,
    modalSlice,
    imageLightBoxSlice,
    productsSlice,
    categoriesSlice,
    themeSlice,
  },
});
