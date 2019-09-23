// 所有格式校验
const Joi = require('joi')

module.exports = {
  // 用户
  user: {
    name: Joi.string().max(20).required(),
    password: Joi.string().max(20).required()
  }
}