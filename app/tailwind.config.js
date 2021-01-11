module.exports = {
  purge: [
    "./src/components/**/*.vue", 
    "./src/plugins/**/*.ts",
    "./src/views/**/*.vue"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      display: ['Google Sans', 'Roboto', 'ui-sans-serif', 'system-ui']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
