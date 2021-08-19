const normalisePath = require('../../normalise/normalisePath')

const ROOT = 'root'

const pathBuilder =
  basePath =>
  (rawPath, { tags }) =>
    Array.isArray(tags) && tags[0] === ROOT
      ? normalisePath(rawPath)
      : `${basePath}${normalisePath(rawPath)}`

module.exports = pathBuilder
