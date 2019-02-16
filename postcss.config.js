const TailwindExtractor = require('./TailwindExtractor.js');
module.exports = ({ env }) => {
  let tailwind = require('tailwindcss')('./tailwind.js');
  let simpleVars = require('postcss-simple-vars');
  let purgeCSS = require('@fullhuman/postcss-purgecss')({
    content: [
      './pages/**/*.vue',
      './layouts/**/*.vue',
      './components/**/*.vue',
    ],
    whitelist: ['html', 'body'],
    whitelistPatternsChildren: [/blueimp-gallery/, /leaflet/],
    extractors: [
      {
        extractor: TailwindExtractor,
        // Specify the file extensions to include when scanning for
        // class names.
        extensions: ['html', 'js', 'vue'],
      },
    ],
  });
  let autoprefixer = require('autoprefixer')({
    browsers: ['last 2 versions', 'iOS >= 8'],
  });
  let cssnano = require('cssnano')({
    preset: [
      'default',
      {
        discardComments: {
          removeAll: true,
        },
      },
    ],
  });

  let plugins = [tailwind, simpleVars];
  if (env !== 'development') {
    plugins.push(purgeCSS);
  }
  plugins.push(autoprefixer, cssnano);
  return {
    plugins: plugins,
  };
};
