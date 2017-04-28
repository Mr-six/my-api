/*
* APIserver
*/
const app = require('express')()

const config = require('./config/')

const apiRouter = require('./router/')

app.get('/', function (req, res) {
  res.end('test api server')
})

// api访问接口
app.use('/api/v1',apiRouter)

console.log('server listening at : http://localhost:' + config.port)

app.listen(config.port)
