const substituteVariables = require('../../utils/substituteVariables')

/**
 *  given an array of servers, return a single base path.
 *  @param servers — The array of servers
 *  @param variables — a map of variable names and the values to be substituted
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
