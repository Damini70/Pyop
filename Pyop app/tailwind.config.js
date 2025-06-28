// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#05153f",   // base shade  ➜  bg-primary  /  text-primary
          50:  "#f2f4f9",
          100: "#e6e8f3",
          200: "#c1c7e4",
          300: "#9aa5d4",
          400: "#7383c5",
          500: "#4d62b5",       // you can tweak these tints/shades
          600: "#394d97",
          700: "#2b3a73",
          800: "#1d274e",
          900: "#0f142a",
        },
      },
    },
  },
  plugins: [],
};
