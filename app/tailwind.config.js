/** @type {import('tailwindcss').Config} */

const { color_palettes } = require("./token.config");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "650px",
      md: "650px",
      lg: "650px",
      xl: "650px",
    },
    extend: {
      fontFamily: {
        plex: ["'IBM Plex Sans Thai', sans-serif"],
        chonburi: ["'Chonburi', serif"],
      },
      colors: {
        primary: "#fac546",
        "create-bill-button": {
          default: color_palettes["golden-tainoi"][300],
          hover: color_palettes["golden-tainoi"][400],
          active: color_palettes["golden-tainoi"][500],
          outline: color_palettes["golden-tainoi"][700],
        },
        "create-item-button": {
          hover: color_palettes["golden-tainoi"][50],
          active: color_palettes["golden-tainoi"][100],
          outline: color_palettes["golden-tainoi"][700],
        },
      },
    },
  },
  plugins: [],
};
