const router = require('express').Router()

// 字幕组API
const zmz = require('../api/zmz/')

// 豆瓣API
const douban = require('../api/douban/')

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
  douban.get_cur()
    .then(function ({ data }) {
      res.json(data)
    })
})

module.exports = router
