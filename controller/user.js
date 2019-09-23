const { dealBody, md5, validateForm } = require('../utils/tools')
const jwt = require('jsonwebtoken')
const secret = require('../secret.json')
const { findUserByName, insertUser } = require('../dao/user')
const { register, login } = require('../utils/joiSchema')

module.exports = {
  // 注册
  async postRegister(ctx) {
    const { name, password, repeat } = ctx.request.body
    
    // 校验格式
    validateForm({ name, password, repeat }, register)
    if (password !== repeat) {
      throw new Error('两次密码应该相同!')
    }
    const daoUser = await findUserByName(name)
    if (daoUser) {
      throw new Error('用户存在!')
    }

    // 新增
    const daoNewUser = await insertUser({ 
      name, 
      password: md5(password)
    })
    const jsonNewUser = daoNewUser.toJSON()

    return ctx.body = dealBody({
      data: {
        id: jsonNewUser.id
      },
      message: '注册成功'
    })
  },
  // 登录
  async postLogin(ctx) {
    const { name, password } = ctx.request.body

    // 校验格式
    validateForm({ name, password }, login)
    const daoUser = await findUserByName(name)
    if (!daoUser) {
      throw new Error('用户不存在!')
    }
    const jsonUser = daoUser.toJSON()
    if (md5(password) !== jsonUser.password) {
      throw new Error('密码不正确!')
    }

    // 签发 token
    let token = jwt.sign({
      id: jsonUser.id,
      name: jsonUser.name
    }, secret.key, {
      expiresIn: '1h'
    })

    return ctx.body = dealBody({
      data: {
        token
      },
      message: '登录成功'
    })
  },
  // 获取登录信息
  async getInfo(ctx) {
    // 校验
    let user = ctx.state.user
    if (!user) {
      throw new Error('用户不存在!')
    }

    return ctx.body = dealBody({
      data: {
        name: user.name
      }
    })
  },
  // 退出
  async getLogout(ctx) {
    return ctx.body = dealBody({
      message: '退出成功'
    })
  }
}