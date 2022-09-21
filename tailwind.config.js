/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "#111640",
        current: "#F1F1F1",
        current2: "#D9D9D9",
        gray: "#A6A6A6",
        pmBlue: "#058FF1",
      },
    },
  },
  plugins: [],
};
