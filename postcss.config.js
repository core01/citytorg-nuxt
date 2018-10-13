const TailwindExtractor = require('./TailwindExtractor.js');
module.exports = ({ file, options, env }) => ({
  plugins: [
    require('tailwindcss')('./tailwind.js'),
    require('postcss-simple-vars'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue'],
      whitelist: ['html', 'body'],
      whitelistPatternsChildren: [/blueimp-gallery/, /leaflet/],
      extractors: [
        {
          extractor: TailwindExtractor,
          // Specify the file extensions to include when scanning for
          // class names.
          extensions: ['html', 'js', 'vue']
        }
      ]
    }),
    require('autoprefixer')({ browsers: ['last 2 versions', 'iOS >= 8'] }),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    })
  ]
});