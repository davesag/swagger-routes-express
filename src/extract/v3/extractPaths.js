const { METHODS } = require('../../constants')
const normaliseSecurity = require('../../normalise/normaliseSecurity')
const normaliseOperationId = require('../../normalise/normaliseOperationId')
const normaliseRoute = require('../../normalise/normaliseRoute')
const basePath = require('./basePath')

/*

  Extracts all of the path data into an array of routes
  [
    {
      method,
      route, (normalised and inclues basePath if not a root route)
      operationId,
      security
    }
  ]

*/
const extractPaths = ({ security, servers, paths }, options = {}) => {
  const {
    apiSeparator, // What to swap for `/` in the swagger doc
    variables = {}
  } = options

  const defaultBasePath = basePath(servers, variables)
  const defaultSecurity = normaliseSecurity(security)

  const reduceRoutes = (acc, elem) => {
    METHODS.forEach(method => {
      const op = paths[elem][method]
      if (op) {
        const base =
          (op.servers ? basePath(op.servers, variables) : defaultBasePath) ||
          /* istanbul ignore next */ ''
        const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base
        acc.push({
          method,
          route: normaliseRoute(`${trimmedBase}${elem}`),
          operationId: normaliseOperationId(op.operationId, apiSeparator),
          security: normaliseSecurity(op.security) || defaultSecurity
        })
      }
    })
    return acc
  }

  return Object.keys(paths).reduce(reduceRoutes, [])
}

module.exports = extractPaths
