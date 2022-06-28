var express = require('express');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { addCollect, getCollect, deleteCollect } = require('../controller/collectlist');
const test = require('../middleware/test');
const loginCheck = require('../middleware/loginCheck');
var router = express.Router();
// 添加收藏
router.post('/addcollect', async (req, res, next) => {
    const { art_id, user_id } = req.body
    const addcollcetData = await addCollect(art_id, user_id)
    res.json(new SuccessModel(addcollcetData))
});

// 获取收藏表
router.get('/getcollect', loginCheck, async (req, res, next) => {
    const collcetList = await getCollect(req.decoded.userId)
    res.json(new SuccessModel(collcetList))
})

// 删除收藏数据
router.get('/delcollect', async (req, res, next) => {
    const { art_id, user_id } = req.query
    const delCollect = await deleteCollect(art_id, user_id)
    res.json(new SuccessModel(delCollect))
})
/*
 * 返回0 表示不成功，返回1表示成功
 * {
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    },
    "code": 200
}
 */
module.exports = router;
