/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: {
          50: "#f2f9fd",
          100: "#e5f1f9",
          200: "#c5e3f2",
          300: "#9fd1ea",
          400: "#58b0d8",
          500: "#3295c5",
          600: "#2279a7",
          700: "#1d6087",
          800: "#1c5270",
          900: "#1c455e",
          950: "#132d3e",
        },
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
