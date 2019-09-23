const log4js = require('log4js')
const path = require('path')

const layout = {   // 自定义格式
  type: 'pattern',
  pattern: '%d{yyyy-MM-dd hh:mm:ss} | %m'
}

log4js.configure({
  appenders: {    // 定义 appenders
    error: {    // 一般错误日志
      type: 'file',
      filename: path.join(__dirname, '../log/error.log'),
      layout
    }
  },
  categories: {
    default: {
      appenders: ['error'], // 使用名为 error 的 appender 
      level: 'error'
    }
  },
  pm2: true // 使用 pm2 启动项目
})

module.exports = {
  logError: log4js.getLogger()
}