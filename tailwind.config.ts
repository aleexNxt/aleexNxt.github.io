import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neuro-bg': '#e0e5ec',
        'neuro-dark': '#a3b1c6',
        'neuro-light': '#ffffff',
        'neuro-accent': '#6366f1',
      },
      boxShadow: {
        'neuro': '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff',
        'neuro-inset': 'inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff',
        'neuro-sm': '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff',
        'neuro-lg': '12px 12px 24px #a3b1c6, -12px -12px 24px #ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
