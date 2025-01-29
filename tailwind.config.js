import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        background: {
          DEFAULT: "var(--background)",
          primary: "var(--background-primary)",
        },
        foreground: "var(--foreground)"
      },
      backgroundImage: {
        "brand-gradient": "var(--background-primary)",
        "product-gradient": "var(--product-gradient)",
      },
    },
  },
  // darkMode: "class",
  plugins: [
    heroui(),
    function ({ addUtilities }) {
      addUtilities({
        '.brand-gradient-border': {
          border: '2px solid transparent',
          borderImage: 'var(--background-primary) round',
          borderImageSlice: '1',
        }
      });
    },
  ],
}
