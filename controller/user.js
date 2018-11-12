const md5 = require('md5')
const moment = require('moment')
const jwt = require('jsonwebtoken')

const secret = require('../secret.json')

const tools = require('../utils/tools')
const { 
    findUserByName,
    insertUser
} = require('../models')

module.exports = {
    async postRegister (ctx) {
        const { name, password, repeat } = ctx.request.body
        if ((name + '').trim() === '' || (password + '').trim() === '' || (repeat + '').trim() === '') {
            throw new Error('用户名或密码不能为空!')
        }
        if (password !== repeat) {
            throw new Error('两次密码应该相同!')
        }
        await findUserByName(name).then(res => {
            if (res.length > 0) {
                throw new Error('用户存在!')
            }
        })
        await insertUser([name, md5(password), moment().format('YYYY-MM-DD HH:mm:ss')]).then(res => {
            if (res) {
                ctx.body = tools.dealBody({
                    message: '注册成功。'
                })
            } else {
                throw new Error('后台服务错误!')
            }
        })
    },
    async postLogin (ctx) {
        const { name, password } = ctx.request.body
        if ((name + '').trim() === '' || (password + '').trim() === '') {
            throw new Error('用户名或密码不能为空!')
        }
        await findUserByName(name).then(res => {
            if (res.length === 0) {
                throw new Error('用户不存在!')
            }
            if (md5(password) !== res[0].password) {
                throw new Error('密码不正确!')
            } else {
                let token = jwt.sign({
                    id: res[0].id,
                    name: res[0].name
                }, secret.key, {
                    expiresIn: '1h'
                })
                ctx.body = tools.dealBody({
                    data: {
                        token
                    },
                    message: '登录成功。'
                })
            }
        })

    },
    async getInfo (ctx) {
        let user = ctx.state.user
        if (user) {
            ctx.body = tools.dealBody({
                data: {
                    name: user.name
                }
            })
        } else {
            throw new Error('用户不存在!')
        }
    },
    async getLogout (ctx) {
        ctx.body = tools.dealBody({
            message: '退出成功。'
        })
    }
}