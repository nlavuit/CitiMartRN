require('es6-promise').polyfill()
require('fetch-everywhere')
//import RNFetchBlob from '../../components/RNFetchBlob'
import { post } from 'axios'

import * as Utils from '../../libs/utils'

export default class HttpRequest {
  constructor() {
    this._endPoint = ''
  }

  buildHeaders(headers) {
    const language = this._getState().settings.locale
    return Object.assign(
      {
        'x-tcg-language': language,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      headers || {}
    )
  }

  buildUrl(path, query) {
    query = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key])}`)
      .join('&')
    return `${path || ''}${query ? '?' + query : ''}`
  }

  get(path, query, headers) {
    return this.request({
      method: 'GET',
      path,
      query,
      headers,
    }).then(res => {
      const object = Utils.idx(res, res => res.object)
      const objects = Utils.idx(res, res => res.objects)
      if (object) {
        return object
      }
      if (objects) {
        return objects
      }
      return null
    })
  }

  post(path, body, headers) {
    return this.request({
      method: 'POST',
      path,
      body,
      headers,
    }).then(res => Utils.idx(res, res => res.results.object))
  }

  printCurl(method, url, payload) {
    // console.log(url, payload)
    const language = this._getState().settings.locale
    if (method == 'GET') {
      console.log(url, payload)
    } else {
      const header =
        " -H 'x-tcg-language: '" +
        language +
        " -H 'Content-Type: application/json' "
      var str =
        'curl -i -X ' +
        method +
        header +
        " -d '" +
        payload.body +
        "' '" +
        url +
        "'"
      console.log(str)
    }
  }

  request({ method, path, query = {}, headers = {}, body = {} }) {
    headers = Object.assign({}, this.buildHeaders(), headers || {})
    // const url = /^(http|https):\/\//.test(path)
    //   ? path
    //   : this.buildUrl(path, query)
    const url = this.buildUrl(path, query)
    var payload = {
      method: method,
      headers: this.buildHeaders(headers),
    }
    if (method !== 'GET' && method !== 'HEAD') {
      payload.body = JSON.stringify(body)
    }
    this.printCurl(method, url, payload)

    return fetch(url, payload)
      .then(res => {
        return res
      })
      .then(res => Utils.idx(res, res => res.json().catch(() => null)))
  }

  // uploadImageIOS(url, fileInfo) {
  //   var formData = new FormData()
  //   const name = new Date().getTime() + '.jpg'
  //   formData.append('file', {
  //     uri: fileInfo.uri,
  //     name: fileInfo.name,
  //     type: 'application/octet-stream',
  //   })

  //   return fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'content-type':
  //         'multipart/form-data; boundary=Boundary-' + new Date().getTime(),
  //       'x-tcg-language': 'vi',
  //     },
  //     body: formData,
  //   })
  //     .then(res => {
  //       return res
  //     })
  //     .then(res => Utils.idx(res, res => res.json().catch(() => null)))
  // }

  // uploadImage(url, fileInfo) {
  //   console.log('upload image: ', fileInfo)
  //   return RNFetchBlob.fetch(
  //     'POST',
  //     url,
  //     {
  //       'x-tcg-language': 'vi',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     [
  //       {
  //         name: 'file',
  //         filename: fileInfo.name,
  //         type: 'image/jpeg',
  //         data: RNFetchBlob.wrap(fileInfo.uri),
  //       },
  //     ]
  //   )
  //     .then(resp => {
  //       console.log('upload: ', resp.text())
  //       return resp.json()
  //     })
  //     .catch(err => {})
  // }
}
