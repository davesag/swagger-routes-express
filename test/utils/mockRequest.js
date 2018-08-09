const mockRequest = (options = {}) => ({
  body: {},
  query: {},
  params: {},
  ...options
})

module.exports = mockRequest
