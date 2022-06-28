// db.js 配置数据库的基本信息

const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

// 开发环境
if (env == 'dev') {
    // mysql数据库配置
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'mypaint'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    }
}
// 生产环境
if (env == 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'mypaint'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    }
}
module.exports = { MYSQL_CONF, REDIS_CONF }