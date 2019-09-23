const mysql = require('../middlewares/mysql')

module.exports = mysql.Model.extend({
  tableName: 'user',     // 表名
  hidden: ['gmtCreate', 'gmtModified']
})