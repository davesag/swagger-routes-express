const ni = require('../routes/notImplemented')
const nf = require('../routes/notFound')

const connectController = (api, operationId, options) => {
  const { notFound = nf, notImplemented = ni } = options

  return operationId
    ? typeof api[operationId] === 'function'
      ? api[operationId]
      : notImplemented
    : notFound
}

module.exports = connectController
