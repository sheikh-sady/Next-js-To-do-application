/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable class-based dark mode toggle
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
    safelist: [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-purple-400',
     'bg-orange-400',
     'bg-violet-400',
     'bg-black-400',
     'bg-gray-400',
     'bg-olive-400',
     'bg-indigo-400'
    // add all possible category colors here
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
