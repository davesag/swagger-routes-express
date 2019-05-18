module.exports = function(config) {
  config.set({
    mutate: [
      'src/**/*.js',
      '!src/constants.js',
      '!src/errors.js',
      '!src/connectors/connectSecurity.js'
    ],
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['clear-text', 'progress'],
    testRunner: 'mocha',
    mochaOptions: {
      spec: ['./test/unit/**/*.test.js'],
      require: ['./test/unitTestHelper.js']
    },
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    thresholds: { high: 80, low: 70, break: null }
  })
}
