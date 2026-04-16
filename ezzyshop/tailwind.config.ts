import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textShadow: {
        glow: "0 0 5px #d0a348, 0 0 8px #d0a348, 0 0 8px #d0a348, 0 0 8px #d0a348, 0 0 8px #d0a348",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
export default config;
