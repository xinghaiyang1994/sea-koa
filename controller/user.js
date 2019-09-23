const { dealBody, validateForm, md5 } = require('../utils/tools')
const { user } = require('../utils/joiSchema')
const { findUserAll, insertUser } = require('../dao/user')

module.exports = {
  // 获取列表
  async getList(ctx) {
    // 获取
    const daoUserAll = await findUserAll()
    if (!daoUserAll) {
      throw new Error('获取列表失败！')
    }
    const jsonUserAll = daoUserAll.toJSON()

    await ctx.render('index', {
      content: JSON.stringify(jsonUserAll)
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