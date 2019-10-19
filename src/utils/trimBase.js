/**
 * Trim the trailing / off the base if it exists
 * @param base — A base path maybe ending with '/'
 * @returns the base path without the trailing /
 */
const trimBase = base => (base.endsWith('/') ? base.slice(0, -1) : base)

module.exports = trimBase
