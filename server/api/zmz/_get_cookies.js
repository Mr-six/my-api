/*
* 发送登陆信息 获取 cookies
*/

const request = require('superagent')

const config = require('../../config')

// 发送数据
const config_data = config.zmz.user

// 正则过滤cookie规则
const reg_cookie = /GINFO=uid|GKEY=\w{10,}/

// 获取cookies方法
function _get_cookies (user) {
  let post_data = Object.assign({}, config_data, user)  // 配置用户名密码
  return new Promise(function (resolve, reject) {
    request
      .post(config.zmz.sigin_path)
      .set(config.header)               // 设置头信息
      .send(post_data)                  // 发送登陆所需数据
      .type('form')
      .redirects(0)                     // 防止浏览器重定向跳转
      .end(function (err, res) {
        if (err) {
          console.dir(err)
          reject(err)
        } else {
          if (res.header) {
            let cookies = res.header['set-cookie']
            let f_cookies = _filter_cookie(cookies)
            if (f_cookies.length) {
              resolve (f_cookies)     // 返回登陆成功后的cookies值 
            } else {  // 登录错误
              reject(config.errMsg.account_err())
            }      
          }
        }
    })
  })
}

// 过滤cookies字段
function _filter_cookie (cookie) {
  let COOKIE = []
  cookie.forEach(function (el, i) {
    el.split(';').forEach(function (el, i) {
      if (el.match(reg_cookie)) {
        COOKIE.push(el)
      } else {
        return false
      }
    })
  })
  return COOKIE
}

module.exports = _get_cookies
