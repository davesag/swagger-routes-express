const { METHODS } = require('../../constants')
const normaliseSecurity = require('../../normalise/v3/normaliseSecurity')
const normaliseOperationId = require('../../normalise/normaliseOperationId')
const normaliseMiddleware = require('../../normalise/normaliseMiddleware')
const normaliseRoute = require('../../normalise/normaliseRoute')
const basePath = require('./basePath')

/*

  Extracts all of the path data into an array of routes
  [
    {
      method,
      route, (normalised and inclues basePath if not a root route)
      operationId,
      security,
      middleware
    }
  ]

*/
const extractPaths = ({ security, servers, paths }, options = {}) => {
  const {
    apiSeparator, // What to swap for `/` in the swagger doc
    variables = {},
    middleware = {}
  } = options

  const defaultBasePath = basePath(servers, variables)
  const defaultSecurity = normaliseSecurity(security)

  const pathSecurity = (opSecurity, defaultSecurity) => {
    const pathSecurity = normaliseSecurity(opSecurity)
    if (pathSecurity === null) return // the security was an empty array.
    return pathSecurity || defaultSecurity
  }

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
          security: pathSecurity(op.security, defaultSecurity),
          middleware: normaliseMiddleware(middleware, op['x-middleware'])
        })
      }
    })
    return acc
  }

  return Object.keys(paths).reduce(reduceRoutes, [])
}

module.exports = extractPaths
