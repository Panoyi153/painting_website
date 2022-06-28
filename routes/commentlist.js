var express = require('express');
const { addComment, getComment } = require('../controller/commentlist');
const { SuccessModel } = require('../model/resModel');
var router = express.Router();
// 添加评论
router.post('/addcomment', async (req, res, next) => {
    console.log(req.body);
    const { user_id, art_id, comment_content } = req.body
    const result = await addComment(user_id, art_id, comment_content)
    res.json(new SuccessModel(result))
});
// 获取评论
router.get('/getcomment/:artid', async (req, res, next) => {
    const { artid } = req.params
    const result = await getComment(artid)
    res.json(new SuccessModel(result))
})
module.exports = router;
