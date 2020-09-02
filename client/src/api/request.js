import QS from 'qs'
import http from './http'

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params, type) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: params,
      // responseType: type || 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    http.post(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put (url, params) {
  return new Promise((resolve, reject) => {
    http.put(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * delete方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function Del (url, config, params) {
  return new Promise((resolve, reject) => {
    http.delete(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function DelS (url, params) {
  const formData = new FormData()
  for (const k in params) {
    formData.append(k, params[k])
  }
  return new Promise((resolve, reject) => {
    http.delete(url, {
      data: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function upload (url, params) {
  const formData = new FormData()
  for (const k in params) {
    formData.append(k, params[k])
  }
  return new Promise((resolve, reject) => {
    http.post(url,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
