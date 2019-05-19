const summarisePaths = require('./summarisePaths')

const summariseApi = ({
  basePath,
  info: { description, title: name, version },
  paths
}) => ({
  info: { name, description, version },
  paths: summarisePaths(paths, basePath)
})

module.exports = summariseApi
