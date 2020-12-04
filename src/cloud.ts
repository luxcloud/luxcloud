import { AxiosInstance } from 'axios'
import { Query } from './query'
import { User } from './user'

class Cloud {
  axios?: AxiosInstance

  get user() {
    const user = new User()
    user.setClient(this.axios)

    return user
  }

  constructor() {
  }

  setClient(axios: AxiosInstance) {
    this.axios = axios
  }

  _(className) {
    const query = new Query(className)
    query.setClient(this.axios)

    return query
  }
}

export default new Cloud()
