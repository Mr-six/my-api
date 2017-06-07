/*
* APIserver
*/
const app = require('express')()

const config = require('./config/')

const apiRouter = require('./router/')

const cnode = require('./api/cnode')

app.get('/', function (req, res) {
  res.end('test api server')
})

// api访问接口
app.use('/api/v1',apiRouter)

// conde api
app.use('/cnode', cnode)

console.log('server listening at : http://localhost:' + config.port)

app.listen(config.port)
