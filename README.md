## 项目说明
这是一个基于express的node后端API服务，当时只是想抓取字幕组网站的下载资源，以备以后通过nas的方式去自动下载关注的美剧。不过后来慢慢扩展了几个API

字幕组网站资源抓取原理：
- 首先发送登录请求到目标登录地址，登录成功后会获取到cookies
- 携带cookies访问收藏页面，通过cheerio抓取相应的关注信息
- 使用 es6 的 async 函数 并发执行抓取每一个关注的信息（如果当关注条目很多的时候，并行效率可能会比较低，之后考虑限制并行数量）

豆瓣电影API
- 只是做了一个简单的转发，并对返回的数据做了一个过滤，可以自定义过滤掉低于某个分数的电影

系统状态API
- 引入了node的 os 模块，获取一些基础的系统状态数据
- 系统挂载磁盘空间查看

cnode社区和知乎日报API
- 均为转发请求，目的是为了接解决跨域访问的问题
- cnode社区API本身支持跨域，本例只做测试用
weather API 转发魅族天气 api
- 具体可参考 [api](https://github.com/jokermonn/-Api)

## 特性：
- 使用了es6 的 async 函数 处理异步数据
- 集成node 8.0.0版本的docker 托管在云服务器方便访问
- 使用cors模块解决跨域问题，可以通过白名单的方式去配置允许跨域的ip。

## <del>在线访问地址(会自动关闭)</del>>
<del>使用docker容器构建，托管在了[daocloud.io](daocloud.io)的免费应用中</del>

- <del>API地址：http://mrsix-api.daoapp.io</del>
- <del>访问示例：get `http://mrsix-api.daoapp.io/api/v1/zmz/hot24`  获取24小时下载热门数据</del>


## 遇到的问题
关于请求库 axios 在以form-data的形式发送post请求登录的的时候，遇到了问题，就是登录不上“字幕组”网站。（类似的问题 在cnode的兄弟也遇到了，不过我就没人家厉害了[关于axios在node中的post使用](https://cnodejs.org/topic/57e17beac4ae8ff239776de5)）后来直接使用了 [superagent](http://visionmedia.github.io/superagent/)感觉用起来很舒畅

-----

以后增加的特性

* [ ] 添加mongo数据库支持，通过对比检测当前更新了哪一集，并将更新的加入数据库
* [ ] 添加其他资源抓取
* [ ] 限制查询资源时的并发数量
* [ ] 提供前端页面展示
* [ ] 集成到docker中，通过Nginx处理端口转发


## API说明

----

### 字幕组API
#### GET /api/v1/zmz/hot24  获取24小时下载热门数据
返回值示例
```
{
  "success": true,
  "dsc": "热门列表",
  "data": [
    {
      "title": "双峰",
      "type": "美剧",
      "url": "http://www.zimuzu.tv/resource/26514"
    },
    {
      "title": "绝命律师",
      "type": "美剧",
      "url": "http://www.zimuzu.tv/resource/33190"
    },
    ...
  ]
}
```
#### POST /api/v1/zmz/fav  获取关注列表
接收 post 参数:
- account String 字幕组账户用户名
- password String 字幕组账户用户名

返回值示例
```
{
  "success": true,
  "dsc": "关注list",
  "data": [
    {
      "title": "【美剧】《绝命律师》",
      "url": "http://www.zimuzu.tv/resource/33190",
      "id": "33190"
    },
    ...
  ]
}
```
#### POST /api/v1/zmz/fav/detail  获取关注列表下载资源
接收 post 参数:
- account String 字幕组账户用户名
- password String 字幕组账户用户名

返回值示例
```
{
  "success": true,
  "dsc": "关注资源下载列表",
  "data": [
    {
      "success": true
      "dsc": "美剧《绝命律师》第3季连载中资源下载列表",
      "data":[
        {
          "source_type": "HR-HDTV",
          "source_urls": [
            "season": "1",
            "episode": "1",
            "title": "绝命律师.Better.Call.Saul.S01E01.中英字幕.BD-HR.AAC.1024x576.x264.mp4",
            "load_arr": [
              ...
            ]
          ]
        }
      ]
    },
    ...
  ]
}
```
## 豆瓣电影-正在上映API

#### GET /api/v1/movie/cur  获取正在上映的电影
接收 get 参数:
- star 所需过滤的分数一下的电影（总分10分，默认为8分）

返回值示例
[同豆瓣API](https://developers.douban.com/wiki/?title=movie_v2)

## 系统状态API

#### GET /api/v1/sys  获取当前系统状态
返回值示例
```
{
  "success": true,
  "dsc": "系统状态",
  "data": {
    "arch": "x64",
    "cpu": [
      ...
    ],
    "totalmem": 8589934592,  # 内存总量
    "freemem": 741810176,    # 剩余内存
    "free_rate": "8.64",     # 内存剩余百分百
    "uptime": 47792          # 正常运行时间（单位s）
  }
}
```
#### get /api/v1/sys?sys=dist 返回系统挂载磁盘用量
返回示例
```
[
    [
        "Filesystem",
        "Size",
        "Used",
        "Avail",
        "Capacity",
        "iused",
        "ifree",
        "%iused",
        "Mounted",
        "on"
    ],
    [
        "/dev/disk1",
        "112Gi",
        "34Gi",
        "77Gi",
        "31%",
        "995661",
        "4293971618",
        "0%",
        "/"
    ],
    [
        "devfs",
        "180Ki",
        "180Ki",
        "0Bi",
        "100%",
        "622",
        "0",
        "100%",
        "/dev"
    ],
    [
        "map",
        "-hosts",
        "0Bi",
        "0Bi",
        "0Bi",
        "100%",
        "0",
        "0",
        "100%",
        "/net"
    ],
    [
        "map",
        "auto_home",
        "0Bi",
        "0Bi",
        "0Bi",
        "100%",
        "0",
        "0",
        "100%",
        "/home"
    ]
]
```
## cnode社区API代理

代理[cnodejs社区](https://cnodejs.org/api)的API转发，只是用来测试用的，因为cnode的API本身是支持跨域的。
使用详情请参考他提供的API参数和地址代理转发的API使用 /cnode/...为前缀进入代理路由

#### GET /cnode/topics  主题首页
接收 get 参数
- page Number 页数
- tab String 主题分类。目前有 ask share job good dev
- limit Number 每一页的主题数量
- mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。

## 知乎日报API代理
首先感谢[izzyleung提供的API分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)
使用详情请参考他提供的API参数和地址代理转发的API使用 /ribao/...为前缀进入代理路由

#### GET /ribao/api/7/prefetch-launch-images/1080*1920  启动界面图像获取
`prefetch-launch-images` 后为图像分辨率，接受任意的 number*number 格式， number 为任意非负整数，返回值均相同
返回值示例
```
{
  "creatives": [
    {
      "url": "https://pic1.zhimg.com/v2-cf690e166adee2d77ebb3450d4ddc424.jpg",
      "start_time": 1496932908,
      "impression_tracks": [
        "https://sugar.zhihu.com/track?ai=4704&ut=&tu=&vs=2&ts=1496932908&si=ec82667293bd47cc88261ab0653cf64f&lu=0&hn=ad-engine.ad-engine.05d757af&at=impression&pf=PC&az=11&sg=4d27dde3d4db55a399ed6ecfc333eedb"
      ],
      "type": 0,
      "id": "4704"
    }
  ]
}
```
#### GET /ribao/api/4/news/latest  最新消息

等……
具体参考[izzyleung提供的API分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)中的使用方式以及参数含义。
*ps: 关于图片防盗链的问题 可添加meta 标签 * `<meta name="referrer" content="never">`

## 添加docker部分
- 使用dockerHub的自动构建功能关联GitHub项目，每当有新代码push之后触发自动构建命令
- daocloud.io 控制台使用手动更新发布的方式（不支持dockerhub的自动发布）

