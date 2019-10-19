// ref https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityRequirementObject

/**
 *  Normalises the supplied security object into a string.
 *
 * @param security — The security object, or undefined
 * @returns a string representation of the security, or undefined if the
 *          security was undefined
 */
const normaliseSecurity = security =>
  security
    ? Object.values(security[0])[0]
        .sort()
        .join(',')
    : undefined

module.exports = normaliseSecurity
