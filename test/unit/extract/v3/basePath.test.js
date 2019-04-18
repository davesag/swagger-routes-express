const { expect } = require('chai')
const faker = require('faker')

const basePath = require('src/extract/v3/basePath')

describe('src/extract/v3/basePath', () => {
  context('given nothing', () => {
    it('returns undefined', () => {
      expect(basePath()).to.be.undefined
    })
  })

  context('given servers', () => {
    const servers = [
      {
        url: `${faker.internet.url()}/`
      },
      {
        url: '/{base}/v3'
      }
    ]

    const variables = { base: 'test' }

    const expected = '/test/v3'

    it('returns the expected result', () => {
      expect(basePath(servers, variables)).to.equal(expected)
    })
  })
})
