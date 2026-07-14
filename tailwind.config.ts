import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#09090b",
        panel: "#0f172a",
        edge: "#1e293b",
        water: { DEFAULT: "#06b6d4", soft: "#22d3ee", deep: "#0e7490" },
        heat: { DEFAULT: "#f97316", soft: "#fb923c", deep: "#c2410c" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-water":
          "0 0 0 1px rgba(34,211,238,.25), 0 0 40px -8px rgba(6,182,212,.55)",
        "glow-heat":
          "0 0 0 1px rgba(251,146,60,.25), 0 0 40px -8px rgba(249,115,22,.55)",
        "inset-edge": "inset 0 1px 0 rgba(255,255,255,.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "mesh-water": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(6%,-4%,0) scale(1.15)" },
        },
        "mesh-heat": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1.1)" },
          "50%": { transform: "translate3d(-7%,5%,0) scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "mesh-water": "mesh-water 16s ease-in-out infinite",
        "mesh-heat": "mesh-heat 19s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
