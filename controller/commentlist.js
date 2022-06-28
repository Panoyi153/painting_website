// 关于评论功能实现
const { exec } = require("../db/mysql")
// 添加评论
const addComment = async (user_id, art_id, comment_content) => {
    const comm_createtime = Date.now()
    let sql = `INSERT INTO comment (user_id,art_id,comm_content,comm_createtime) VALUES (${user_id},${art_id},'${comment_content}',${comm_createtime})`
    const insertData = await exec(sql)
    // console.log(insertData);
    return { id: insertData.insertId }
}
// 获取评论表
const getComment = async (artid) => {
    let sql = `SELECT c.id,c.art_id,c.user_id,c.comm_content,u.nickname,u.avatar,c.comm_createtime FROM comment c LEFT JOIN users u ON c.user_id=u.uid WHERE art_id=${artid}`
    const result = await exec(sql)
    return result
}
module.exports = {
    addComment,
    getComment
}