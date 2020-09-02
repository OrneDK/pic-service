import axios from 'axios'

// 1.-》切换环境
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://img.ornedk.cn'
}

// eslint-disable-next-line no-unused-vars
let loading

// function startLoading () {
//   loading = Toast.loading({
//     message: '加载中...',
//     forbidClick: true
//   })
// }

// function endLoading () {
//   Toast.clear()
// }

const http = axios.create({
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  },
  timeout: 60000,
  withCredentials: true
})
http.interceptors.request.use((config) => {
  // startLoading()
  if (config.method === 'get') {
    config.data = true
  }
  if (localStorage.token === true) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = localStorage.token
  }

  return config
}, (error) => Promise.reject(error))

http.interceptors.response.use((response) => {
  // endLoading()
  return response
}, (error) => {
  // endLoading()
  // Toast.fail('error.response.data');
  const { status } = error.response

  if (status === 500) {
    console.log('500')
    // Toast.fail('请求失败')
  }
  return Promise.reject(error)
})

export default http
