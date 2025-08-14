/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1c1c1c",
        accent: "#B9A36A", //accent color
        "black-2": "#040F0F",
        // body: "#64748B",

        primary: "#323d97",
        secondary: "#2D3797",
        ash: "#666666",
      },
      fontFamily: {
        monteserat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
