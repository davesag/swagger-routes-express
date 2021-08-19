const extractVersion = require('../extract/extractVersion')
const ERRORS = require('../errors')
const summariseApiV2 = require('./v2/summariseApi')
const summariseApiV3 = require('./v3/summariseApi')

/**
 *  Summarises the given API into the form
 *  {
 *    info: { name, description, version },
 *    paths: { [method]: ['/', '/ping', '/v1/api/function/:param'] }
 *  }
 *
 *  @param {object} apiDefinition The imported YML or JSON api document.
 *  @param {object} options Object holding an optional `INVALID_VERSION` message.
 *  @returns {object} API summary object in the form `{ info, paths }`
 */
const summarise = (apiDefinition, options = {}) => {
  const { INVALID_VERSION = ERRORS.INVALID_VERSION } = options
  const version = extractVersion(apiDefinition)
  if (!version) throw new Error(INVALID_VERSION)

  const summariseApi = version === 2 ? summariseApiV2 : summariseApiV3

  return summariseApi(apiDefinition)
}

module.exports = summarise
