import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF5F6",
          100: "#FCE8EA",
          200: "#F8BFC5",
          300: "#F2949E",
          400: "#EB7480",
          500: "#E24F5F",
          600: "#C73E4E",
          700: "#A93141",
          800: "#8B2433",
          900: "#6F1B27",
        },
        ink: {
          50: "#F4F4F5",
          100: "#E4E4E7",
          200: "#D4D4D8",
          300: "#A1A1AA",
          400: "#71717A",
          500: "#52525B",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#141416",
          950: "#0B0B0C",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        floating: "0 20px 40px -10px rgba(226, 79, 95, 0.25)",
        dark: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
