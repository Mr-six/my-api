const zmz = require('../api/zmz/')
// async function test () {
//   console.log('tets')
//   return 'hhh'
// }

// test().then(function (data) {
//   console.log(data)
// })
zmz.get_fav_detail()
  .then(function (data) {
    console.log(' 所有数据' + data)
  })
  .catch(e => console.dir(e))
