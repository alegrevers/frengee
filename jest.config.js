require('dotenv').config({
  path: '.env.test',
})

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'jest-environment-node',
  watchPathIgnorePatterns: ['globalConfig'],
  detectOpenHandles: true,
  testTimeout: 99999999,
}
