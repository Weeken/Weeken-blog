import axios from 'axios'
import {Alert} from 'lib/alert'
import Storage from 'lib/local_storage'

let alert = new Alert()

const Envs = {
  development: 'http://localhost:3000',
  production: 'https://weeken.top'
}

const BASE = `${Envs[process.env.NODE_ENV]}/v1/api`

const URL = {
  TOKEN: `${BASE}/token`,
  REGISTER: `${BASE}/users/register`,
  LOGIN: `${BASE}/users/login`,
  USERINFO: `${BASE}/users/userDetails`,
  RESETPASSWORD: `${BASE}/users/resetPassword`,
  CHANGEAVATAR: `${BASE}/users/changeAvatar`,

  MEMOS: `${BASE}/memos/all`,

  NOTES: `${BASE}/notes/all`,
  HOTNOTES: `${BASE}/notes/hotNotes`,
  NOTEDETAILS: `${BASE}/notes/noteDetails`,

  LIKE: `${BASE}/like/like`,
  DISLIKE: `${BASE}/like/dislike`,

  ADDCOMMENT: `${BASE}/comments/addComment`,
  COMMENTLIST: `${BASE}/comments/commentList`,
  ADDREPLY: `${BASE}/replies/addReply`,
  REPLYLIST: `${BASE}/replies/replyList`
}

function error (err, fail) {
  // 请求有响应
  if (err.response) {
    // 如果有错误处理方法
    if (fail) {
      fail(err.response.data.error, err.response.status, err.response.headers)
    } else {
      // 默认处理错误请求方法
      alert.error(err.response.data.message || err.response.status + ': ' + err.response.statusText)
    }
  } else {
    alert.error(err.message)
  }
}

async function handler (promise, fail) {
  try {
    let res = await promise
    return res.data
  } catch (err) {
    error(err, fail)
  }
}

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  let user = Storage.getItem('user')
  if (user && user.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = user.token
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  console.log(error.response)
  if (error.response.status === 401 && error.response.data.type === 'auth_error') {
    Storage.removeItem('user')
  }
  return Promise.reject(error)
})

export default {
  // 上传七牛云
  async getUpToken (fail) {
    return await handler(axios.get(URL.TOKEN), fail)
  },
  async upload (token, formdata, fail) {
    let url = `https://upload-z2.qiniup.com/?token=${token}`
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    return await handler(axios.post(url, formdata, config), fail)
  },
  async login (params, fail) {
    return await handler(axios.post(URL.LOGIN, params), fail)
  },
  async register (params, fail) {
    return await handler(axios.post(URL.REGISTER, params), fail)
  },
  async getUserInfo (id, fail) {
    let url = `${URL.USERINFO}/${id}`
    return await handler(axios.get(url), fail)
  },
  async resetPassword (id, params, fail) {
    let url = `${URL.RESETPASSWORD}/${id}`
    return await handler(axios.put(url, params), fail)
  },
  async changeAvatar (id, params, fail) {
    let url = `${URL.CHANGEAVATAR}/${id}`
    return await handler(axios.put(url, params), fail)
  },
  async getMemos (fail) {
    return await handler(axios.get(URL.MEMOS), fail)
  },
  async getNotes (page, fail) {
    return await handler(axios.get(URL.NOTES, {params: {page: page}}), fail)
  },
  async getNoteDetails (id, fail) {
    let url = `${URL.NOTEDETAILS}/${id}`
    return await handler(axios.get(url), fail)
  },
  async getHotNotes (fail) {
    return await handler(axios.get(URL.HOTNOTES), fail)
  },
  async likeNote (params, fail) {
    return await handler(axios.post(URL.LIKE, params), fail)
  },
  async dislikeNote (params, fail) {
    return await handler(axios.post(URL.DISLIKE, params), fail)
  },
  async addComment (params, fail) {
    return await handler(axios.post(URL.ADDCOMMENT, params), fail)
  },
  async getComments (noteId, fail) {
    return await handler(axios.get(URL.COMMENTLIST, {params: {id: noteId}}), fail)
  },
  async addReply (params, fail) {
    return await handler(axios.post(URL.ADDREPLY, params), fail)
  },
  async getReplies (commentId, fail) {
    return await handler(axios.get(URL.REPLYLIST, {params: {id: commentId}}), fail)
  }
}
