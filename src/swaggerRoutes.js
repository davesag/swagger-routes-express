const notImplemented = require('./routes/notImplemented')
const notFound = require('./routes/notFound')
const { METHODS } = require('./constants')

const DEFAULT_OPTIONS = {
  notImplemented,
  notFound,
  scopes: {},
  apiSeparator: '_',
  rootTag: 'root'
}

const swaggerRoutes = (api, { basePath, paths }, options = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  const attachHandler = handler =>
    api[handler] ? api[handler] : opts.notImplemented

  const makeScopeKey = security =>
    Object.values(security[0])[0]
      .sort()
      .join(',')

  const details = ({ operationId, security }) => ({
    handler: operationId
      ? attachHandler(operationId.replace(/\//g, opts.apiSeparator))
      : opts.notFound,
    security:
      security && security.length !== 0
        ? opts.scopes[makeScopeKey(security)]
        : null
  })

  const routeReducer = (acc, elem) => {
    METHODS.forEach(method => {
      const op = paths[elem][method]
      if (op) {
        const isRoot = op.tags[0] === opts.rootTag
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
      }
      if (routes[method]) routes[method].forEach(register)
    }

    METHODS.forEach(mapRoute)
  }

  return connect
}

module.exports = swaggerRoutes
