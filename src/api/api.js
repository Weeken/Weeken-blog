import axios from 'axios'
import {Alert} from '../lib/alert'

let alert = new Alert()

const Envs = {
  development: 'http://localhost:3000',
  // development: 'http://192.168.0.104:3000',
  production: 'http://118.89.51.110:3000'
}

const Env = Envs[process.env.NODE_ENV]

const URL = {
  TOKEN: `${Env}/token`,
  REGISTER: `${Env}/users/register`,
  LOGIN: `${Env}/users/login`,

  MEMOS: `${Env}/memos/all`,
  ADDMEMO: `${Env}/memos/addMemos`,
  MEMOLIST: `${Env}/memos/memoList`,
  DELETEMEMO: `${Env}/memos/deleteMemos/`,

  NOTES: `${Env}/notes/all`,
  HOTNOTES: `${Env}/notes/hotNotes`,
  ADDNOTE: `${Env}/notes/addNotes`,
  NOTEDETAILS: `${Env}/notes/noteDetails/`,
  UPDATENOTE: `${Env}/notes/updateNote/`,
  DELETENOTE: `${Env}/notes/deleteNotes/`
}

function error (err, fail) {
  // 请求有响应
  if (err.response) {
    // 如果有错误处理方法
    if (fail) {
      fail(err.response.data.error, err.response.status, err.response.headers)
    } else {
      // 默认处理错误请求方法
      alert.error(err.response.data.message || err.response.data.status + ':' + err.response.data.error)
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

export default {
  // 上传七牛云
  async getUpToken (fail) {
    return await handler(axios.get(URL.TOKEN), fail)
  },
  async upload (token, formdata, fail) {
    let url = `http://up-z2.qiniu.com/?token=${token}`
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
  async getMemos (fail) {
    return await handler(axios.get(URL.MEMOS), fail)
  },
  async getNotes (page, fail) {
    return await handler(axios.get(URL.NOTES, {params: {page: page}}), fail)
  },
  async getHotNotes (fail) {
    return await handler(axios.get(URL.HOTNOTES), fail)
  },
  // 管理后台
  // 便笺管理
  async getMemoList (page, fail) {
    return await handler(axios.get(URL.MEMOLIST, {params: {page: page}}), fail)
  },
  async addMemos (params, fail) {
    return await handler(axios.post(URL.ADDMEMO, params), fail)
  },
  async deleteMemo (id, fail) {
    let url = `${URL.DELETEMEMO}${id}`
    return await handler(axios.delete(url), fail)
  },
  // 笔记管理
  async addNotes (params, fail) {
    return await handler(axios.post(URL.ADDNOTE, params), fail)
  },
  async getNoteDetails (id, fail) {
    let url = `${URL.NOTEDETAILS}${id}`
    return await handler(axios.get(url), fail)
  },
  async updateNote (id, params, fail) {
    let url = `${URL.UPDATENOTE}${id}`
    return await handler(axios.put(url, params), fail)
  },
  async deleteNote (id, fail) {
    let url = `${URL.DELETENOTE}${id}`
    return await handler(axios.delete(url), fail)
  },
}
