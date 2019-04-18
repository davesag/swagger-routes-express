const { expect } = require('chai')

const normaliseMiddleware = require('src/normalise/normaliseMiddleware')

describe('src/normalise/normaliseMiddleware', () => {
  let result

  context('given nothing to normalise', () => {
    before(() => {
      result = normaliseMiddleware()
    })

    it('returns an empty array', () => {
      expect(result).to.be.an('array')
      expect(result).to.have.length(0)
    })
  })

  context('given something to normalise', () => {
    const test1 = () => {}
    const test2 = () => {}

    const handlers = { test1, test2 }
    const names = ['test1', 'test2', 'test3']
    const expected = [test1, test2]

    before(() => {
      result = normaliseMiddleware(handlers, names)
    })

    it('returns an array containing the named middleware', () => {
      expect(result).to.deep.equal(expected)
    })
  })
})
