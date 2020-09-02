import {
  get, post
  , put,
  Del,
  DelS,
  upload
} from './request'

// 1.->上传图片
export const uploadImg = (p) => upload('/api/picture/upload', p)
// 2.->获取图片列表
export const getImgs = (p) => get('/api/picture/imgs', p, 'application/x-www-form-urlencoded')
// 3.->删除列表图片
export const delImg = (p) => Del(`/api/picture/delete/${p}`)
