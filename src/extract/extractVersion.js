const { major, coerce } = require('semver')

/**
 *  Determins whether to use version 2 or 3 given the version defined in the supplied swagger document.
 *  @param an object with keys `swagger` or `openapi`
 *  @returns 2 if the document is a swagger version 2 document,
 *           3 if it's an openapi version 3 document, or undefined otherwise.
 */
const extractVersion = ({ swagger, openapi }) =>
  swagger && parseInt(major(coerce(swagger))) === 2
    ? 2
    : openapi && parseInt(major(coerce(openapi))) === 3
    ? 3
    : undefined

module.exports = extractVersion
