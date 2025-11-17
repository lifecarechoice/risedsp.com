import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0B1426",
          900: "#0F1A2F"
        },
        brandBlue: {
          500: "#3653CB"
        },
        gold: {
          500: "#D9A441",
          400: "#E7B55A"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15,26,47,0.12)",
        hover: "0 12px 40px rgba(15,26,47,0.16)"
      },
      backgroundImage: {
        'grid-sleek': "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
      },
      backgroundSize: {
        'grid-size': "40px 40px"
      }
    },
  },
  plugins: [],
}
export default config

