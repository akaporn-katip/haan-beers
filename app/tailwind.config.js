/** @type {import('tailwindcss').Config} */
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
      colors: {
        primary: "#fac546",
      },
    },
  },
  plugins: [],
};
