const Koa = require('koa')
const koaBody = require('koa-body')
const koa2Cors = require('koa2-cors')
const koaHelmet = require('koa-helmet')
const koaSession = require('koa-session')
const koaMysqlSession = require('./utils/koa-mysql-session')
const path = require('path')
const koaStaticCache = require('koa-static-cache')

const routes = require('./routes')
const { logError } = require('./middlewares/log')
const { mysqlConfig, port, sessionKeys } = require('./config/default')

const app = new Koa()

// 提供安全 headers 
app.use(koaHelmet())

// 支持跨域
app.use(koa2Cors({
  credentials: true
}))

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      message: err.message,
      data: ''
    }

    // 写入日志
    let errMsg = `${ctx.url} | ${err.message}`
    console.log(errMsg)
    logError.error(errMsg)
  }
})

// 静态资源
app.use(koaStaticCache(path.join(__dirname, './static'), { dynamic: true }))

// session 存入 mysql 
let store = new koaMysqlSession(mysqlConfig)
app.keys = sessionKeys
const config = {    // 以下都为默认值
  rolling: true,
  store
}
app.use(koaSession(config, app))

// 解析 post
app.use(koaBody({
  multipart: true   // 开启上传文件
}))

// 路由
routes(app)

// 无效 url 处理
app.use(() => {
  app.emit('error', '无效的 url')
})

app.listen(port, () => {
  console.log('http://localhost:' + port)
})