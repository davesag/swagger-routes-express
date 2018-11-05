const { expect } = require('chai')

const normaliseOperationId = require('src/normalise/normaliseOperationId')

describe('src/normalise/normaliseOperationId', () => {
  context('given nothing to normalise', () => {
    it('returns undefined', () => {
      expect(normaliseOperationId()).to.be.undefined
    })
  })

  context('given something to normalise', () => {
    const operationId = 'v1/test'

    context('with the default separator', () => {
      const expected = 'v1_test'

      it('returns the expected result', () => {
        expect(normaliseOperationId(operationId)).to.equal(expected)
      })
    })

    context('with a custom separator', () => {
      const expected = 'v1!test'

      it('returns the expected result', () => {
        expect(normaliseOperationId(operationId, '!')).to.equal(expected)
      })
    })
  })
})
