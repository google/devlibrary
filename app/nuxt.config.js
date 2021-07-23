export default {
  target: 'static',
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],
  srcDir: 'src',

  plugins: [
    '~/plugins/main-shim.js'
  ],

  // See: https://tailwindcss.nuxtjs.org/options#configpath
  tailwindcss: {
    configPath: '~~/tailwind.config.js'
  }
}
