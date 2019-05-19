const summarisePaths = require('./summarisePaths')
const basePath = require('../../extract/v3/basePath')

const summariseApi = ({
  servers = [],
  variables = {},
  info: { description, title: name, version },
  paths
}) => ({
  info: { name, description, version },
  paths: summarisePaths(paths, basePath(servers, variables))
})

module.exports = summariseApi
