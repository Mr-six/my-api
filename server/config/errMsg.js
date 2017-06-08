module.exports = {
  no_parameter () {  // 缺少参数
    return {
      sucecss: false,
      err_msg: '缺少参数'
    }
  },
  server_err (err) {  // 服务器错误
    return {
      sucecss: false,
      err_msg: '服务器出现一个：' + JSON.stringify(err)
    }
  },
  err_msg (err) {  // 自定义错误
    return {
      sucecss: false,
      err_msg: err
    }
  },
  account_err () {  // 账户错误
    return {
      sucecss: false,
      err_msg: '账户信息有误'
    }
  }
}
