const keyOrScopes = require('./keyOrScopes')

/**
 *  Normalises the supplied security object into a string.
 *  ref: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityRequirementObject
 *
 * @param security — The security object, or undefined
 * @returns a string representation of the security, or undefined if the
 *          security was undefined
 */
const normaliseSecurity = security =>
  security ? keyOrScopes(security[0]) : undefined

module.exports = normaliseSecurity
