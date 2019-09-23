const User = require('../models/user')

module.exports = {
  // 获取所有用户
  findUserByName(name) {
    return User.forge().where({ name }).fetch({ require: false })
  },
  // 新增用户
  insertUser({ name, password }) {
    return User.forge({ name, password }).save()
  }
}