import axios from 'axios'

axios.defaults.withCredentials = true

// const baseUrl = '	http://127.0.0.1:4523/mock/1038100'
const baseUrl = 'http://127.0.0.1:9090'
// const baseUrl = location.protocol + '//' + window.location.host

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.withCredentials = true
  }

  getConfig () {
    const config = {
      baseUrl: this.baseUrl,
      header: {}
    }
    return config
  }

  interceptors (instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getConfig(), options)
    options.url = options.baseUrl + options.url
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)
