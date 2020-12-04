import { AxiosInstance } from 'axios'

export class User {
  _id?: string
  _token?: string
  _headers: any = {}
  axios?: AxiosInstance

  get pathname(): string {
    return this._id ? `/users/${this._id}` : '/users'
  }

  get headers(): any {
    if (this._token) {
      this._headers['X-LC-Session'] = this._token
    }

    return this._headers
  }

  setClient(axios: AxiosInstance) {
    this.axios = axios
  }

  object(_id: string) {
    this._id = _id
    return this
  }

  token(value: string) {
    this._token = value
    return this
  }

  get() {
    return this.axios.get(this.pathname)
  }

  me() {
    return this.axios.get('/users/me', { headers: this.headers })
  }

  signIn(data: any) {
    return this.axios.post('/login', data)
  }

  signUp(data: any) {
    return this.axios.post(this.pathname, data)
  }

  oauth({ type, data }) {
    return this.axios.post(this.pathname, { authData: { [type]: data } })
  }

  update(data: any) {
    return this.axios.put(this.pathname, data, { headers: this.headers })
  }

  updatePassword({ newPassword, oldPassword }) {
    const data = { new_password: newPassword, old_password: oldPassword }
    return this.axios.put(`${this.pathname}/updatePassword`, data, { headers: this.headers })
  }

  resetPassword(data: any) {
    return this.axios.post('/requestPasswordReset', data)
  }

  refreshToken() {
    return this.axios.put(`${this.pathname}/refreshSessionToken`, {}, { headers: this.headers })
  }

  verifyEmail(data: any) {
    return this.axios.post('/requestEmailVerify', data)
  }
}
