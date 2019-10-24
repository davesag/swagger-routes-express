const { METHODS } = require('../../constants')
const normaliseSecurity = require('../../normalise/normaliseSecurity')
const normaliseOperationId = require('../../normalise/normaliseOperationId')
const normaliseMiddleware = require('../../normalise/normaliseMiddleware')
const normaliseRoute = require('../../normalise/normaliseRoute')
const trimBase = require('../../utils/trimBase')
const basePath = require('./basePath')
const pathBase = require('./pathBase')

/**
 *  Extracts all of the path data into an array of routes in the form:
 *  [
 *    {
 *      method,
 *      route, (normalised and inclues basePath if not a root route)
 *      operationId,
 *      security,
 *      middleware
 *    }
 *  ]
 *
 */
const extractPaths = ({ security, servers, paths }, options = {}) => {
  const {
    apiSeparator, // What to swap for `/` in the swagger doc
    variables = {},
    middleware = {}
  } = options

  const defaultBasePath = basePath(servers, variables)
  const defaultSecurity = normaliseSecurity(security)

  // const pathSecurity = (opSecurity, defaultSecurity) => {
  //   const pathSecurity = normaliseSecurity(opSecurity)
  //   if (pathSecurity === null) return // the security was an empty array.
  //   return pathSecurity || defaultSecurity
  // }

  const reduceRoutes = (acc, elem) => {
    METHODS.forEach(method => {
      const op = paths[elem][method]
      if (op) {
        const base = pathBase(op.servers, variables, defaultBasePath)
        acc.push({
          method,
          route: normaliseRoute(`${trimBase(base)}${elem}`),
          operationId: normaliseOperationId(op.operationId, apiSeparator),
          security: normaliseSecurity(op.security, defaultSecurity),
          middleware: normaliseMiddleware(middleware, op['x-middleware'])
        })
      }
    })
    return acc
  }

  return Object.keys(paths).reduce(reduceRoutes, [])
}

module.exports = extractPaths
