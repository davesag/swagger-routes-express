const { expect } = require('chai')
const { stub, spy, resetHistory } = require('sinon')

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

  context('given an invalid document', () => {
    after(resetHistory)

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

        after(resetHistory)

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

          after(resetHistory)

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

          after(resetHistory)

          it('called app.get for each route', () => {
            expect(mockApp.get.callCount).to.equal(4)
          })

          it('called onCreateRoute for each route', () => {
            expect(onCreateRoute.callCount).to.equal(4)
          })
        })

        context('with middleware', () => {
          const middleTest = () => {}
          before(() => {
            const connect = connector(mockApi, doc, {
              security: fakeSecurity,
              middleware: { middleTest }
            })
            connect(mockApp)
          })

          after(resetHistory)

          it('called app.get for each route', () => {
            expect(mockApp.get.callCount).to.equal(4)
          })

          it("called get('/') with the versions handler", () => {
            expect(mockApp.get).to.have.been.calledWith('/', mockApi.versions)
          })

          it("passed the middleware into the call to get('/api/v1/test') after the security middleware", () => {
            expect(mockApp.get).to.have.been.calledWith(
              '/api/v1/test',
              fakeSecurity['admin,identity.basic,identity.email'],
              middleTest
            )
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
