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
			padding: '1rem'
		},
		extend: {
			fontFamily: {
				sans: [
					'var(--font-sans)'
				],
				mono: [
					'var(--font-mono)'
				]
			},
			colors: {
				background: {
					DEFAULT: "var(--background)",
					primary: "var(--background-primary)",
				},
				foreground: "var(--foreground)"
			},
			backgroundImage: {
				'brand-gradient': 'var(--background-primary)',
				'product-gradient': 'var(--product-gradient)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				fadeIn: 'fadeIn 0.5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				}
			}
		}
	},
	darkMode: ["class"],
	plugins: [
		heroui(),
		require('@tailwindcss/typography'),
		function ({ addUtilities }) {
			addUtilities({
				'.brand-gradient-border': {
					border: '2px solid transparent',
					borderImage: 'var(--background-primary) round',
					borderImageSlice: '1',
				}
			});
		},
		require("tailwindcss-animate")
	],
}
