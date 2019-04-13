// ref https://swagger.io/docs/specification/authentication/
const normaliseV2Security = require('../v2/normaliseSecurity')

const normaliseSecurity = security => {
  if (!security) return
  const [first] = security
  const [key] = Object.keys(first)
  const value = first[key]
  if (value.length === 0) return key
  return normaliseV2Security(security)
}

module.exports = normaliseSecurity
