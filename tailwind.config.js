import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  plugins: [
    heroui(),
    require('@tailwindcss/typography'),
    require("tailwindcss-animate")
  ],
};
