const pathBuilder = require('./pathBuilder')

const summarisePaths = (paths, basePath) => {
  const buildPath = pathBuilder(basePath)
  const pathKeys = Object.keys(paths)

  return pathKeys.reduce((acc, elem) => {
    const pathData = paths[elem] // pathData is of the form { [method]: { servers, ..etc } }
    const methods = Object.keys(pathData)

    methods.forEach(method => {
      const path = buildPath(elem, pathData[method])
      acc[method] = acc[method] || []
      acc[method].push(path)
    })
    return acc
  }, {})
}

module.exports = summarisePaths
