// const pkg = require('./package')
require('dotenv').config();
process.env.DEBUG = 'nuxt:*';
module.exports = {
  debug: true,
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Citytorg.kz',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Citytorg.kz'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'msapplication-TileColor',
      content: '#00a300'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    },

    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#5bbad5'
    },

    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
      integrity: 'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg',
      crossorigin: 'anonymous'
    }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#204B98'
  },

  /*
   ** Global CSS
   */
  css: [{
    src: '@/assets/sass/app.sass',
    lang: 'sass'
  }],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '~plugins/vue-scrollto',
    ssr: false
  },
  {
    src: '~plugins/date-format'
  },
  {
    src: '~plugins/truncate'
  },
  {
    src: '~plugins/veevalidate'
  }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BASE_URL
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ['vue-scrollto']
  },
  env: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_PORT: process.env.SMTP_PORT,
    BASE_URL: process.env.BASE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    UPLOADS_URL: process.env.UPLOADS_URL,
  }
};