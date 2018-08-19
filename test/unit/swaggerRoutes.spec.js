const { expect } = require('chai')
const sinon = require('sinon')

const makeFakeApi = require('../utils/makeFakeApi')

const swaggerRoutes = require('../../src')

describe('src/swaggerRoutes', () => {
  const mockApi = {
    versions: () => {}
  }

  const fakeSwaggerApi = makeFakeApi()

  const fakeScopes = {
    'admin,identity.basic,identity.email': () => {}
  }

  const mockApp = {
    get: sinon.stub()
  }

  const onCreateRoute = sinon.spy()

  const resetStubs = () => {
    mockApp.get.resetHistory()
  }

  context('without options', () => {
    const connect = swaggerRoutes(mockApi, fakeSwaggerApi)

    it('returns a function', () => {
      expect(connect).to.be.a('function')
    })
  })

  context('given scopes', () => {
    const connect = swaggerRoutes(mockApi, fakeSwaggerApi, {
      scopes: fakeScopes
    })

    before(() => {
      connect(mockApp)
    })

    after(resetStubs)

    it('called app.get for each route', () => {
      expect(mockApp.get).to.have.been.calledThrice
    })
  })

  context('given onCreateRoute callback', () => {
    const connect = swaggerRoutes(mockApi, fakeSwaggerApi, {
      scopes: fakeScopes,
      onCreateRoute
    })

    before(() => {
      connect(mockApp)
    })

    after(resetStubs)

    it('called app.get for each route', () => {
      expect(mockApp.get).to.have.been.calledThrice
    })

    it('called onCreateRoute for each route', () => {
      expect(onCreateRoute).to.have.been.calledThrice
    })
  })
})
