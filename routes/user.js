const Router = require('koa-router')
const router = new Router()

// 获取列表
router.get('/list', require('../controller/user').getList)
// 新增用户
router.get('/add', require('../controller/user').getAdd)

module.exports = router
