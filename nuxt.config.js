require('dotenv').config();
process.env.DEBUG = 'nuxt:*';
const postCSSConfig = require('./postcss.config.js');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
module.exports = {
  debug: true,
  mode: 'universal',
  router: {
    middleware: ['cityCheck', 'pageHistory']
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Citytorg.kz',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
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
    link: [
      {
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
        integrity:
          'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg',
        crossorigin: 'anonymous'
      }
    ],
    script: [
      {
        src:
          'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver'
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
  css: [
    {
      src: '@/assets/css/app.css',
      lang: 'postcss'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
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
    },
    {
      src: '~plugins/lazy-img',
      ssr: false
    },
    {
      src: '~/plugins/gallery.js',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: process.env.YM_ID,
        webvisor: true,
        clickmap: true,
        // useCDN:false,
        trackLinks: true,
        accurateTrackBounce: true
      }
    ],
    ['@nuxtjs/moment', ['ru']]
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
    extractCSS: true,
    analyze: false,
    postcss: postCSSConfig.plugins,
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
      // if (!ctx.isDev) {
      // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
      // for more information about purgecss.
      config.plugins.push(new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './pages/**/*.vue'),
          path.join(__dirname, './layouts/**/*.vue'),
          path.join(__dirname, './components/**/*.vue')
        ]),
        whitelist: ['html', 'body']
      }));
      // }
    }
  },
  env: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_PORT: process.env.SMTP_PORT,
    BASE_URL: process.env.BASE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    UPLOADS_URL: process.env.UPLOADS_URL
  }
};