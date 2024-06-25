import { createSlice } from "@reduxjs/toolkit";

const imageLightBoxSlice = createSlice({
  name: "imageLightBox",
  initialState: {
    isImageLightBoxVisible: false,
    image: "",
  },
  reducers: {
    openImageLightBox: (state, action) => {
      state.isImageLightBoxVisible = true;
      state.image = action.payload.image;
    },
    closeImageLightBox: (state) => {
      state.isImageLightBoxVisible = false;
      state.image = "";
    },
  },
});

export const { openImageLightBox, closeImageLightBox } =
  imageLightBoxSlice.actions;
export default imageLightBoxSlice.reducer;
