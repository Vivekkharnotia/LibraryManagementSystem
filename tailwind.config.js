/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'mobile': {'max': '768px'},
      'hero-break': {'max': '1200px'},
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    }
  },
  plugins: [],
};
