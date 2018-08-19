const makeFakeApi = (fields = {}) => {
  const fakeApi = {
    basePath: '/api',
    paths: {
      '/': {
        get: {
          operationId: 'versions',
          tags: ['root']
        }
      },
      '/ping': {
        get: {
          operationId: 'something',
          security: [
            {
              something: ['identity.basic', 'identity.email', 'admin']
            }
          ],
          tags: ['root']
        }
      },
      '/whatever': {
        get: {
          tags: ['special']
        }
      }
    }
  }

  return { ...fakeApi, ...fields }
}

module.exports = makeFakeApi
