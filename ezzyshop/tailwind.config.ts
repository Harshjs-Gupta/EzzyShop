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
        glow: "0 0 5px #fc9bf4, 0 0 10px #fc9bf4, 0 0 20px #fc9bf4, 0 0 30px #fc9bf4, 0 0 40px #fc9bf4",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
export default config;
