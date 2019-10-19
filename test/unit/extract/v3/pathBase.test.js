const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/extract/v3/pathBase', () => {
  const someBase = 'addicted-to-base'
  const basePath = stub().returns(someBase)

  const pathBase = proxyquire('src/extract/v3/pathBase', {
    './basePath': basePath
  })

  const resetStubs = () => {
    basePath.resetHistory()
  }

  let result

  context('given nothing', () => {
    before(() => {
      result = pathBase()
    })

    after(resetStubs)

    it('returned an empty string', () => {
      expect(result).to.equal('')
    })

    it('did not call basePath', () => {
      expect(basePath).to.not.have.been.called
    })
  })

  context('given nothing but a default path', () => {
    const defaultPath = 'some-default-path'

    before(() => {
      result = pathBase(undefined, undefined, defaultPath)
    })

    after(resetStubs)

    it('returned an empty string', () => {
      expect(result).to.equal(defaultPath)
    })

    it('did not call basePath', () => {
      expect(basePath).to.not.have.been.called
    })
  })

  context('a server and variables', () => {
    const server = 'some-server'
    const variables = 'some-variables'

    before(() => {
      result = pathBase(server, variables)
    })

    after(resetStubs)

    it('called basePath', () => {
      expect(basePath).to.have.been.calledWith(server, variables)
    })
  })
})
