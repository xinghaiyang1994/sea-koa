const { dealBody } = require('../utils/tools')

module.exports = {
  // 检查是否登录
  checkLogin(ctx) {
    if (!ctx.session.user) {
      return {
        status: false,
        data: dealBody({
          code: -2,
          message: '用户未登录，请登录后再试！'
        })
      }
    }

    return {
      status: true,
      data: ''
    }
  }
}