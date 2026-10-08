import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F1F4F1",   // page — a cool, slightly green paper
        surface: "#FAFBFA", // raised panels
        mist: "#E4EAE6",    // quiet fills
        line: "#D3DBD6",    // hairlines
        ink: "#16231D",     // text, deep pine-black
        slate: "#58665F",   // secondary text
        pine: "#2D5B4C",    // primary accent: principal, actions
        saffron: "#D49B3A", // secondary accent: interest / cost of money
        sky: "#BCD2D8",     // tertiary: returns, highlights
      },
      fontFamily: {
        sans: ['"Onest Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Newsreader Variable"', "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: { tightest: "-0.035em" },
      maxWidth: { page: "76rem" },
    },
  },
  plugins: [],
};
export default config;
