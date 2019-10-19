const { expect } = require('chai')

const keyOrScopes = require('src/normalise/v2/keyOrScopes')

describe('src/normalise/v2/keyOrScopes', () => {
  context('given a security block', () => {
    context('with scopes', () => {
      const security = {
        example: ['identity.basic', 'identity.email', 'admin']
      }
      const expected = 'admin,identity.basic,identity.email'

      it('normalises correctly', () => {
        expect(keyOrScopes(security)).to.equal(expected)
      })
    })

    context('without scopes', () => {
      const security = { example: [] }
      const expected = 'example'

      it('normalises the security block correctly', () => {
        expect(keyOrScopes(security)).to.equal(expected)
      })
    })
  })

  context('given an empty block', () => {
    it('returns undefined', () => {
      expect(keyOrScopes({})).to.be.undefined
    })
  })
})
