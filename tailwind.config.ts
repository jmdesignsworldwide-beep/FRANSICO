import type { Config } from "tailwindcss";

/**
 * Sistema de diseño F&I WASH.
 * Paleta base automotriz premium (negro carbón / rojo F&I / plata / blanco)
 * con acento morado reservado para la división de detailing (Velocity Wash).
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: "#0D0D0D",
          800: "#141414",
          700: "#1A1A1A",
          600: "#242424",
        },
        fi: {
          // Rojo principal de marca
          red: "#E30613",
          "red-glow": "#FF2436",
        },
        silver: {
          DEFAULT: "#C7CBD1",
          muted: "#8A8F98",
        },
        velocity: {
          // Acento morado (Velocity Wash / detailing)
          DEFAULT: "#6B2FB3",
          glow: "#8B4FD9",
        },
        gold: {
          // Toque dorado del brochure Velocity Wash
          DEFAULT: "#F2B441",
          glow: "#FFC95A",
        },
        offwhite: "#F5F5F5",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        heading: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-red": "0 0 30px -5px rgba(227, 6, 19, 0.45)",
        "glow-red-lg": "0 0 60px -10px rgba(227, 6, 19, 0.55)",
        "glow-velocity": "0 0 30px -5px rgba(107, 47, 179, 0.5)",
        "glow-velocity-lg": "0 0 60px -10px rgba(139, 79, 217, 0.55)",
        "glow-gold": "0 0 30px -5px rgba(242, 180, 65, 0.5)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #0D0D0D 85%), linear-gradient(rgba(199,203,209,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(199,203,209,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 1rem))" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px -6px rgba(227,6,19,0.55)" },
          "50%": { boxShadow: "0 0 34px -2px rgba(227,6,19,0.85)" },
        },
        "pulse-glow-velocity": {
          "0%, 100%": { boxShadow: "0 0 20px -6px rgba(107,47,179,0.55)" },
          "50%": { boxShadow: "0 0 34px -2px rgba(139,79,217,0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee 32s linear infinite",
        "border-beam": "border-beam calc(var(--duration,8s)) infinite linear",
        "gradient-pan": "gradient-pan 8s ease infinite",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        "pulse-glow-velocity": "pulse-glow-velocity 2.6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
