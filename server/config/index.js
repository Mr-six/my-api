/*
* 数据访问设置
*/
const errMsg = require('./errMsg')

const zmz_url = 'http://www.zimuzu.tv'
module.exports = {
  port: process.env.NODE_ENV === 'production' ? 80 : 2333,
  header : {
    'Accept': 'text/html,application/xhtml+xml,application/xml,*/*',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
  },

  corsOptions: {  // 跨域设置 详情参考 https://github.com/expressjs/cors
    origin: '*',  // 默认设置允许任何跨域访问
    methods: ['GET', 'POST'],  // 跨域允许的方法
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  },

  gitReadme: 'https://github.com/Mr-six/my-api/blob/master/README.md',  // 项目git地址

  errMsg,  // 错误消息模块

  // 字幕组网站
  zmz: {
    index: zmz_url,   // 首页地址
    sigin_path: zmz_url + '/User/Login/ajaxLogin',  // 登录地址
    down_load_url: zmz_url + '/resource/list/',  // 下载地址前缀

    // 用户信息 - 配置
    user: {
      account: 'account',
      password: 'password',
      remember: '1',
      url_back: zmz_url
    },
    target_url: zmz_url + '/user/fav'
  },

  // 豆瓣API
  douban: {
    BASE_URL: 'https://api.douban.com/v2/'
  },

  // Cnodejs 论坛API
  cnode: {
    BASE_URL: 'https://cnodejs.org/api/v1/'
  },
  // 知乎日报 API
  ribao: {
    BASE_URL: 'http://news-at.zhihu.com/'
  }

}
