var express = require('express');
var router = express.Router();

const { getArtList, getArtDetail } = require('../controller/artlist')
const { SuccessModel, ErroModerl } = require('../model/resModel')
// 查：获取绘画表
router.get('/artlist', async function (req, res, next) {
    // console.log(req.query);
    let { limit } = req.query || 9
    let { offset } = req.query || 0
    const author = req.query.author || ''
    const dynasty = req.query.dynasty || ''
    const type = req.query.type || ''
    const result = getArtList(author, dynasty, type)
    const listData = await result;
    let newData = []
    offset = parseInt(offset)
    limit = parseInt(limit)
    //.slice(start,end):start必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推
    newData = listData.slice(offset, offset + limit)
    const totalCount = listData.length || 0
    const totalPages = Math.ceil(totalCount / limit)
    // "total": 8, 数组的长度或者为0
    // "pageSize": 2,传入   limit
    // "pageNo": 1, 传入 offset
    // "totalPages": 4
    res.json(
        new SuccessModel({ listData, newData, pageSize: limit, pageNo: offset, totalPages, totalCount })
    );
});
// 查：获取某项绘画详情数据
router.get('/artlist/detail/:artid', async function (req, res, next) {
    let { artid } = req.params;
    const artDetail = await getArtDetail(artid)
    // console.log(artDetail)
    res.json(
        new SuccessModel(artDetail)
    )
})
// console.log(req.query); // 在params中书写的 http://localhost:3000/api/artlist/detail?art=44 get()
// console.log(req.body);  // 在body的JSON中书写的 {"id":"23"}  post()
// console.log(req.params); //     /:id http://localhost:3000/api/artlist/detail/33
module.exports = router;
