const crypto = require('crypto')
const Joi = require('joi')
const language = require('../config/joi-lang')

function toD(num) {
  return num < 10 ? '0' + num : '' + num
}

module.exports = {
  // api 统一返回格式
  dealBody(option) {
    return Object.assign({
      code: 0,
      message: '',
      data: ''
    }, option)
  },
  // md5 加密
  md5(value) {
    const hash = crypto.createHash('md5')
    hash.update(value)
    return hash.digest('hex')
  },
  // 时间转换
  tranTime(time, type) {
    let date = new Date(time)
    if (date.toString() === 'Invalid Date') {
      return ''
    }
    // 数据库中的 timestamp
    if (type === 'timestamp-mysql') {
      return date.getFullYear() + '-' + toD(date.getMonth() + 1) + '-' + toD(date.getDate()) + ' ' + date.toTimeString().slice(0, 8)
    }
    // 默认返回时间戳
    return date.getTime()
  },
  // 格式校验
  validateForm(value, schema, options = {}) {
    options.language = language
    return Joi.validate(value, schema, options, err => {
      if (err) {
        console.log('校验格式错误', err.details)
        throw new Error(err.details[0].message)
      }
    })
  }
}
