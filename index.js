const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const staticCache = require('koa-static-cache')
const bodyParser = require('koa-bodyparser')
const error = require('koa-error')
const cors = require('koa2-cors')

const routes = require('./routes')
const { port } = require('./config/default')

const app = new Koa()

// 模板
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 静态资源
app.use(staticCache(path.join(__dirname, './static'), { dynamic: true }))

// 解析 post
app.use(bodyParser({
    formLimit: '1mb'
}))

// 支持跨域
app.use(cors())

// 错误处理
app.use(error({
    engine: 'ejs',
    template: path.join(__dirname, './views/error.ejs')
}))

// 路由
routes(app)

app.listen(port)