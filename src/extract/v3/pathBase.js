const basePath = require('./basePath')

/**
 *  Works out the path specific base path
 *  @param servers — The list of servers for the path
 *  @param variables — The variables to susubstitute (if any)
 *  @param defaultPath — The default path to use if the base path if there are no servers.
 *  @returns the base path, or the default, or an empty string.
 */
const pathBase = (servers, variables, defaultPath) =>
  (servers ? basePath(servers, variables) : defaultPath) || ''

module.exports = pathBase
