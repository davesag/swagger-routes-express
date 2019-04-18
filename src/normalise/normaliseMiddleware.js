const normaliseMiddleware = (handlers = {}, names = []) =>
  names.reduce((acc, elem) => {
    if (typeof handlers[elem] === 'function') acc.push(handlers[elem])
    return acc
  }, [])

module.exports = normaliseMiddleware
