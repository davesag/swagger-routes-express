const ni = require('../routes/notImplemented')
const nf = require('../routes/notFound')

const connectController = (api, operationId, options) => {
  const { notFound = nf, notImplemented = ni } = options

  if (!operationId) return notFound
  if (typeof api[operationId] === 'function') return api[operationId]
  if (Array.isArray(api[operationId])) {
    if (api[operationId].reduce((isFun, fun) => typeof fun === 'function' && isFun, true)) {
      return api[operationId]
    } else {
      return notImplemented
    }
  }
  return notImplemented
}

module.exports = connectController
