const { expect } = require('chai')

const keyOrScopes = require('src/normalise/keyOrScopes')

describe('src/normalise/keyOrScopes', () => {
  context('given a security array', () => {
    context('with scopes', () => {
      const security = [
        {
          example: ['identity.basic', 'identity.email', 'admin']
        }
      ]
      const expected = 'admin,identity.basic,identity.email'

      it('normalises correctly', () => {
        expect(keyOrScopes(security)).to.equal(expected)
      })
    })

    context('without scopes', () => {
      const security = [{ example: [] }]
      const expected = 'example'

      it('normalises the security array correctly', () => {
        expect(keyOrScopes(security)).to.equal(expected)
      })
    })
  })

  context('given an empty array', () => {
    it('returns undefined', () => {
      expect(keyOrScopes([])).to.be.undefined
    })
  })
})
