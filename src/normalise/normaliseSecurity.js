const keyOrScopes = require('./keyOrScopes')

/**
 *  Maps the supplied security block (if any) to a simple string representation
 *  that can in turn be used as a key for the appropriate security middleware.
 *
 *  Refs:
 *  - V2 https://swagger.io/docs/specification/2-0/authentication
 *  - V3 https://swagger.io/docs/specification/authentication
 *
 *  @param security — A swagger security block
 *  @param globalSecurity — A previously computed global security key.
 *  @return a string representation used as a key for the appropriate security middleware.
 */
const normaliseSecurity = (security, globalSecurity) =>
  security ? keyOrScopes(security) : globalSecurity

module.exports = normaliseSecurity
