const axios = require('axios')

let BASE_URL = 'https://api.douban.com/v2/'

const defaults = {
  baseURL: BASE_URL
}

// 配置axios
Object.assign(axios.defaults, defaults)

// 获取正在上映电影
function get_cur () {
  return axios.get('movie/in_theaters')
}

module.exports = {
  get_cur
}
