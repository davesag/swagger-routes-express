const { expect } = require('chai')

const connectController = require('src/connector/connectController')

describe('src/connector/connectController', () => {
  const notImplemented = 'not implemented'
  const notFound = 'not found'
  const options = { notFound, notImplemented }
  const api = {
    test: () => {},
    notAFunction: 'foobar',
    functionArray: [() => {}, () => {}],
    notFunctionArray: [() => {}, 'foobar']
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

  context('given a operationId that refers to something not a function', () => {
    it('returns notImplemented', () => {
      expect(connectController(api, 'notAFunction', options)).to.equal(notImplemented)
    })
  })

  context('given an operationId that refers to an array of functions', () => {
    it('returns the correct api controller', () => {
      expect(connectController(api, 'functionArray', options)).to.equal(api.functionArray)
    })
  })

  context(
    'given an operationId that refers to an array with elements that are not functions',
    () => {
      it('return notImplemented', () => {
        expect(connectController(api, 'notFunctionArray', options)).to.equal(notImplemented)
      })
    }
  )

  context('given default options', () => {
    it('returns a function', () => {
      expect(connectController(api, undefined, {})).to.be.a('function')
    })
  })
})
