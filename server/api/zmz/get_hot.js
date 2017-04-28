/*
* 获取24小时下载热门
*/
const cheerio = require('cheerio')
const request = require('superagent')

const config = require('../../config')

function get_hot () {
  return new Promise(function (resolve, reject) {
    request
      .get(config.zmz.index)
      .set(config.header)
      .end(function (err, res) {
        if (err) {
          console.dir(err)
          console.log('出错了')
          reject(err)
        } else {
          // 热门数组
          let hot = []
          const $ = cheerio.load(res.text, {decodeEntities: false})
          const hot_list = $('.fl.box.top24 .box>ul>li')
          console.log()
          // 遍历列表
          hot_list.each(function(index, el) {
            let info, type, title, url
            // 首位-做特殊处理
            if ($(el).hasClass('top')) {
              // 提取有用信息部分
              info = $(el).find('.fl-info')
              // 类型
              type = info.find('p').html()
            } else {
              info = $(el);
              // 类型
              type = info.find('em').html()
            }
            // 作品标题
            title = info.find('a').html()
            // 连接
            url = config.zmz.index + info.find('a').attr('href')

            // 填充热门列表
            hot.push({
              title,
              type,
              url
            })
          })  // 遍历列表结束

          data = {
            success: true,
            dsc: '热门列表',
            data: hot
          }
          resolve(data)
        }
      })
  })
}

module.exports = get_hot
