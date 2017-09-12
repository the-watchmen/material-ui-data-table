module.exports = {
  extends: ['eslint:recommended', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module',
  //   ecmaVersion: 2017,
  //   ecmaFeatures: {
  //     experimentalObjectRestSpread: true
  //   }
  // },
  env: {
    es6: true,
    browser: true
  },
  ecmaFeatures: {
    modules: true,
    jsx: true
  },
  plugins: ['prettier'],
  rules: {
    'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        bracketSpacing: false,
        printWidth: 100
      }
    ]
  }
}
