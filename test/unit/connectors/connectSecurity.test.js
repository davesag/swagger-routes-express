const { expect } = require('chai')

const connectSecurity = require('src/connectors/connectSecurity')

describe('src/connectors/connectSecurity', () => {
  context('given no security', () => {
    it('returns undefined', () => {
      expect(connectSecurity(undefined, {})).to.be.undefined
    })
  })
  context('given out of scope security', () => {
    it('returns undefined', () => {
      expect(connectSecurity('test', {})).to.be.undefined
    })
  })
  context('given in-scope security', () => {
    const scopes = { test: () => {} }

    it('returns the correct middleware', () => {
      expect(connectSecurity('test', { scopes })).to.equal(scopes.test)
    })
  })
})
