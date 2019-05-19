const { expect } = require('chai')

const connectController = require('src/connector/connectController')

describe('src/connector/connectController', () => {
  const notImplemented = 'not implemented'
  const notFound = 'not found'
  const options = { notFound, notImplemented }
  const api = {
    test: () => {}
  }

  context('given no operationId', () => {
    it('returns notFound', () => {
      expect(connectController(api, undefined, options)).to.equal(notFound)
    })
  })

  context('given an unknown operationId', () => {
    it('returns notImplemented', () => {
      expect(connectController(api, 'huh', options)).to.equal(notImplemented)
    })
  })

  context('given a known operationId', () => {
    it('returns the correct api controller', () => {
      expect(connectController(api, 'test', options)).to.equal(api.test)
    })
  })

  context('given default options', () => {
    it('returns a function', () => {
      expect(connectController(api, undefined, {})).to.be.a('function')
    })
  })
})
