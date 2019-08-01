import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

const ProviderDecorator = ({ children, store }: any) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
)

export { ProviderDecorator }
