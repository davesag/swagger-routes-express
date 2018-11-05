const routeTests = require('./routeTests')

const notFound = require('src/routes/notFound')

describe('src/routes/notFound', () => {
  routeTests(notFound, 404)
})
