const Router = require('koa-router')

module.exports = function (app) {

    const router = new Router()
    
    router.get('/', async ctx => {
        await ctx.render('index', {
            content: '首页'
        })
    })

    // 子路由
    router.use('/home', require('./home').routes())

    app.use(router.routes())
    app.use(router.allowedMethods())

}