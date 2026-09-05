module.exports = {
  ignorePatterns: ['build/', 'dist/', 'node_modules/'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'prettier'],
  settings: {
    react: { version: 'detect' },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, jsxSingleQuote: false, printWidth: 100, parser: 'babel-ts' },
    ],
    'react/prop-types': 2,
    'react/jsx-uses-vars': 'warn',
  },
};
