const connectSecurity = (key, options) => {
  const { scopes = {}, security = {} } = options
  if (key) {
    if (scopes[key]) {
      process.emitWarning(
        'The `scopes` option has been deprecated. Please use `security` instead.',
        'DeprecationWarning'
      )
      return scopes[key]
    }
    return security[key]
  }
}

module.exports = connectSecurity
