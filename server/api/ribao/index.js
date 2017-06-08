const proxy = require("http-proxy-middleware")
const url = require('url')
const {BASE_URL} = require('../../config').ribao
/**
 * 转发知乎日报 的API 解决跨域问题
 * @type {[type]}
 */
module.exports = proxy({
  target: BASE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/ribao': ''   // 替换前缀
  }
})
