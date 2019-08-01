import * as React from 'react'
import { ProviderDecorator } from './shared/provider.decorator'
import { configureStore } from './store'

const store = configureStore()

const AppComponent = () => (
  <ProviderDecorator store={store}>
    {/* ADD YOUR COMPONENTS HERE */}
  </ProviderDecorator>
)

export { AppComponent }
