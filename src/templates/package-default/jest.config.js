// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: [path.join(__dirname, 'jest.setup.ts')],
  globals: {
    'ts-jest': {
      tsConfig: path.join(__dirname, 'tsconfig.test.json')
    }
  },
  collectCoverage: true,
  coverageDirectory: '.coverage',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/']
}
