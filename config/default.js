const ENV = process.env.env ? process.env.env : 'dev'
console.log('环境', process.env.env)

const config = {
  dev: {
    port: 3010,
    mysqlDebug: false,
    mysqlConfig: {
      host: '127.0.0.1', // ip 地址
      user: '',
      password: '',
      database: '', // 数据库名
      charset : 'utf8mb4',
      port: 3306 // 默认端口是 3306 
    },
    sessionKeys: ['some'],   // 秘钥
    redisConfig: {
      host: '127.0.0.1',
      port: 6379,   // 默认 6379
      db: 0,    // 默认选 0 库
      password: ''    // 密码
    },
    redisSession: {
      key: '',    // cookie 的名称。默认为 koa:sess
      prefix: '',
      domain: ''
    }
  },
  prod: {
    port: 3010,
    mysqlDebug: false,
    mysqlConfig: {
      host: '127.0.0.1', // ip 地址
      user: '',
      password: '',
      database: '', // 数据库名
      charset : 'utf8mb4',
      port: 3306 // 默认端口是 3306 
    },
    sessionKeys: ['some'],   // 秘钥
    redisConfig: {
      host: '127.0.0.1',
      port: 6379,   // 默认 6379
      db: 0,    // 默认选 0 库
      password: ''    // 密码
    },
    redisSession: {
      key: '',    // cookie 的名称。默认为 koa:sess
      prefix: '',
      domain: ''
    }
  }
}

const currentConfig = config[ENV]
currentConfig.env = ENV
currentConfig.isDev = ENV === 'dev'

module.exports = currentConfig