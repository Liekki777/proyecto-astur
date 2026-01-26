/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'astur-blue': '#007FC7',
        'astur-yellow': '#F6C342',
      }
    },
  },
  plugins: [],
}