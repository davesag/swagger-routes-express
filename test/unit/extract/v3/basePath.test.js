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
    context('with an absolute base url', () => {
      const servers = [
        {
          url: `${faker.internet.url()}/`
        }
      ]

      const expected = ''

      it('returns the expected result', () => {
        expect(basePath(servers, {})).to.equal(expected)
      })
    })

    context('with a variable', () => {
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

    context('with repeated variables', () => {
      const servers = [
        {
          url: `${faker.internet.url()}/`
        },
        {
          url: '/{base}/v3/{base}'
        }
      ]

      const variables = { base: 'test' }

      const expected = '/test/v3/test'

      it('returns the expected result', () => {
        expect(basePath(servers, variables)).to.equal(expected)
      })
    })
  })
})
