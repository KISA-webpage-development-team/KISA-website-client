const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      objectPosition: {
        "center-bottom": "center bottom",
      },
      colors: {
        "michigan-blue": "#00274C",
        "michigan-maize": "#FFCB05",
      },
      fontSize: {
        "responsive-xl": "text-base sm:text-lg md:text-xl",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
