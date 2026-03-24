const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  plugins: [
    heroui(),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
