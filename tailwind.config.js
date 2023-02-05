/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        top: "0px 3px 10px 0px rgba(0, 0, 0, 0.2)",
      },
      fontSize: {
        xsm: "13px",
      },
      width: {
        0: "2px",
        card: "24%",
        logout: "310px",
        550: "550px",
      },
      height: {
        320: "320px",
        500: "500px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  plugins: [],
};
