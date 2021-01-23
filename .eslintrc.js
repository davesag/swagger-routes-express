module.exports = {
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['prettier', 'import', 'promise'],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    'no-unused-expressions': 0,
  }
}
