const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const staticCache = require('koa-static-cache')
const bodyParser = require('koa-bodyparser')
const error = require('koa-error')
const cors = require('koa2-cors')
const helmet = require('koa-helmet')
const log4js = require('log4js')

const routes = require('./routes')
const { port } = require('./config/default')

const app = new Koa()
const logger = log4js.getLogger()

log4js.configure({
    appenders: {
        error: {       // 定义了名为 error 的 appender 
            type: 'file',
            filename: path.join(__dirname, './log/error.log')
        }
    },
    categories: {
        default: {
            appenders: ['error'],      // 使用名为 error 的 appender 
            level: 'error'      
        }
    },
    pm2: true       // 使用 pm2 启动项目
})

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
app.use(cors({
    'credentials': true
}))

// 提供安全 headers 
app.use(helmet())

// 错误处理
app.use(error({
    engine: 'ejs',
    template: path.join(__dirname, './views/error.ejs')
}))
app.on('error', (err, ctx) => {
    let errMsg = `${ctx.url} ${err}`
    console.log(errMsg)
    logger.error(errMsg)
})

// 路由
routes(app)

app.listen(port, () => {
    console.log('http://localhost:' + port)
})