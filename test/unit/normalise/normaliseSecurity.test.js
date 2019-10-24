const { expect } = require('chai')

const normaliseSecurity = require('src/normalise/normaliseSecurity')

describe('src/normalise/normaliseSecurity', () => {
  const doTest = ([label, security, defaultSecurity, expected]) => {
    context(`given ${label}`, () => {
      it('normalises the security block correctly', () => {
        expect(normaliseSecurity(security, defaultSecurity)).to.equal(expected)
      })
    })
  }

  ;[
    ['there are no scopes', [{ example: [] }], undefined, 'example'],
    [
      'there are scopes',
      [{ example: ['identity.basic', 'identity.email', 'admin'] }],
      undefined,
      'admin,identity.basic,identity.email'
    ],
    ['there is no security but a default', undefined, 'default', 'default'],
    ['there is empty security and a default', [], 'default', undefined]
  ].forEach(doTest)
})
