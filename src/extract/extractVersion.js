const { major, coerce } = require('semver')

const extractVersion = ({ swagger, openapi }) =>
  swagger && parseInt(major(coerce(swagger))) === 2
    ? 2
    : openapi && parseInt(major(coerce(openapi))) === 3
      ? 3
      : undefined

module.exports = extractVersion
