import axios from "axios"
import env from "./environment"

export default class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: env.API_URL,
    })
    this.initialize()
    this.env = env
  }

  initialize() {
    this.axios.defaults.headers.common["Accept"] = "application/json"
    this.axios.defaults.headers.common["Accept-Language"] = "en"
    this.axios.defaults.headers.common["X-User-ID"] =
      "2e93596b-a8e1-4bb0-b7fd-1315cb37c7c3"
  }

  get(path, params) {
    return this.axios.get(path, {params}).catch((error) => {
      throw error
    })
  }

  put(path, data) {
    let headers
    if (data instanceof FormData) {
      headers = {
        "Content-type": "multipart/form-data",
      }
    }

    return this.axios.put(path, data, headers).catch((error) => {
      throw error
    })
  }

  post(path, data) {
    let headers
    if (data instanceof FormData) {
      headers = {
        "Content-type": "multipart/form-data",
      }
    }

    return this.axios.post(path, data, headers).catch((error) => {
      throw error
    })
  }

  putOrPost(path, id, data) {
    let suffix = id ? "/" + id : ""
    let method = id ? "put" : "post"
    return this[method](path + suffix, data)
  }

  delete(path, params) {
    return this.axios.delete(path, {params}).catch((error) => {
      throw error
    })
  }
}
