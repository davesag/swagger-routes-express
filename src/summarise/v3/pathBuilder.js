const normalisePath = require('../../normalise/normalisePath')

const prependPath = (base, path) =>
  base.endsWith('/') ? `${base.slice(0, -1)}${path}` : `${base}${path}`

const detailSummariser =
  base =>
  (path, { servers }) =>
    Array.isArray(servers) && servers.length
      ? `${prependPath(servers[0].url, normalisePath(path))}`
      : `${prependPath(base, normalisePath(path))}`

module.exports = detailSummariser
