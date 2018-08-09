const { expect } = require('chai')
const sinon = require('sinon')

const swaggerRoutes = require('../../src')

const mockApi = {
  versions: () => {}
}

const fakeSwaggerApi = {
  basePath: '/api',
  paths: {
    '/': {
      get: {
        operationId: 'versions',
        tags: ['root']
      }
    },
    '/ping': {
      get: {
        operationId: 'something',
        security: [
          {
            something: ['identity.basic', 'identity.email', 'admin']
          }
        ],
        tags: ['root']
      }
    },
    '/whatever': {
      get: {
        tags: ['special']
      }
    }
  }
}

const fakeScopes = {
  'admin,identity.basic,identity.email': () => {}
}

const mockApp = {
  get: sinon.stub()
}

describe('src/swaggerRoutes', () => {
  context('without options', () => {
    const connect = swaggerRoutes(mockApi, fakeSwaggerApi)

    it('returns a function', () => {
      expect(connect).to.be.a('function')
    })
  })

  context('given options', () => {
    const connect = swaggerRoutes(mockApi, fakeSwaggerApi, {
      scopes: fakeScopes
    })

    const resetStubs = () => {
      mockApp.get.resetHistory()
    }

    before(() => {
      connect(mockApp)
    })

    after(resetStubs)

    it('called app.get for each route', () => {
      expect(mockApp.get).to.have.been.calledThrice
    })
  })
})
