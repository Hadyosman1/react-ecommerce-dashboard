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
      if (action.payload == "dark") {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }

      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
