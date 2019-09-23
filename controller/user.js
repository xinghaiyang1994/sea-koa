const { dealBody, validateForm, md5 } = require('../utils/tools')
const { user } = require('../utils/joiSchema')
const { checkLogin } = require('../middlewares/check')
const { insertUser } = require('../dao/user')

module.exports = {
  // 获取 passport 用户信息
  async getInfo(ctx) {
    // 检查登录
    let loginData = checkLogin(ctx)
    if (!loginData.status) {
      return ctx.body = loginData.data
    }
    
    const { id, name, isAdmin } = ctx.session.user
    return ctx.body = dealBody({
      data: {
        id, name, isAdmin
      }
    })
  },
  // 新增用户
  async getAdd(ctx) {
    const { name, password } = ctx.query

    // 格式校验
    validateForm({ name, password }, user)

    // 新增
    const daoUser = await insertUser({ 
      name, 
      password:md5(password) 
    })
    if (!daoUser) {
      throw new Error('新增用户失败！')
    }
    const jsonUser = daoUser.toJSON()

    return ctx.body = dealBody({
      data: {
        id: jsonUser.id
      }
    })
  }
}