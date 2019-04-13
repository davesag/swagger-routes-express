const { expect } = require('chai')

const normaliseSecurity = require('src/normalise/v2/normaliseSecurity')

describe('src/normalise/v2/normaliseSecurity', () => {
  context('given a swagger security block', () => {
    const security = [
      {
        example: ['identity.basic', 'identity.email', 'admin']
      }
    ]
    const expected = 'admin,identity.basic,identity.email'

    it('normalises the security block correctly', () => {
      expect(normaliseSecurity(security)).to.equal(expected)
    })
  })

  context('given nothing', () => {
    it('returns undefined', () => {
      expect(normaliseSecurity()).to.be.undefined
    })
  })
})
