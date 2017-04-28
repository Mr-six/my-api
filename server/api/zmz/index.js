/*
* 字幕组 API 汇总
*/
const get_fav = require('./get_fav').getFav  // 获取关注列表
const get_fav_detail = require('./get_fav').getFavDetail  // 获取详细下载列表
const get_hot = require('./get_hot')  // 获取热门下载

module.exports = {
  get_fav,
  get_fav_detail,
  get_hot
}
