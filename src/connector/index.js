const connectController = require('./connectController')
const connectSecurity = require('./connectSecurity')
const ERRORS = require('../errors')
const extractVersion = require('../extract/extractVersion')
const extractV2Paths = require('../extract/v2/extractPaths')
const extractV3Paths = require('../extract/v3/extractPaths')

/**
 *  Connect the route controllers defined in `api` with the
 *  `operationIds` and `paths` in the `apiDoc` supplied.
 *  The `apiDoc` may be either a Swagger version 2,
 *  or OpenAPI version 3 document.
 *  The options allowed, with their defaults are as follows:
 *  {
 *    apiSeparator = '_'
 *    notFound = src/routes/notFound
 *    notImplemented = src/routes/notImplemented
 *    onCreateRoute
 *    rootTag = 'root' // ignored if using OpenAPI v3
 *    security = {}
 *    variables = {},
 *    middleware = {},
 *    INVALID_VERSION = errors.INVALID_VERSION
 *  }
 */
const connector = (api, apiDoc, options = {}) => {
  const { INVALID_VERSION = ERRORS.INVALID_VERSION, onCreateRoute } = options
  const version = extractVersion(apiDoc)
  if (!version) throw new Error(INVALID_VERSION)

  const extractPaths = version === 2 ? extractV2Paths : extractV3Paths

  const paths = extractPaths(apiDoc, options)

  return app => {
    paths.forEach(({ method, route, operationId, security, middleware }) => {
      const auth = connectSecurity(security, options)
      const controller = connectController(api, operationId, options)

      const descriptor = [route]
      if (auth) descriptor.push(auth)
      descriptor.push(...middleware, controller)

      app[method](...descriptor)
      if (typeof onCreateRoute === 'function') onCreateRoute(method, descriptor)
    })
  }
}

module.exports = connector
