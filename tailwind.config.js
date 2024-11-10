/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#091057",
        secondary: "#024CAA",
        tertiary: "#C5C5C5",
        quaternary: "#ff9f1a",
      },
      fontFamily: {
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
