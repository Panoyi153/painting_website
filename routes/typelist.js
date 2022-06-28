var express = require('express');
const { getTypelist, getTypeDetail } = require('../controller/typelist')
const { SuccessModel } = require('../model/resModel');
var router = express.Router();

router.get('/typelist', async function (req, res, next) {
    // console.log(req.query);
    let { type } = req.query || ''
    let { limit } = req.query || 6
    let { offset } = req.query || 0
    const listData = await getTypelist(type)
    let newData = []
    limit = parseInt(limit)
    offset = parseInt(offset)
    newData = listData.slice(offset, offset + limit)
    const totalCount = listData.length || 0
    const totalPages = Math.ceil(totalCount / limit)
    res.json(new SuccessModel({ listData, newData, totalCount, totalPages, pageSize: limit, pageNo: offset }))
});
router.get('/typelist/detail/:id', async function (req, res, next) {
    let { id } = req.params
    const typeDetail = await getTypeDetail(id)
    // console.log(typeDetail);
    res.json(new SuccessModel(typeDetail))
})
module.exports = router;