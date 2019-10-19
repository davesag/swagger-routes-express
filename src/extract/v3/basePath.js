const substituteVariables = require('../../utils/substituteVariables')

/**
 *  given an array of servers, return a single base path.
 *  @param servers — The ararray of servers
 *  @param variables — a mamap of variable names and their values to be substituted
 *  @returns the eventual base path
 */
const basePath = (servers, variables) =>
  Array.isArray(servers)
    ? servers.reduce(
        (acc, { url }) =>
          acc !== '' || !url.startsWith('/')
            ? acc
            : substituteVariables(url, variables),
        ''
      )
    : undefined

module.exports = basePath
