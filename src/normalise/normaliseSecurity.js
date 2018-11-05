const normaliseSecurity = security =>
  security
    ? Object.values(security[0])[0]
        .sort()
        .join(',')
    : undefined

module.exports = normaliseSecurity
