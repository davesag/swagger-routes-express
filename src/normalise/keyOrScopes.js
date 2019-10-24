/**
 *  Given a block of security data, either return the key, if there are no scopes,
 *  or return the sorted, joined up scopes.
 *
 *  From the official docs
 *  > `security` is an array of hashmaps, where each hashmap contains
 *  > one or more named security schemes.
 *
 *  @param security — The array of security blocks
 *  @return the key if there are no scopes, or
 *          the joined up sorted scopes if there are scopes, or
 *          undefined if the array of blocks is empty
 */
const keyOrScopes = ([data]) => {
  if (!data) return // there is no security
  const [key] = Object.keys(data) // we only care about the first key
  const scopes = data[key] // there must be at least one key
  if (!scopes.length) return key // if there are no scopes use the key instead
  return scopes.sort().join(',')
}

module.exports = keyOrScopes

/*
security: []

=> undefined

security:
  - someKey: []

=> someKey

security:
  - someKey:
    - scope1
    - scope2

=> scope1,scope2
*/
