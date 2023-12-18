/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        "custom-green": "#14FF00",
        "custom-red": "#FF0000",
        "custom-yellow": "#FFF500",
        "custom-light-green": "#04DB004F",
        "custom-light-red": "#DB00004F",
        "custom-light-yellow": "#D7DB004F",
      },
      screens: {
        "md-lg": "900px",
      },
    },
  },
  plugins: [],
};
