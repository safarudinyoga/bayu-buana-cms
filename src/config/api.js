import axios from "axios"
import Cookies from "js-cookie"
import env from "./environment"
var queryString = require('qs');

export default class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: env.API_URL,
      withCredentials: true,
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
      let data = queryString.stringify({
				client_id: "my-client-id",
				client_secret: "password",
				grant_type: "refresh_token",
				refresh_token: token,
			})

      let res = await axios.post(env.API_BASE_URL+"/oauth2/token", data, {
        headers: {
          "Accept": "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
        }
      })

      let date = new Date();
			date.setTime(date.getTime() + (res.data.expires_in));
      Cookies.set('ut', res.data.access_token, {expires: date})
      Cookies.set('rt', res.data.refresh_token)

      return res.data.access_token
    } catch (err) {
      console.log(err)
      Cookies.remove("ut");
      Cookies.remove("rt");
      this.props.history.push("/auth/login");
    }
  }
}
