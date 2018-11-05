const { expect } = require('chai')

const normaliseRoute = require('src/normalise/normaliseRoute')

describe('src/normalise/normaliseRoute', () => {
  const route = '/something/{variable}'
  const expected = '/something/:variable'

  it('normalises the route', () => {
    expect(normaliseRoute(route)).to.equal(expected)
  })
})
