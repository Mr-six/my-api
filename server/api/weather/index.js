const proxy = require("http-proxy-middleware")
const url = require('url')
const {BASE_URL} = require('../../config').weather
/**
 * 转发天气 的API 解决跨域问题
 * @type {[type]}
 */
module.exports = proxy({
  target: BASE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/weather': ''   // 替换前缀
  }
})
