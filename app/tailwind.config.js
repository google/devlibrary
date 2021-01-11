module.exports = {
  purge: [
    "./src/**/*.vue",
    "./src/components/**/*.vue", 
    "./src/views/**/*.vue",
    "./src/plugins/**/*.ts"
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
