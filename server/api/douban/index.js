const axios = require('axios')

const {BASE_URL} = require('../../config').douban

const defaults = {
  baseURL: BASE_URL
}

// 配置axios
Object.assign(axios.defaults, defaults)

// 获取正在上映电影
async function get_cur (star) {
  let {data} = await axios.get('movie/in_theaters')
  let good = {
    success: true,
    data: filterStart(data, star)
  }
  return good
}

// 电影过滤(默认过滤掉8分一下的电影)
function filterStart(data, start = 8) {
  var filmArray = data.subjects
  if (!Array.isArray(filmArray)) return
  data.subjects = filmArray.filter((el) => {
    return el.rating.average > start
  })
  return data
}


module.exports = {
  get_cur
}
