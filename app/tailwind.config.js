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
        ...color_palettes,
        primary: color_palettes["golden-tainoi"][300],
        danger: color_palettes["tall-poppy"][700],
        "create-bill-button": {
          hover: color_palettes["golden-tainoi"][50],
          active: color_palettes["golden-tainoi"][100],
          outline: color_palettes["golden-tainoi"][700],
        },
        "create-item-button": {
          hover: color_palettes["golden-tainoi"][50],
          active: color_palettes["golden-tainoi"][100],
          outline: color_palettes["golden-tainoi"][700],
        },
        "friend-list-bg": "white",
        "line-button": {
          DEFAULT: color_palettes["malachite"][600],
          divide: "black",
          hover: "black",
          press: "black",
        },
        "share-button": {
          DEFAULT: color_palettes["golden-tainoi"][500],
        },
      },
      opacity: {
        8: "0.08",
      },
    },
  },
  plugins: [],
};
