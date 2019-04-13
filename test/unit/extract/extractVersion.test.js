const { expect } = require('chai')

const extractVersion = require('src/extract/extractVersion')

describe('src/utils/extractVersion', () => {
  context('given swagger', () => {
    const doTest = ([swagger, expected]) => {
      context(`given version ${swagger}`, () => {
        const doc = { swagger }
        it(`returns ${expected}`, () => {
          expect(extractVersion(doc)).to.equal(expected)
        })
      })
    }
    ;[
      ['2.0.0', 2],
      ['2', 2],
      ['2.0.1', 2],
      ['3', undefined],
      [undefined, undefined],
      [null, undefined]
    ].forEach(doTest)
  })

  context('given openapi', () => {
    const doTest = ([openapi, expected]) => {
      context(`given version ${openapi}`, () => {
        const doc = { openapi }
        it(`returns ${expected}`, () => {
          expect(extractVersion(doc)).to.equal(expected)
        })
      })
    }
    ;[
      ['3.0.0', 3],
      ['3', 3],
      ['3.0.1', 3],
      ['2', undefined],
      [undefined, undefined],
      [null, undefined]
    ].forEach(doTest)
  })
})
