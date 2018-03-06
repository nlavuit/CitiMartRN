import * as Immutable from './immutable'
import { isEqual } from 'lodash'

export const deepEqual = (a, b, comparator = _comparator) => {
  if (comparator(a, b)) {
    return true
  }
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], comparator)) {
        return false
      }
    }
    return true
  }
  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (
      aKeys.length !== bKeys.length ||
      aKeys.sort().join(',') !== bKeys.sort().join(',')
    ) {
      return false
    }
    const keys = aKeys
    for (let i = 0; i < keys.length; i++) {
      if (!deepEqual(a[keys[i]], b[keys[i]], comparator)) {
        return false
      }
    }
    return true
  }
  return comparator(a, b)
}

export const idx = (obj, callback = _obj => {}) => {
  try {
    return callback(obj)
  } catch (ignore) {}
  return undefined
}

export const isArray = items => {
  return Array.isArray(items)
}

export const isFunction = (obj = null) => {
  return obj !== null && obj instanceof Function
}

export const isImmutable = Immutable.isImmutable

export const isObject = (item = null) => {
  return item !== null && typeof item === 'object' && !isArray(item)
}

export const isString = (item = null) => {
  return item !== null && typeof item === 'string'
}

export const merge = (...args) => {
  const target = args[0]
  args
    .filter((value, key) => key > 0)
    .forEach(value => _mergeAPair(target, value))
  return target
}

export const shallowEqual = (a, b, comparator = _comparator, excludes = []) => {
  if (comparator(a, b)) {
    return true
  }
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      if (!comparator(a[i], b[i])) {
        return false
      }
    }
    return true
  }
  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (
      aKeys.length !== bKeys.length ||
      aKeys.sort().join(',') !== bKeys.sort().join(',')
    ) {
      return false
    }
    const keys = aKeys.filter(key => excludes.indexOf(key) < 0)
    for (let i = 0; i < keys.length; i++) {
      if (!comparator(a[keys[i]], b[keys[i]])) {
        return false
      }
    }
    return true
  }
  return comparator(a, b)
}

const _comparator = (a, b) => {
  if (isImmutable(a) && isImmutable(b)) {
    return a === b
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }
  if (a instanceof Function && b instanceof Function) {
    return true
  }
  return isEqual(a, b)
}

const _mergeAPair = (target, source) => {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        _mergeAPair(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    })
  }
  return target
}
