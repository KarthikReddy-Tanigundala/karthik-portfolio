import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0B0D",
          50: "#1A1B1F",
          100: "#22232A",
          200: "#2E2F36",
        },
        bone: {
          DEFAULT: "#F5F5F0",
          dim: "#C8C8C0",
          mute: "#8A8A82",
        },
        signal: {
          blue: "#2563EB",
          "blue-dim": "#1E4FBF",
          amber: "#F59E0B",
          "amber-dim": "#C97F09",
          green: "#34D399",
        },
        hairline: "rgba(245, 245, 240, 0.08)",
        "hairline-strong": "rgba(245, 245, 240, 0.16)",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        prose: "65ch",
        page: "1240px",
      },
      transitionTimingFunction: {
        stripe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(0.8)", opacity: "0.5" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(ellipse at top, rgba(37, 99, 235, 0.15) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;