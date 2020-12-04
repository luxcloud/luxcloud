import axios from 'axios'
import cloud from './cloud'
export { Pointer } from './types/pointer'
const baseURL = process.env.LEANCLOUD_BASE_URL

class Configuration {
  appId: string
  appKey: string
  baseURL: string

  constructor({ appId, appKey }) {
    this.appId = appId
    this.appKey = appKey
    this.baseURL = baseURL || `https://${appId.slice(0, 8)}.api.lncldglobal.com/1.1`
  }
}

export function setup({ appId, appKey }) {
  const { baseURL } = new Configuration({ appId, appKey })
  cloud.setClient(axios.create({
    baseURL,
    headers: {
      'X-LC-Id': appId,
      'X-LC-Key': appKey
    }
  }))

  return cloud
}
