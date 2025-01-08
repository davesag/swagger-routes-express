const ni = require('../routes/notImplemented')
const nf = require('../routes/notFound')

const allAboard = (isFun, fun) => typeof fun === 'function' && isFun

const connectController = (api, operationId, options) => {
  const { notFound = nf, notImplemented = ni } = options
  const controller = api[operationId]

  return operationId
    ? typeof controller === 'function'
      ? controller
      : Array.isArray(controller) && controller.reduce(allAboard, true)
        ? controller
        : notImplemented
    : notFound
}

module.exports = connectController
