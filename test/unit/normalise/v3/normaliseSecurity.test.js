const { expect } = require('chai')

const normaliseSecurity = require('src/normalise/v3/normaliseSecurity')

describe('src/normalise/v3/normaliseSecurity', () => {
  const doTest = (security, expected) => {
    it('normalises the security block correctly', () => {
      expect(normaliseSecurity(security)).to.equal(expected)
    })
  }

  context('given a swagger security block', () => {
    context('there are no scopes', () => {
      const security = [
        {
          example: []
        }
      ]

      doTest(security, 'example')
    })

    context('there are scopes', () => {
      const security = [
        {
          example: ['identity.basic', 'identity.email', 'admin']
        }
      ]

      doTest(security, 'admin,identity.basic,identity.email')
    })
  })

  context('given nothing', () => {
    it('returns undefined', () => {
      expect(normaliseSecurity()).to.be.undefined
    })
  })

  context('given empty security block', () => {
    context('it returns null security', () => {
      const security = []
      doTest(security, null)
    })
  })
})
