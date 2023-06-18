import axios from './axios'

export default {
  getAdminHome: (param) => {
    return axios.request({
      url: '/admin/home/home',
      method: 'post',
      data: param
    })
  },
  timeline: (param) => {
    return axios.request({
      url: '/admin/user/timeline',
      method: 'post',
      data: param
    })
  },
  currentRegisterStatus: (param) => {
    return axios.request({
      url: '/admin/systemStatus/currentRegisterStatus',
      method: 'post',
      data: param
    })
  },
  changeRegisterSwitch: (param) => {
    return axios.request({
      url: '/admin/systemStatus/changeRegisterSwitch',
      method: 'post',
      data: param
    })
  },
  slogList: (param) => {
    return axios.request({
      url: '/admin/slog/list',
      method: 'post',
      data: param
    })
  },
  slogInf: (param) => {
    return axios.request({
      url: '/admin/slog/info',
      method: 'post',
      data: param
    })
  },
  slogReview: (param) => {
    return axios.request({
      url: '/admin/slog/review',
      method: 'post',
      data: param
    })
  },
  slogUpdate: (param) => {
    return axios.request({
      url: '/admin/slog/update',
      method: 'post',
      data: param
    })
  },
  slogDelete: (param) => {
    return axios.request({
      url: '/admin/slog/delete',
      method: 'post',
      data: param
    })
  },
  articleList: (param) => {
    return axios.request({
      url: '/admin/article/list',
      method: 'post',
      data: param
    })
  },
  articleInf: (param) => {
    return axios.request({
      url: '/admin/article/info',
      method: 'post',
      data: param
    })
  },
  articleTop: (param) => {
    return axios.request({
      url: '/admin/article/top',
      method: 'post',
      data: param
    })
  },
  articleAdd: (param) => {
    return axios.request({
      url: '/admin/article/add',
      method: 'post',
      data: param
    })
  },
  articleUpdate: (param) => {
    return axios.request({
      url: '/admin/article/update',
      method: 'post',
      data: param
    })
  },
  articleDelete: (param) => {
    return axios.request({
      url: '/admin/article/delete',
      method: 'post',
      data: param
    })
  },
  userList: (param) => {
    return axios.request({
      url: '/admin/user/list',
      method: 'post',
      data: param
    })
  },
  userInf: (param) => {
    return axios.request({
      url: '/admin/user/info',
      method: 'post',
      data: param
    })
  },
  userAdd: (param) => {
    return axios.request({
      url: '/admin/user/add',
      method: 'post',
      data: param
    })
  },
  userUpdate: (param) => {
    return axios.request({
      url: '/admin/user/update',
      method: 'post',
      data: param
    })
  },
  userDelete: (param) => {
    return axios.request({
      url: '/admin/user/delete',
      method: 'post',
      data: param
    })
  },
  commentList: (param) => {
    return axios.request({
      url: '/admin/comment/list',
      method: 'post',
      data: param
    })
  },
  commentDelete: (param) => {
    return axios.request({
      url: '/admin/comment/delete',
      method: 'post',
      data: param
    })
  },
  problemList: (param) => {
    return axios.request({
      url: '/admin/problem/list',
      method: 'post',
      data: param
    })
  },
  problemDelete: (param) => {
    return axios.request({
      url: '/admin/problem/delete',
      method: 'post',
      data: param
    })
  },
  problemInfo: (param) => {
    return axios.request({
      url: '/admin/problem/info',
      method: 'post',
      data: param
    })
  },
  problemUpdate: (param) => {
    return axios.request({
      url: '/admin/problem/update',
      method: 'post',
      data: param
    })
  },
  problemSeeable: (param) => {
    return axios.request({
      url: '/admin/problem/seeable',
      method: 'post',
      data: param
    })
  },
  problemAdd: (param) => {
    return axios.request({
      url: '/admin/problem/add',
      method: 'post',
      data: param
    })
  },
  teamList: (param) => {
    return axios.request({
      url: '/admin/team/list',
      method: 'post',
      data: param
    })
  },
  teamUserList: (param) => {
    return axios.request({
      url: '/admin/team/userList',
      method: 'post',
      data: param
    })
  },
  teamDeluser: (param) => {
    return axios.request({
      url: '/admin/team/deluser',
      method: 'post',
      data: param
    })
  },
  teamAdduser: (param) => {
    return axios.request({
      url: '/admin/team/addUser',
      method: 'post',
      data: param
    })
  },
  teamAdd: (param) => {
    return axios.request({
      url: '/admin/team/add',
      method: 'post',
      data: param
    })
  },
  teamUpdate: (param) => {
    return axios.request({
      url: '/admin/team/update',
      method: 'post',
      data: param
    })
  },
  teamDelete: (param) => {
    return axios.request({
      url: '/admin/team/delete',
      method: 'post',
      data: param
    })
  }
}
