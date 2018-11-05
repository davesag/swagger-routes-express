const { expect } = require('chai')

const substituteVariables = require('src/utils/substituteVariables')

describe('src/utils/substituteVariables', () => {
  const variables = { test: 'a-test' }
  const string = 'this-is-{test}'
  const expected = 'this-is-a-test'

  let result

  before(() => {
    result = substituteVariables(string, variables)
  })

  it('did not alter the original string', () => {
    expect(string).not.to.equal(result)
  })

  it('returned the expected result', () => {
    expect(result).to.equal(expected)
  })
})
