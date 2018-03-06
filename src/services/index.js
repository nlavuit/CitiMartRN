import * as ApiServices from './api'

export default (options = {}) => {
  return {
    apiServices: Object.keys(ApiServices).reduce((acc, key) => {
      acc[key] = new ApiServices[key](options)
      return acc
    }, {}),
  }
}
