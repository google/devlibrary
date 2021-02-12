module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/**/*.vue",
      "./src/components/**/*.vue",
      "./src/views/**/*.vue",
      "./src/**/*.ts",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "ui-sans-serif", "system-ui"],
      display: ["Google Sans", "Roboto", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        firebase: {
          accent: "#FFCA28",
          bg: "#1A73E8",
          text: "#FFFFFF",
        },
        ml: {
          accent: "#4285F4",
          bg: "#F1F3F4",
          text: "#1F2937",
        },
        angular: {
          accent: "#4285F4",
          bg: "#F1F3F4",
          text: "#1F2937",
        },
        flutter: {
          accent: "#4285F4",
          bg: "#F1F3F4",
          text: "#1F2937",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
