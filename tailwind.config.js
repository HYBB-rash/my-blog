/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: {
    files: ["src/views/**/*.{html,vue,ts,tsx,js,jsx,css}"],
  },
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
