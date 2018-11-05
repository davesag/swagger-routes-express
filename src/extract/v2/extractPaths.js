const { METHODS } = require('../../constants')
const normaliseSecurity = require('../../normalise/normaliseSecurity')
const normaliseOperationId = require('../../normalise/normaliseOperationId')
const normaliseRoute = require('../../normalise/normaliseRoute')

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
const extractPaths = ({ basePath, paths }, options = {}) => {
  const {
    apiSeparator, // What to swap for `/` in the swagger doc
    rootTag = 'root' // The tag that tells us not to prepend the basePath
  } = options

  const reduceRoutes = (acc, elem) => {
    METHODS.forEach(method => {
      const op = paths[elem][method]
      if (op) {
        const isRoot = Array.isArray(op.tags) && op.tags[0] === rootTag
        acc.push({
          method,
          route: normaliseRoute(`${isRoot ? '' : basePath}${elem}`),
          operationId: normaliseOperationId(op.operationId, apiSeparator),
          security: normaliseSecurity(op.security)
        })
      }
    })
    return acc
  }

  return Object.keys(paths).reduce(reduceRoutes, [])
}

module.exports = extractPaths
