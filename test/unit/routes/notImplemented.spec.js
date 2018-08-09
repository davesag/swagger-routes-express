const routeTests = require('./routeTests')

const notImplemented = require('../../../src/routes/notImplemented')

describe('src/routes/notImplemented', () => {
  routeTests(notImplemented, 501)
})
