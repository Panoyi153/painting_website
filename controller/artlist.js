// 获取绘画作品的相关信息
const { exec } = require("../db/mysql");
// 查：获取绘画表的数据内容 -->  使用了内连接和左外连接，以及模糊查询
const getArtList = (author, dynasty, type) => {
  let sql = `SELECT
	q.id artid,
	q.artName,
	z.author,
	z.dynasty,
	q.type,
	q.artDesc,
	z.authorDesc,
	q.typeDesc,
	q.image_01,
	q.image_02,
	q.image_03,
	q.updateTime
FROM
	(
	SELECT
		a.id,
		a.artName,
		a.artDesc,
		a.image_01,
		a.image_02,
		a.image_03,
		a.authorId,
		a.updateTime,
		t.type,
		t.typeDesc
	FROM
		artlist a
		LEFT JOIN typelist t ON a.typeId = t.id
	) q
	INNER JOIN (
	SELECT
		w.id,
		w.author,
		w.authorDesc,
		y.dynasty
	FROM
		authorlist w
	INNER JOIN dynastylist y ON w.dynastyId = y.id
	) z ON q.authorId = z.id `;
  if (author) {
    sql += `and author like '%${author}%' `;
  }
  if (dynasty) {
    sql += `and dynasty like '%${dynasty}%' `;
  }
  if (type) {
    sql += `and type like '%${type}%' `;
  }
  sql += `order by updateTime desc;`;
  // 返回Promise
  return exec(sql);
};
// 查：获取绘画详情 --> params参数为id
const getArtDetail = (artid) => {
  let sql = `SELECT
	q.id,
	q.artName,
	z.author,
	z.dynasty,
	q.type,
	q.artDesc,
	z.authorDesc,
	q.typeDesc,
	q.image_01,
	q.image_02,
	q.image_03,
	q.updateTime
FROM
-- artlist表和type表左连接 q表
	(
	SELECT
		a.id,
		a.artName,
		a.artDesc,
		a.image_01,
		a.image_02,
		a.image_03,
		a.authorId,
		a.updateTime,
		t.type,
		t.typeDesc
	FROM
		artlist a
		LEFT JOIN typelist t ON a.typeId = t.id
	) q
	INNER JOIN (
-- 	author表和dynasty表左连接 z表
	SELECT
		w.id,
		w.author,
		w.authorDesc,
		y.dynasty
	FROM
		authorlist w
	INNER JOIN dynastylist y ON w.dynastyId = y.id
	) z ON q.authorId = z.id
	WHERE q.id=${artid} `;
  sql += `order by updateTime desc;`;
  return exec(sql);
};
module.exports = {
  getArtList,
  getArtDetail,
};
