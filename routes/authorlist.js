var express = require('express');
var router = express.Router();

const { getAuthorList, getAuthorDetail } = require('../controller/authorlist')
const { SuccessModel, ErroModerl } = require('../model/resModel')
// 获取作者列表数据
router.get('/authorlist', async (req, res, next) => {
    let author = req.query.author || ''
    let dynasty = req.query.dynasty || ''
    let { limit } = req.query
    let { offset } = req.query
    const listData = await getAuthorList(author, dynasty)
    let newData = []
    limit = parseInt(limit)
    offset = parseInt(offset)
    newData = listData.slice(offset, offset + limit)
    const totalCount = listData.length || 0
    const totalPages = Math.ceil(totalCount / limit)
    res.json(new SuccessModel({ listData, newData, totalCount, totalPages, pageSize: limit, pageNo: offset, }))
})
// 获取作者详情数据
router.get('/authorlist/detail/:authorid', async (req, res, next) => {
    let { authorid } = req.params
    const authorDetail = await getAuthorDetail(authorid)
    res.json(new SuccessModel(authorDetail))
})



module.exports = router;