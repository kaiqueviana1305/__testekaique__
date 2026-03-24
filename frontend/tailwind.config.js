/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff1f1",
          100: "#ffe0e0",
          200: "#ffc5c5",
          400: "#f87171",
          500: "#E31E24",
          600: "#C41118",
          700: "#a30e14",
          800: "#870b10",
          900: "#6e090d",
        },
        seppala: {
          red:   "#E31E24",
          black: "#0D0D0D",
          dark:  "#141414",
          card:  "#1a1a1a",
          border:"#2a2a2a",
          muted: "#3a3a3a",
        },
        meta:     "#1877F2",
        linkedin: "#0A66C2",
        google:   "#EA4335",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:       "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
        "card-hover": "0 4px 16px 0 rgb(0 0 0 / 0.14)",
        red:        "0 4px 14px rgba(227,30,36,0.4)",
        "red-lg":   "0 8px 24px rgba(227,30,36,0.35)",
      },
      animation: {
        "fade-in":  "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
