module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'standard',
    'plugin:vue/recommended',
    'prettier',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'eqeqeq': 'warn',
    'no-plusplus': 0,
    'no-console': 0,
    'dot-notation': 0,
    'eol-last': ['error', 'never'],
    'vue/no-v-html': 0,
    'function-paren-newline' : ['error', 'never']
  },
};