/**
 *  Given a block of security data, either return the key, if there are no scopes,
 *  or return the sorted, joined up scopes.
 *  @param data — The block of security data
 *  @return the key, if there are no scopes, or the joined up sorted scopes.
 */
const keyOrScopes = data => {
  const keys = Object.keys(data)
  if (!keys.length) return // security block has no keys
  const [key] = keys // we only care about the first key
  const scopes = data[key]
  if (!scopes.length) return key // if there are no scopes use the key instead
  return scopes.sort().join(',')
}

module.exports = keyOrScopes
