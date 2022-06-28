// 获取作家的相关信息
const { exec } = require('../db/mysql')

const getAuthorList = (author, dynasty) => {
	let sql = `SELECT
	*
FROM
	(
	SELECT
		a.id authorid,
		a.author,
		a.authorDesc,
		a.author_img,
        a.updateTime,
		d.dynasty
	FROM
		authorlist a
		LEFT JOIN dynastylist d ON a.dynastyId = d.id
	) x
	WHERE 1=1 `
	if (author) {
		sql += `AND x.author LIKE '%${author}%' `
	}
	if (dynasty) {
		sql += `AND x.dynasty LIKE '%${dynasty}%' `
	}
	// sql += `order by updateTime desc;`
	return exec(sql)
}
const getAuthorDetail = (authorid) => {
	let sql = `SELECT
	*
	FROM
	(SELECT
			x.writerid,
			x.author,
			x.authorDesc,
			x.author_img,
		x.updateTime,
			x.dynasty,
			p.id artid,
			p.artName,
			p.image_01
	FROM
		(
		SELECT
			a.id writerid,
			a.author,
			a.authorDesc,
			a.author_img,
		a.updateTime,
			d.dynasty
		FROM
			authorlist a
			LEFT JOIN dynastylist d ON a.dynastyId = d.id
		) x
		INNER JOIN
		artlist p
		ON x.writerid=p.authorId) b
		WHERE b.writerid=${authorid} `
	sql += `order by updateTime desc;`
	return exec(sql)
}
module.exports = {
	getAuthorList,
	getAuthorDetail
}