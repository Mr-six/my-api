/*
* 获取 系统当前状况
*/
const os = require('os')

module.exports = function () {
  return new Promise (function (resolve, reject) {
    let arch = os.arch()    // cpu 架构
    let cpu = os.cpus()     // cpu 详情
    let totalmem = os.totalmem()   // 内存总量
    let freemem = os.freemem()     // 内存剩余
    let uptime = os.uptime()       // 总运行时间
    let free_rate = (100 * freemem / totalmem).toFixed(2) // 剩余内存百分比 保留两位小数
    let data = {
      mes: 'ok',
      dsc: 'sys 状态',
      data: {
        arch,
        cpu,
        totalmem,
        freemem,
        free_rate,
        uptime
      }
    }
    resolve(data)
  })
}
