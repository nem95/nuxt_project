import pkg from './package'

export default {
  mode: 'universal',
  env: {
    baseUrl: "http://localhost:3001/"
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
    ],
  },
  generate: {
    routes: [
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/calendar', ssr: false}
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
    transpile: ['calendar'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
