const { expect } = require('chai')

const { connector, summarise } = require('src')

describe('src', () => {
  it('has a connector function', () => {
    expect(connector).to.be.a('function')
  })

  it('has a summarise function', () => {
    expect(summarise).to.be.a('function')
  })
})
