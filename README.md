# sea-koa
基于 koa 构建的常用脚手架。

类型：
* couple 分支为前后端耦合项目
* api 分支为前后端分离项目

## 启动步骤
1. 下载安装依赖
    ```shell
    git clone https://github.com/xinghaiyang1994/sea-koa.git -b 分支名    
    
    rm -rf .git

    cnpm i
    ```
2. 配置 config/default.js
    ```js
    module.exports = {
        port: 3100,
        database: {
            host : '',     // ip 地址
            user : '',
            password : '',
            database: '',        // 数据库名
            port: 3306      // 默认端口是 3306 
        }
    }
    ```
3. 启动
    ```shell
    node index.js
    ```


