module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  ignorePatterns: ['/utils/scratch.js'],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: ['default'],
      },
    ],
  },
}
