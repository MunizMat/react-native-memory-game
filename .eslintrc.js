module.exports = {
  env: {
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react-native/no-raw-text': 'off',
    'react-native/no-inline-styles': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
