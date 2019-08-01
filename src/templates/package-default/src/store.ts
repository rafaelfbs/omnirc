import { createStore, combineReducers, compose } from 'redux'

export function configureStore(preloadedState = {}, enhancers = []) {
  /* eslint-disable no-underscore-dangle */
  const reducer = combineReducers({
    /* ADD YOUR REDUCERS HERE */
  })

  const devTools =
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()

  const enhancer = compose(
    ...enhancers,
    devTools
  )

  return createStore(reducer, preloadedState, enhancer as any)
  /* eslint-enable no-underscore-dangle */
}
