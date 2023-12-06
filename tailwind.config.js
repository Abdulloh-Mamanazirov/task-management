/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
      },
      screens: {
        "md-lg": "900px",
      },
    },
  },
  plugins: [],
};
