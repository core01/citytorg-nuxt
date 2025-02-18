require('dotenv').config();
const postCSSConfig = require('./postcss.config.js');
module.exports = {
  debug: true,
  mode: 'universal',
  messages: {
    server_error: 'Oh no! Server error',
    nuxtjs: '',
    back_to_home: 'Cmon, back home!',
    server_error_details: 'Uh uh :| Server errorrrrr',
  },
  manifest: {
    name: 'Торговая сеть акционных продаж',
    short_name: 'Citytorg',
    description: 'Акции, скидки в магазинах города на карте',
    theme_color: '#ffffff',
  },
  meta: {
    name: 'Citytorg',
    description: 'Скидки и акции в магазинах города',
    ogHost: process.env.BASE_URL || 'https://citytorg.kz',
    ogSiteName: 'Citytorg',
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    author: false,
    twitterCard: 'summary',
  },
  router: {
    middleware: ['cityCheck', 'pageHistory'],
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Citytorg.kz',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Citytorg.kz',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        name: 'msapplication-TileColor',
        content: '#00a300',
      },
      {
        property: 'og:image',
        content: process.env.BASE_URL + '/citytorg_og_image.jpg',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
        integrity:
          'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg',
        crossorigin: 'anonymous',
      },
    ],
    script: [
      {
        src:
          'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#204B98',
  },

  /*
   ** Global CSS
   */
  css: [
    {
      src: '~assets/css/app.css',
      lang: 'postcss',
    },
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~plugins/vue-scrollto',
      ssr: false,
    },
    {
      src: '~plugins/date-format',
    },
    {
      src: '~plugins/truncate',
    },
    {
      src: '~plugins/veevalidate',
    },
    {
      src: '~plugins/lazy-img',
      ssr: false,
    },
    {
      src: '~plugins/gallery.js',
      ssr: false,
    },
    {
      src: '~plugins/axios',
    },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: process.env.YM_ID,
        webvisor: true,
        clickmap: true,
        // useCDN:false,
        trackLinks: true,
        accurateTrackBounce: true,
      },
    ],
    ['@nuxtjs/moment', ['ru']],
    // Doc: https://github.com/nuxt-community/analytics-module
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-107573642-2',
      },
    ],
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BASE_URL,
    proxy: true,
  },
  proxy: {
    '/api': {
      target: process.env.YII_API,
      pathRewrite: { '^/api': '' },
    },
    '/uploads': process.env.YII_URL,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {
      // Additional config
      disabled: process.env.NODE_ENV === 'development',
    },
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
          exclude: /(node_modules)/,
        });
      }
    },
  },
  render: {
    http2: {
      push: true,
    },
    static: {
      maxAge: '1y',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`);
        }
      },
    },
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: process.env.BASE_URL + '/uploads/.*',
        method: 'GET',
        handler: 'cacheFirst',
        strategyOptions: {
          cacheName: 'uploads',
          cacheableResponse: { statuses: [0, 200] },
          cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 180,
          },
        },
      },
    ],
  },
};
