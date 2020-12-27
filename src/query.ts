import { AxiosInstance } from 'axios'

type Params = {
  [key: string]: string | number
}

export class Query {
  className: string
  objectId?: string
  _token?: string
  _headers: any = {}
  axios?: AxiosInstance

  private _skip?: number
  private _limit?: number
  private _count?: number
  private _order?: string
  private _where?: string
  private _include? :string
  private _keys?: string

  get pathname(): string {
    return !this.objectId
      ? `/classes/${this.className}`
      : `/classes/${this.className}/${this.objectId}`
  }

  get headers(): any {
    if (this._token) {
      this._headers['X-LC-Session'] = this._token
    }

    return this._headers
  }

  get params(): Params {
    const parameters: Params = {}

    if (this._skip >= 0) { parameters.skip = this._skip }
    if (this._limit >= 0) { parameters.limit = this._limit }
    if (this._count) { parameters.count = this._count }
    if (this._order) { parameters.order = this._order }
    if (this._where) { parameters.where = JSON.stringify(this._where) }
    if (this._include) { parameters.include = this._include }
    if (this._keys) { parameters.keys = this._keys }

    return parameters
  }

  constructor(className: string) {
    this.className = className
  }

  setClient(axios: AxiosInstance) {
    this.axios = axios
  }

  skip(value: number) {
    this._skip = Number(value)
    return this
  }

  object(objectId: string) {
    this.objectId = objectId
    return this
  }

  token(value: string) {
    this._token = value
    return this
  }

  limit(value: number) {
    this._limit = Number(value)
    return this
  }

  count() {
    this._count = 1
    return this.limit(0).get()
  }

  order(data: string) {
    this._order = data
    return this
  }

  where(data: any) {
    this._where = data
    return this
  }

  whereIn(...args) {
    const [values, key = 'objectId'] = args.reverse()
    return this.where({ [key]: { $in: values } })
  }

  include(data: string) {
    this._include = data
    return this
  }

  keys(data: string) {
    this._keys = data
    return this
  }

  get() {
    return this.axios.get(this.pathname, { params: this.params, headers: this.headers })
  }

  insert(data: any) {
    return this.axios.post(this.pathname, data, { headers: this.headers })
  }

  update(data: any) {
    return this.axios.put(this.pathname, data, { params: this.params, headers: this.headers })
  }

  delete() {
    return this.axios.delete(this.pathname, { params: this.params, headers: this.headers })
  }
}
