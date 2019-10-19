const { expect } = require('chai')

const trimBase = require('src/utils/trimBase')

describe('src/utils/trimBase', () => {
  const expected = 'this-is-a-test'

  let result

  context('when the base ends with a slash', () => {
    it('returns the trimmed base', () => {
      expect(trimBase(`${expected}/`)).to.equal(expected)
    })
  })

  context('when the base does not end with a slash', () => {
    it('returns the supplied base', () => {
      expect(trimBase(expected)).to.equal(expected)
    })
  })
})
