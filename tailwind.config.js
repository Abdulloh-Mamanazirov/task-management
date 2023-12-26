/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        "dark-blue": "#012060",
        "status-green": "#00b052",
        "status-yellow": "#ffff01",
        "status-orange": "#ffc000",
        "status-red": "#fd0101",
        "status-gray": "#7e7e7e",
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
