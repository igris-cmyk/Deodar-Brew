import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cedar: {
          cream: "var(--background)",
          surface: "var(--surface)",
          ivory: "var(--surface-elevated)",
          espresso: "var(--espresso)",
          brown: "var(--espresso-soft)",
          caramel: "var(--caramel)",
          amber: "#F0B25A",
          green: "var(--sage)",
          sage: "#E3EAD9",
          clay: "var(--clay)",
          beige: "#F4E4CD",
          charcoal: "#3B2E26",
          border: "#EAD3B9",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
