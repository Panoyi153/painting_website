// 关于收藏功能实现
const { exec } = require("../db/mysql")
// 加入收藏
const addCollect = async (art_id, user_id) => {
	const coll_createtime = Date.now()
	let sql = `INSERT INTO collect ( art_id, user_id, coll_createtime )
    VALUE
        ( '${art_id}', '${user_id}', '${coll_createtime}' );`
	const insertData = await exec(sql)
	// console.log(insertData);
	return { id: insertData.insertId } || {}
}
// 获取收藏
const getCollect = async (user_id) => {
	let sql = `SELECT
	u.username,
	b.co_id,
	b.art_id,
	b.artName,
	b.image_01,
	b.coll_createtime
FROM
	users u
	INNER JOIN (
	SELECT
		c.user_id,
		c.art_id,
		c.co_id,
		a.artName,
		a.image_01,
		c.coll_createtime
	FROM
		collect c
		LEFT JOIN artlist a ON c.art_id = a.id
	) b ON u.uid = b.user_id
WHERE
	u.uid=${user_id};`
	const result = await exec(sql)
	return result
}
// 删除收藏
const deleteCollect = async (art_id, user_id) => {
	let sql = `DELETE FROM collect WHERE art_id=${art_id} AND user_id=${user_id};`
	const result = await exec(sql)
	// console.log(result);
	return { result: result.affectedRows }
}
module.exports = {
	addCollect,
	getCollect,
	deleteCollect
}