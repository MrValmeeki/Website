import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./data/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        panel: "var(--panel)",
        elevated: "var(--elevated)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        "ink-dim": "var(--muted)",
        "ink-faint": "var(--muted-deep)",
        accent: "var(--accent)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-violet": "var(--accent-violet)",
        "accent-amber": "var(--accent-amber)",
        "accent-emerald": "var(--accent-emerald)",
        "accent-rose": "var(--accent-rose)",
        cyan: {
          50: "#f4f6f6",
          100: "#e8ecec",
          200: "#d1d8d9",
          300: "#b3bebf",
          400: "#95a5a6",
          500: "#7f8c8d",
          600: "#677374",
          700: "#515b5c",
          800: "#3c4344",
          900: "#282d2e",
          950: "#161a1b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-display)", "Space Grotesk", "-apple-system", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 24s linear infinite",
        "pulse-dot": "pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "beacon": "beacon 3s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        beacon: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.95)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
