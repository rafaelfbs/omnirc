// eslint-disable-next-line import/no-extraneous-dependencies
import { GlobalWithFetchMock } from 'jest-fetch-mock'

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock
// eslint-disable-next-line import/no-extraneous-dependencies
customGlobal.fetch = require('jest-fetch-mock')

customGlobal.fetchMock = customGlobal.fetch

/**
 * Suppress React 16.8 act() warnings globally.
 * The react teams fix won't be out of alpha until 16.9.0.
 */
// eslint-disable-next-line no-console
const consoleError = console.error
// eslint-disable-next-line no-undef
jest.spyOn(console, 'error').mockImplementation((...args) => {
  if (
    !args[0].includes(
      'Warning: An update to %s inside a test was not wrapped in act'
    )
  ) {
    consoleError(...args)
  }
})
