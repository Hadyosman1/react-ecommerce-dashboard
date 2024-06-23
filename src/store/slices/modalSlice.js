import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalVisible: false,
    button: "",
    title: "",
    body: "",
    userInfo: { id: "", token: "" },
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalVisible = true;
      state.button = action.payload.button;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.userInfo = {
        id: action.payload.userInfo.id,
        token: action.payload.userInfo.token,
      };
    },
    closeModal: (state) => {
      state.isModalVisible = false;
      state.button = "";
      state.title = "";
      state.body = "";
      state.title = "";
      state.body = "";
      state.userInfo.id = "";
      state.userInfo.token = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
