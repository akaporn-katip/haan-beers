/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    {
      pattern: /bg-.+/,
    },
  ],
  theme: {
    screens: {
      sm: "650px",
      md: "650px",
      lg: "650px",
      xl: "650px",
    },
    fontFamily: {
      sans: ["var(--font-itim)"],
    },
    extend: {
      colors: {
        "white-smoke": "#f5f5f5",
        saffron: {
          50: "#fefcf6",
          100: "#fdf9ee",
          200: "#faf0d4",
          300: "#f7e7ba",
          400: "#f1d486",
          500: "#ebc252",
          600: "#d4af4a",
          700: "#b0923e",
          800: "#8d7431",
          900: "#735f28",
        },
        "tiffany-blue": {
          50: "#fbfdfc",
          100: "#f6fbf9",
          200: "#e9f6f0",
          300: "#dbf0e7",
          400: "#c0e4d5",
          500: "#a5d9c3",
          600: "#95c3b0",
          700: "#7ca392",
          800: "#638275",
          900: "#516a60",
        },
        mint: {
          50: "#f2fdfa",
          100: "#e6faf6",
          200: "#c0f3e8",
          300: "#9aebdb",
          400: "#4fddbf",
          500: "#03cea4",
          600: "#03b994",
          700: "#029b7b",
          800: "#027c62",
          900: "#016550",
        },
      },
      spacing: {},
      boxShadow: {
        cartoon: ["0 8px 0px"],
        "cartoon-inset": ["inset 0 -8px 0px rgba(0,0,0,0.2)"],
      },
    },
  },
  plugins: [],
};
