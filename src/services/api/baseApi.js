// import Config from 'react-native-config'
import orderBy from 'lodash/orderBy'
import HmacSHA256 from 'crypto-js/hmac-sha256'
import { HttpRequest } from '@core'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

export default class BaseApi extends HttpRequest {
  constructor({ getState }) {
    super()
    this._getState = getState
    this.setupConfig()
  }

  setupConfig() {
    const isProduction = this._getState().settings
      ? this._getState().settings.isProduction
      : false
    if (isProduction === true) {
      this._apiUrl = 'https://api.trustcircleglobal.com'
      this._uploadUrl = 'https://upload.trustcircleglobal.com'
      this._apiKey = '3f8ae032a0c54b0b9ad492a21385cb5b'
      this._apiSecret = 'cf4be1d7c89746d1ad4b2d0ce5c2a0a6'
    } else {
      this._apiUrl = 'https://api-stage.trustcircleglobal.com'
      this._uploadUrl = 'https://upload.trustcircleglobal.com'
      this._apiKey = 'f54eedf1d0714615ac04d2915b1720c1'
      this._apiSecret = 'b40a4a3f1a9d4b8bb3585233a63f0ed9'
    }
  }

  parseResponse(response, schema = null) {
    if (!response.data) {
      const error = response.error
      throw error
    }
    const camelizedJson = camelizeKeys(response.data)
    if (schema !== null) {
      const payload = normalize(camelizedJson, schema)
      const nextUrl = response.pagination ? response.pagination.next_url : null
      return { payload, nextUrl }
    } else {
      const payload = normalize(camelizedJson)
      return { payload }
    }
  }

  _genegrateApiSignature(endpoint, body) {
    let input = endpoint
    const data = {
      ...body,
      api_key: this._apiKey,
    }

    orderBy(Object.keys(data)).map(key => (input += `|${key}=${data[key]}`))
    console.log('api key ' + this._apiKey + ' ' + this._apiSecret + ' ' + input)

    return HmacSHA256(input, this._apiSecret).toString()
  }

  normalRequest({ method = 'GET', path = '' }) {
    this.setupConfig()

    return this.request({
      method,
      path: `${this._apiUrl}${path}`,
    })
  }

  requestWithToken({
    method = 'GET',
    path = '',
    fields = '',
    query = {},
    body = {},
  }) {
    this.setupConfig()
    const accessToken = this._getState().session.accessToken

    return this.request({
      method,
      path: `${this._apiUrl}${path}`,
      query: {
        ...query,
        access_token: accessToken,
        fields,
      },
      body,
    })
  }

  requestSig({ method = 'GET', path = '', query = {}, body = {} }) {
    const apiSig = this._genegrateApiSignature(path, body)
    this.setupConfig()

    return this.request({
      method,
      path: `${this._apiUrl}${path}`,
      query: {
        ...query,
        api_key: this._apiKey,
        api_sig: apiSig,
      },
      body,
    })
  }
}
