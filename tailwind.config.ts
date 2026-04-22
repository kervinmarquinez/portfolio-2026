import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-syne)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      colors: {
        ink: "#0a0a0a",
        paper: "#faf9f6",
        muted: "#6b6b6b",
        accent: "#c4973b",
        surface: "#f0ede7",
        success: "#16a34a",
      },
      animationDelay: {
        "100": "100ms",
        "200": "200ms",
        "350": "350ms",
        "500": "500ms",
        "650": "650ms",
        "800": "800ms",
      },
    },
  },
  plugins: [],
};

export default config;
