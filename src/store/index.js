import React from 'react'
import { AsyncStorage, PureComponent } from '@core'
import { connect as reactReduxConnect, Provider } from 'react-redux'
import {
  applyMiddleware,
  bindActionCreators as reduxBindActionCreators,
  createStore,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import createMigration from 'redux-persist-migrate'
import immutableTransform from 'redux-persist-transform-immutable'
import middlewares, { Injector } from '@middlewares'
import migration from './migration'
import reducers from '@duck'
import services from '@services'

const STORE = createStore(
  reducers,
  undefined,
  composeWithDevTools(
    createMigration(migration, 'settings'),
    applyMiddleware(
      ...middlewares,
      createLogger({
        predicate: () => __DEV__,
        collapsed: true,
        duration: true,
      })
    ),
    autoRehydrate(),
    next => (reducers, initialState, enhancer) => {
      const nextStore = next(reducers, initialState, enhancer)
      const { getState } = nextStore
      Injector.inject({
        getState,
        ...services({ getState }),
      })
      return nextStore
    }
  )
)
persistStore(STORE, {
  storage: AsyncStorage,
  transforms: [immutableTransform()],
})

export default class Store extends PureComponent {
  render() {
    return <Provider store={STORE}>{this.props.children}</Provider>
  }
}

export const bindActionCreators = reduxBindActionCreators

export const connect = (
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
) => WrappedComponent => {
  mapStateToProps =
    mapStateToProps ||
    function () {
      return {}
    }
  const wrappedMapStateToProps = (state, ownProps) => {
    //const { locale } = state.settings
    return Object.assign(
      {
        __locale__: null//locale,
      },
      mapStateToProps(state, ownProps)
    )
  }
  return reactReduxConnect(
    wrappedMapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(WrappedComponent)
}
