// ref https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityRequirementObject
const normaliseSecurity = security =>
  security
    ? Object.values(security[0])[0]
        .sort()
        .join(',')
    : undefined

module.exports = normaliseSecurity
