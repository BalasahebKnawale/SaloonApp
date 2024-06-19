/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "custom-blue": "#98FB98",
        "custom-slate": "#F5FBFD",
      },
    },
  },
  plugins: [],
};
