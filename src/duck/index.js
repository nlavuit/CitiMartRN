import { combineReducers } from 'redux'
import { REHYDRATE } from 'redux-persist/constants'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'
import { reducer as form } from 'redux-form'

const entities = (state = {}, { payload }) => {
  if (payload && payload.entities) {
    const newState = mergeWith(
      {},
      state,
      payload.entities,
      (srcValue, objValue) => {
        if (isArray(srcValue)) {
          return objValue
        }
      }
    )
    return newState
  }
  return state
}

const user = (state = {}, { type, payload }) => {
  if (payload && type === 'INIT_STATE') {
    return merge({}, state, payload.user)
  }
  return state
}

const rehyrate = (state = {}, { type, payload }) => {
  if (type === REHYDRATE) {
    return { ...state, rehydrationComplete: true }
  }
  return state
}

const reducers = combineReducers({
  form
})

const rootReducer = (state, action) => {
  return reducers(state, action)
}

export default rootReducer
