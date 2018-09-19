module.exports = ({ file, options, env }) => ({
  plugins: [
    require('tailwindcss')('./tailwind.js'),
    require('postcss-simple-vars'),
    require('autoprefixer')({ browsers: ['last 2 versions', 'iOS >= 8'] })
  ]
});