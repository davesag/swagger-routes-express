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
 *  @param apiDoc The imported YML or JSON api document.
 *  @options Optional INVALID_VERSION message.
 *  @return { info, paths } API summary object.
 */
const summarise = (apiDoc, options = {}) => {
  const { INVALID_VERSION = ERRORS.INVALID_VERSION } = options
  const version = extractVersion(apiDoc)
  if (!version) throw new Error(INVALID_VERSION)

  const summariseApi = version === 2 ? summariseApiV2 : summariseApiV3

  return summariseApi(apiDoc)
}

module.exports = summarise
