const { spy, stub } = require('sinon')

const mockResponse = (options = {}) => {
  const res = {
    json: spy(),
    send: spy(),
    end: spy(),
    ...options
  }
  res.status = stub().returns(res)
  return res
}

module.exports = mockResponse
