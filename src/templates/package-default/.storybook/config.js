import * as React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { configureViewport } from '@storybook/addon-viewport'

import { ProviderDecorator } from '../src/shared/provider.decorator'
import { configureStore } from '../src/store'

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.[jt]sx?$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
configureViewport()

const initialState = {
  /* ADD YOUR INITIAL STATE HERE */
}

const store = configureStore(initialState)

addDecorator(story => (
  <ProviderDecorator store={store}>{story()}</ProviderDecorator>
))
