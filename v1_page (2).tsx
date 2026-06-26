import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.08)",
        compact: "0 10px 28px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
