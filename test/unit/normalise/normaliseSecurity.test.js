const { expect } = require('chai')

const normaliseSecurity = require('src/normalise/normaliseSecurity')

describe('src/normalise/normaliseSecurity', () => {
  context('given a swagger security block', () => {
    const security = [
      {
        example: ['identity.basic', 'identity.email', 'admin']
      }
    ]
    const expected = 'admin,identity.basic,identity.email'

    it('normalises the security block', () => {
      expect(normaliseSecurity(security)).to.equal(expected)
    })
  })

  context('given nothing', () => {
    it('returns undefined', () => {
      expect(normaliseSecurity()).to.be.undefined
    })
  })
})
