
export default {
  mode: 'universal', // universal
  /*
  ** Headers of the page
  */
  router: {
    base: '/',
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      // {
      //   src: join(__dirname, 'assets/css/app.styl'),
      //   lang: 'styl'
      // }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vuetify.js'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  dev: (process.env.NODE_ENV !== 'production'),
  generate: {
    exclude: [
      /^(?=.*\bignore\b).*$/,
    ],
  }
}

module.exports = {

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  }
}
