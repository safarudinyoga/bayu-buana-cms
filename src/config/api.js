import axios from "axios"
import Cookies from "js-cookie"
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
    const auth = Cookies.get('ut')
    this.axios.defaults.headers.common["Accept"] = "application/json"
    this.axios.defaults.headers.common["Accept-Language"] = "en"
    // this.axios.defaults.headers.common["X-User-ID"] =
    // "2e93596b-a8e1-4bb0-b7fd-1315cb37c7c3"
    if (auth) {
      this.axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`
      this.axios.defaults.headers.get["Authorization"] = `Bearer ${auth}`
      this.axios.defaults.headers.post["Authorization"] = `Bearer ${auth}`
      this.axios.defaults.headers.put["Authorization"] = `Bearer ${auth}`
      this.axios.defaults.headers.delete["Authorization"] = `Bearer ${auth}`
    }
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

  post(path, data, config = null) {
    let headers
    if (data instanceof FormData) {
      if(!config){
        headers = {
          "Content-type": "multipart/form-data",
        }
      } else {
        headers = config
        headers["Content-type"] = "multipart/form-data"
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

  async refreshToken(token) {
    try {
      console.log(env)
      let res = await axios.post(env.API_BASE_URL+"/oauth2/token", {
        client_id: "my-client-id",
        client_secret: "password",
        grant_type: "refresh_token",
        refresh_token: token,
      },  {
        headers: {
          'Content-Type': "application/x-www-form-urlencoded",
        }
      })

      console.log(res)
    } catch (err) {
      throw err
    }
  }
}
