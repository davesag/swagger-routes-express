const connectSecurity = (security, options) => {
  const { scopes = {} } = options
  if (security) return scopes[security]
}

module.exports = connectSecurity
