const Router = require('koa-router')
const router = new Router()

// 获取 passport 用户信息
router.get('/info', require('../controller/user').getInfo)
// 新增用户
router.get('/add', require('../controller/user').getAdd)

module.exports = router