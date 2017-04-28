const config = require('../../config')
const cheerio = require('cheerio')
const request = require('superagent')

function getDetail (cookies, id) {
  if (cookies && id) {
    return new Promise (function (resolve, reject) {
      tartget_movie = config.zmz.down_load_url + id   // 目标地址
      request
        .get(tartget_movie)
        .set(config.header)
        .set('Cookie', cookies.join(';'))     // 设置cookies值
        .end(function (err, res) {
          if (err) {
            console.dir(err)
            console.log('出错了')
            reject(err)
          } else {
            let movie = []  // 列表数组

            const $ = cheerio.load(res.text, {decodeEntities: false})

            // 视频名称
            let source_title = $('.download-tab.res-view-top').find('h2').text()   // 视频名称
            let source_id = source_title.slice(0, -7) // 提取视频名称关键部分

            const resource_tit = $('.resource-tit')  //  资源标题
            const download_box = $('.download-box')   // 下载区域文本
            const media_box = $('.media-box')  // 资源下载区
            const media_list = media_box.find('.media-list')  //资源列表区

            // 过滤列表 测试720p列表
            media_list.each(function (index, el) {
              let list = $(el)
              let source = {}  // 资源对象
              let source_type = list.find('h2').html() // 下载资源类型
              if (source_type === '离线+在线') return // 过滤掉【离线+在线】选项
              let li = list.find('li')    // 标签列表
              source[source_type] = []   // 储存某类型视频列表

              // 单一列表循环
              li.each(function (index, el) {
                let cur_li = $(el)
                let season = cur_li.attr('season')    // 季数
                let episode = cur_li.attr('episode')    // 集数
                let title = cur_li.find('.fl a.f7.lk').html()   // 本集标题
                let load_link = cur_li.find('.fr a')    // 下载链接数组
                let load_arr = []   // 视频链接下载地址

                // 下载列表数组
                load_link.each(function (index, el) {   // 对其进行遍历 提取单个下载分类
                  let type_url = $(el).attr('href') || $(el).attr('xmhref')   // 下载链接
                  let type = $(el).html()   // 下载链接类型
                  if (type === '字幕') return // 过滤字幕下载
                  load_arr.push({   // 将其放入 load_arr 数组中
                    type,
                    type_url
                  })
                })

                source[source_type].push({    // 将 季数 集数 标题 下载地址 保存在 type720 数组中
                  season,
                  episode,
                  title,
                  load_arr
                })
              })

              movie.push({
                source_type: source_type,
                source_urls: source[source_type]
              })
              let data = {
                success: true,
                dsc: source_id + '资源下载列表',
                data: movie
              }
              resolve(data)
            })
          }
        })
    })
  }
}

module.exports = getDetail
