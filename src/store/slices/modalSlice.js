import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalVisible: false,
    button: "",
    title: "",
    body: "",
    Info: { id: "", token: "" },
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalVisible = true;
      state.button = action.payload.button;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.Info = {
        id: action.payload.Info.id,
        token: action.payload.Info.token,
      };
    },
    closeModal: (state) => {
      state.isModalVisible = false;
      state.button = "";
      state.title = "";
      state.body = "";
      state.title = "";
      state.body = "";
      state.Info.id = "";
      state.Info.token = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
