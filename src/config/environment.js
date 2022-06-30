let environments = {
  APP_NAME: process.env.REACT_APP_NAME,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  API_BASE_PATH: process.env.REACT_APP_API_BASE_PATH,
  API_URL:
    process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_BASE_PATH,
}

environments.endpoint = (path) => {
  return environments.API_URL + "/" + path?.replace(/^\/+/, "")
}

export default environments
