/*
* 获取 系统当前状况
*/
const os = require('os')
const util = require('util');
const exec = util.promisify(require('child_process').exec)

function sys () {
  return new Promise (function (resolve, reject) {
    let arch = os.arch()    // cpu 架构
    let cpu = os.cpus()     // cpu 详情
    let totalmem = os.totalmem()   // 内存总量
    let freemem = os.freemem()     // 内存剩余
    let uptime = os.uptime()       // 总运行时间
    let free_rate = (100 * freemem / totalmem).toFixed(2) // 剩余内存百分比 保留两位小数
    let data = {
      success: true,
      dsc: '系统状态',
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

async function dist () {
  const { stdout, stderr } = await exec('df -h')
  if (stderr) return stderr
  let arr = stdout.split(/\n/)                  // 分割行
                  .filter(x => !!x)             // 分割并剔除空数组
                  .map(el => el.split(/\s+/))   // 行内与元素分割
  return arr
}

module.exports = {
  sys,
  dist
}
