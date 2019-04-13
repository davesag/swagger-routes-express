const { expect } = require('chai')
const { stub, spy } = require('sinon')

const connector = require('src')
const ERRORS = require('src/errors')

const exampleV2 = require('test/fixtures/exampleV2.json')
const exampleV3 = require('test/fixtures/exampleV3.json')

describe('src/connector', () => {
  const mockApi = {
    versions: () => {}
  }

  const fakeSecurity = {
    'admin,identity.basic,identity.email': () => {}
  }

  const mockApp = {
    get: stub()
  }

  const onCreateRoute = spy()

  const resetStubs = () => {
    mockApp.get.resetHistory()
    onCreateRoute.resetHistory()
  }

  context('given an invalid document', () => {
    after(resetStubs)

    it('throws an error', () =>
      expect(() => {
        connector(mockApi, {})
      }).to.throw(ERRORS.INVALID_VERSION))
  })

  context('given a valid document', () => {
    const doTest = doc => {
      context('without options', () => {
        let connect

        before(() => {
          connect = connector(mockApi, doc)
          connect(mockApp)
        })

        after(resetStubs)

        it('returned a function', () => {
          expect(connect).to.be.a('function')
        })

        it('called app.get for each route', () => {
          expect(mockApp.get.callCount).to.equal(4)
        })
      })

      context('with options', () => {
        context('with a security option', () => {
          before(() => {
            const connect = connector(mockApi, doc, {
              security: fakeSecurity
            })
            connect(mockApp)
          })

          after(resetStubs)

          it('called app.get for each route', () => {
            expect(mockApp.get.callCount).to.equal(4)
          })
        })

        context('with onCreateRoute callback', () => {
          before(() => {
            const connect = connector(mockApi, doc, {
              security: fakeSecurity,
              onCreateRoute
            })
            connect(mockApp)
          })

          after(resetStubs)

          it('called app.get for each route', () => {
            expect(mockApp.get.callCount).to.equal(4)
          })

          it('called onCreateRoute for each route', () => {
            expect(onCreateRoute.callCount).to.equal(4)
          })
        })
      })
    }

    context('given a Swagger version 2 doc', () => {
      doTest(exampleV2)
    })

    context('given an OpenAPI version 3 doc', () => {
      doTest(exampleV3)
    })
  })
})
