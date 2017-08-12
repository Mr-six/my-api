/*
* APIserver
*/
const app = require('express')()

const bodyParser = require('body-parser')

const config = require('./config/')

const apiRouter = require('./router/')

const request = require('superagent')

const cors = require('cors')  // 跨域中间件

const cnode = require('./api/cnode')  // cnode

const ribao = require('./api/ribao')  // 知乎日报

const weather = require('./api/weather')  // 天气

app.use(bodyParser.urlencoded({ extended: false }))  // parse application/x-www-form-urlencoded
app.use(bodyParser.json())  // parse application/json
app.use(cors(config.corsOptions))  // 允许跨域配置

app.get('/', function (req, res) {
  request(config.gitReadme).pipe(res)  // 返回git 项目地址首页
})

// api访问接口
app.use('/api/v1',apiRouter)

// conde api
app.use('/cnode', cnode)

// 知乎日报 API
app.use('/ribao', ribao)

// 天气 API
app.use('/weather', weather)

console.log('server listening at : http://localhost:' + config.port)

app.listen(config.port)
