const svgCaptcha = require('svg-captcha')
const { dealBody, md5, validateForm } = require('../utils/tools')
const { checkLogin } = require('../middlewares/check')
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
    const { name, password, captcha } = ctx.request.body

    // 校验格式
    validateForm({ name, password, captcha }, login)
    if (captcha.toLowerCase() !== ctx.session.captcha) {
      throw new Error('验证码错误!')
    }
    const daoUser = await findUserByName(name)
    if (!daoUser) {
      throw new Error('用户不存在!')
    }
    const jsonUser = daoUser.toJSON()
    if (md5(password) !== jsonUser.password) {
      throw new Error('密码不正确!')
    }
    
    // 用户信息入 session
    ctx.session.user = {
      id: jsonUser.id,
      name: jsonUser.name
    }

    return ctx.body = dealBody({
      message: '登录成功'
    })
  },
  // 验证码
  async getCaptcha(ctx) {
    const captcha = svgCaptcha.create({
      ignoreChars: '0o1il'
    })
    ctx.session.captcha = captcha.text.toLowerCase()
    ctx.response.set('Content-Type', 'image/svg+xml')
    return ctx.body = String(captcha.data)
  },
  // 获取登录信息
  async getInfo(ctx) {
    // 检查登录
    let loginData = checkLogin(ctx)
    if (!loginData.status) {
      return ctx.body = loginData.data
    }

    // 取用户信息
    const { id, name } = ctx.session.user

    return ctx.body = dealBody({
      data: {
        id, name
      }
    })
  },
  // 退出
  async getLogout(ctx) {
    // 清除 session 中的用户信息
    ctx.session.user = null

    return ctx.body = dealBody({
      data: '退出成功'
    })
  }
}