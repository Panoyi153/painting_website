// 获取流派相关信息
const { exec } = require('../db/mysql')
// 查：查询所有流派
const getTypelist = (type) => {
	let sql = `SELECT * FROM typelist `
	if (type) {
		sql += `WHERE type like '%${type}%' `
	}
	sql += `order by updateTime desc;`
	return exec(sql)
}
// 获取流派详情及其代表作
const getTypeDetail = (id) => {
	let sql = `SELECT
	*
FROM
	(
	SELECT
		t.type,
		a.id artId,
		a.typeId,
		a.artName,
		a.image_01,
        t.typeDesc
	FROM
		typelist t
		LEFT JOIN artlist a ON t.id = a.typeId
	) x
WHERE
	x.typeId=${id};`
	return exec(sql)
}
module.exports = {
	getTypelist,
	getTypeDetail
}