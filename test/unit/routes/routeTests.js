const { expect } = require('chai')

const { mockRequest, mockResponse } = require('mock-req-res')

const routeTests = (controller, status) => {
  const req = mockRequest()
  const res = mockResponse()

  const resetStubs = () => {
    res.status.resetHistory()
    res.end.resetHistory()
  }

  before(() => {
    controller(req, res)
  })

  after(resetStubs)

  it(`calls res.status with ${status}`, () => {
    expect(res.status).to.have.been.calledWith(status)
  })

  it('calls res.end', () => {
    expect(res.end).to.have.been.called
  })
}

module.exports = routeTests
