/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF5F00", // Electric Orange
        "background-dark": "#0A0A0A",
        "surface-dark": "#121212",
        "border-dark": "#222222",
      },
      fontFamily: {
        "display": ["Syncopate", "sans-serif"],
        "body": ["Space Grotesk", "sans-serif"]
      },
    },
  },
  darkMode: "class",
  plugins: [],
}