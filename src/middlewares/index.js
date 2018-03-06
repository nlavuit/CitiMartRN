import thunk from './thunk'

const options = {}

export default [thunk(options)]

export const Injector = {
  inject: opts => Object.assign(options, opts || {}),
}
