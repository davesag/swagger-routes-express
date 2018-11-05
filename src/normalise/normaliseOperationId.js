const normaliseOperationId = (operationId, apiSeparator = '_') =>
  operationId ? operationId.replace(/\//g, apiSeparator) : undefined

module.exports = normaliseOperationId
