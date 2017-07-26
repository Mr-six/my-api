/*
* 携带cookies 获取关注影视&美剧信息
*/

const cheerio = require('cheerio')
const request = require('superagent')

const config = require('../../config')
const _get_cookies = require('./_get_cookies')  // 获取cookies
const _getMoveDetail = require('./_getMoveDetail')  // 获取下载列表
// 获取关注影视方法
function _get_myfav (cookies) {
  return new Promise(function (resolve, reject) {
    request
      .get(config.zmz.target_url)
      .set(config.header)
      .set('Cookie', cookies.join(';'))     // 设置cookies值
      .end(function (err, res) {
        if (err) {
          console.dir(err)
          console.log('出错了')
          reject(err)
        } else {
          let move = []
          const $ = cheerio.load(res.text, {decodeEntities: false})
          const my_list_move = $('.user-favlist.has-point>li')

          my_list_move.each(function(index, el) {
            // 名称
            let title = $(el).find('.fl-info .title strong a').html()
            // 连接
            let baseUrl = $(el).find('.fl-info .title strong a').attr('href')
            let url = config.zmz.index + baseUrl
            let id = baseUrl.replace(/[^\d]/g, '')
            move.push({
              title,
              url,
              id
            })
          })
          // 输出结果
          // console.dir(move)
          let data = {
            success: true,
            dsc: '关注list',
            data: move
          }
          resolve(data)
        }
      })
  })
}

// 获取关注条目
async function getFav (user) {
  let cookies = await _get_cookies(user)
  return _get_myfav(cookies)
}

// 获取关注条目详细信息（下载地址等）
async function getFavDetail (user) {
  let datas = {
    "success": true,
    "dsc": '关注资源下载列表',
    data: []
  }

  let cookies = await _get_cookies(user)
  let moveList = await _get_myfav(cookies)
  let moveData = moveList.data
  // 并行执行查询
  let promises = moveData.map((el) => _getMoveDetail(cookies, el.id))
  datas.data = await Promise.all(promises);
  return datas
}

module.exports = {
  getFav,
  getFavDetail
}
