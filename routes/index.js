const Router = require('koa-router')
const tools = require('../utils/tools')

module.exports = function (app) {
  const router = new Router()

  router.get('/', async ctx => {
    ctx.body = tools.dealBody({
      data: '首页'
    })
  })

  // 子路由
  router.use('/user', require('./user').routes())

  app.use(router.routes())
  app.use(router.allowedMethods())
}