const User = require('../models/user')

module.exports = {
  // 新增用户
  insertUser({ name, password }) {
    return User.forge({ name, password }).save()
  }
}