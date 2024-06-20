/*@type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce: "bounce .5s ease-in-out infinite",
      },
      colors: {
        main: "var(--main)",
        secondary: { 800: "var(--secondary)", 200: "var(--secondary-200)" },
        mainBreakColor: "var(--teal)",
        secondarybreakColor: "var(--gray)",
      },
    },
  },
  plugins: [
    // ...
    import("@tailwindcss/forms"),
  ],
};
