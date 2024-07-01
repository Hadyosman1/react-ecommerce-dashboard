import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalVisible: false,
    button: "",
    title: "",
    body: "",
    Info: { id: "", token: "" },
    status: "",
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
      state.status = action.payload.status;
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
      state.status = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
