import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      rise: {
        '0%': { transform: 'translateY(100%)' },
        '10%': { transform: 'translateY(0%)' },
        '90%': { opacity: '100%', transform: 'scale(1)' },
        '100%': { opacity: '0%', transform: 'scale(1.1)' }
      }
    },
    animation: {
      rise: 'rise 1.5s forwards'
    }
  },
  plugins: [],
};
export default config;
