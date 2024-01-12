/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   fjalla: ["Fjalla One", "sans-serif"],
      //   lato: ["Lato", "sans-serif"],
      // },
      colors: {
      LHTModePrimaryBG: "#e5e7eb",
      LHTModeSecondaryBG: "#ffffff",
      LHTModeMeetingCardBG: "#dee2e6",
      DRKModeSecondaryBG: "#495057",
      DRKModeTertiaryBG: "#6c757d",
      DRKModePrimaryBG: "#12151B",
      DRKModePrimaryText: "#dee2e6"
      },
      textColor: {
        darkText: "#FFFFFF",
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: "class",
  variants: {
    extend: {
      backgroundColor: ["dark", "light"],
    },
  },
}

