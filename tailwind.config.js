/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      LHTModePrimaryBG: "#e5e7eb",
      LHTModeSecondaryBG: "#ffffff",
      LHTModeMeetingCardBG: "#dee2e6",
      DRKModeSecondaryBG: "#495057",
      DRKModeTertiaryBG: "#6c757d",
      DRKModePrimaryBG: "#212529",
      DRKModePrimaryText: "#dee2e6",
      DRKModeNav: "#2B3136"
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

