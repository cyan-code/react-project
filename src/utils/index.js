// axios 二次封装
import axios from 'axios'

// 区分开发环境和生产环境
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9527' : '真实接口'

// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 5000
})

// 设置请求拦截
service.interceptors.request.use(config =>{
  config.headers = {
    'x-token': 'CyanCyanCyanCyanCyanCyanCyanCyan' // 添加token
  }
  return config
})

// 请求拦截
service.interceptors.response.use(res => {
  if (res.status >= 200 && res.status < 300) {
    // 请求成功！
    const resData = res.data
    if (resData.code === 200) {
      return resData.data
    } else {
      // token失效，需要：
      // 删除本地LS存储的用户数据
      // 删除redux store
      // 跳转登录页
      return Promise.reject(resData)
    }
  } else {
    // 请求失败
    return Promise.reject(res)
  }
})

export default service