const normalisePath = path => path.replace(/\{/g, ':').replace(/\}/g, '')

module.exports = normalisePath
