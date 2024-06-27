import { createSlice } from "@reduxjs/toolkit";

const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark;)")
  .matches
  ? "dark"
  : "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: localStorage.getItem("theme") ?? prefersColorScheme,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("theme", action.payload);

      if (action.payload == "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }

      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
