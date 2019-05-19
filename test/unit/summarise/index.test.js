const { expect } = require('chai')

const v2 = require('test/fixtures/exampleV2.json')
const v3 = require('test/fixtures/exampleV3.json')

const summarise = require('src/summarise')

describe('src/summarise', () => {
  context('given a v2 swagger doc', () => {
    const expected = {
      info: {
        description: v2.info.description,
        version: v2.info.version,
        name: v2.info.title
      },
      paths: {
        get: ['/', '/ping', '/api/v1/test', '/authenticate/:code/:clientId']
      }
    }

    it('returned the expected summary', () => {
      expect(summarise(v2)).to.deep.equal(expected)
    })
  })

  context('given a v3 swagger doc', () => {
    const expected = {
      info: {
        description: v3.info.description,
        version: v3.info.version,
        name: v3.info.title
      },
      paths: {
        get: ['/', '/ping', '/api/v1/test', '/authenticate/:code/:clientId']
      }
    }

    it('returned the expected summary', () => {
      expect(summarise(v3)).to.deep.equal(expected)
    })
  })

  context('given a v3 swagger doc without base servers', () => {
    const { servers, ...doc } = v3
    const expected = {
      info: {
        description: v3.info.description,
        version: v3.info.version,
        name: v3.info.title
      },
      paths: {
        get: ['/', '/ping', '/test', '/authenticate/:code/:clientId']
      }
    }

    it('returned the expected summary', () => {
      expect(summarise(doc)).to.deep.equal(expected)
    })
  })

  context('given a swagger doc with invalid version', () => {
    const doc = { openapi: '4' }
    const INVALID_VERSION = 'ahh crap'

    it('returned the expected summary', () =>
      expect(() => summarise(doc, { INVALID_VERSION })).to.throw(
        INVALID_VERSION
      ))
  })
})
