const User = require('../models/user')

module.exports = {
  // 获取所有用户
  findUserAll() {
    return User.forge().fetchAll()
  },
  // 新增用户
  insertUser({ name, password }) {
    return User.forge({ name, password }).save()
  }
}
