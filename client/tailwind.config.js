/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        primaryblue: "#0275ff",
      },
      colors: {
        primaryblue: "#0275ff",
        hoverblue: "#024BA3",
        textcolor: "#262626",
        bordercolor: "#f1f0f3",
        fortrexorange: "#ff6600",
        primaryred: "#ff0000",
      },
    },
  },
  plugins: [],
};
