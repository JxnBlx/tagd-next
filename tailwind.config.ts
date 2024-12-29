import type { Config } from "tailwindcss";

export default {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				// Background colors
				background: {
					primary: "#FFFFFF",
					secondary: "#DCE1E3",
					elevated: "#F8F9FA",
				},
				// Button colors
				button: {
					primary: "#2F5C8F",
					secondary: "#A96762",
					disabled: "#C4C4C4",
					hover: "#234870",
				},
				// Text colors
				text: {
					heading: "#16123f",
					subheading: "#2F5C8F",
					body: "#2a2a2a",
					disabled: "#757575",
					inverse: "#FFFFFF",
				},
				// UI elements
				ui: {
					border: "#DCE1E3",
					divider: "#E5E5E5",
					focus: "#2F5C8F",
					error: "#DC3545",
					success: "#28A745",
					warning: "#FFC107",
				},
				// Navigation
				nav: {
					active: "#16123f",
					inactive: "#757575",
					hover: "#2F5C8F",
				},
			},
			spacing: {
				xs: "4px",
				sm: "8px",
				md: "16px",
				lg: "24px",
				xl: "32px",
			},
			borderRadius: {
				sm: "4px",
				md: "8px",
				lg: "16px",
				full: "9999px",
			},
		},
	},
	plugins: [],
} satisfies Config;
