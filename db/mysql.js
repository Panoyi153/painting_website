// mysql.js 连接到数据库
const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')
// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONF)
// 开始连接
connection.connect()
// exec 是一个统一执行sql语句的函数，返回一个promise对象
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    // 最后不要忘记返回这个promise
    return promise
}
module.exports = { exec, escape: mysql.escape }