const substituteVariables = require('../../utils/substituteVariables')

/*
  given an array of servers, return a single base path.
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
