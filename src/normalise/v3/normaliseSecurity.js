// ref https://swagger.io/docs/specification/authentication/
const normaliseV2Security = require('../v2/normaliseSecurity')

/**
 *  Normalises the supplied security object into a string.
 *
 * @param security — The security object, or undefined
 * @returns a string representation of the security, or undefined if the
 *          security was undefined, or null if the security was defined
 *          but was an empty array.
 */
const normaliseSecurity = security => {
  if (!security) return
  const [first] = security
  if (!first) return null
  const [key] = Object.keys(first)
  const value = first[key]
  if (!value.length) return key
  return normaliseV2Security(security)
}

module.exports = normaliseSecurity
