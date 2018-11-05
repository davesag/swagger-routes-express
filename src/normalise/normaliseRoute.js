const normaliseRoute = route => route.replace(/\{/g, ':').replace(/\}/g, '')

module.exports = normaliseRoute
