const notImplemented = require('./routes/notImplemented')
const notFound = require('./routes/notFound')
const { METHODS } = require('./constants')

const swaggerRoutes = (api, { basePath, paths }, options = {}) => {
  const {
    notImplemented, // Express Route function called if the operationId doesn't match a controller.
    notFound, // Express Route function called if the operationId is missing from the swagger doc.
    scopes = {}, // Sorted scopes become keys, values are auth controllers.
    apiSeparator = '_', // What to swap for `/` in the swagger doc
    rootTag = 'root', // The tag that tells us not to prepend the basePath
    onCreateRoute // the hook to use when a route is created.
  } = options

  const attachHandler = handler =>
    api[handler] ? api[handler] : notImplemented

  const makeScopeKey = security =>
    Object.values(security[0])[0]
      .sort()
      .join(',')

  const details = ({ operationId, security }) => ({
    handler: operationId
      ? attachHandler(operationId.replace(/\//g, apiSeparator))
      : notFound,
    security:
      security && security.length !== 0 ? scopes[makeScopeKey(security)] : null
  })

  const routeReducer = (acc, elem) => {
    METHODS.forEach(method => {
      const op = paths[elem][method]
      if (op) {
        const isRoot = op.tags[0] === rootTag
        const path = `${isRoot ? '' : basePath}${elem}`
          .replace(/\{/g, ':')
          .replace(/\}/g, '')
        const route = [path]
        const { security, handler } = details(op)
        if (security) route.push(security)
        route.push(handler)
        acc[method] = acc[method] ? [...acc[method], route] : [route]
      }
    })
    return acc
  }

  const getRoutes = () => Object.keys(paths).reduce(routeReducer, {})

  const connect = app => {
    const routes = getRoutes()

    const mapRoute = method => {
      const register = descriptor => {
        app[method](...descriptor)
        if (typeof onCreateRoute === 'function')
          onCreateRoute(method, descriptor)
      }
      if (routes[method]) routes[method].forEach(register)
    }

    METHODS.forEach(mapRoute)
  }

  return connect
}

module.exports = swaggerRoutes
