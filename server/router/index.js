const router = require('express').Router()
// 字幕组API
const zmz = require('../api/zmz/')

// 豆瓣API
const douban = require('../api/douban/')

// 获取系统状态
const sys = require('../api/sys/')

// 字幕组获取24小时下载最热
router.get('/zmz/hot24', function (req, res, next) {
  console.log('get 24hot')
  zmz.get_hot()
    .then(function ( data ) {
      res.json(data)
    })
})

// 字幕组获取关注资源
router.get('/zmz/fav', function (req, res, next) {
  console.log('get fav')
  zmz.get_fav()
    .then(function ( data ) {
      res.json(data)
    })
})

// 获取详情列表
router.get('/zmz/fav/detail', function (req, res, next) {
  console.log('get fav detail')
  zmz.get_fav_detail()
    .then(function ( data ) {
      res.json(data)
    })
})

// 获取正在上映的电影
router.get('/movie/cur', function (req, res, next) {
  console.log('get current movie')
  let queryStar = req.query.star
  let star = 8  // 默认提取八分以上的电影
  if (queryStar && typeof parseInt(queryStar) === 'number') {
    star = parseInt(queryStar)
  }
  douban.get_cur(star)
    .then(function ({ data }) {
      res.json(data)
    })
})

// 获取系统状态
router.get('/sys', function (req, res, next) {
  console.log('check the system status')
  sys()
    .then(data => res.json(data))
})

module.exports = router
