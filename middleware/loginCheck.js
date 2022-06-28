const { SuccessModel, ErrorModel } = require("../model/resModel")
var createError = require('http-errors');
var jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    // if (!req.session.username) {
    //     return res.json(new SuccessModel('未登录'))
    // }
    // next()
    // 拿取token 数据 按照自己传递方式写
    var token = req.body.token || req.query.token || req.headers['token'];
    console.log(req.body.token, req.query.token, req.headers['token']);
    if (token) {
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, 'art_panoyi_153', function (err, decoded) {
            if (err) {
                return res.json(new ErrorModel('无效的token'));
            } else {
                // 如果验证通过，在req中写入解密结果
                console.log(decoded)//{ userId: 31, iat: 1574244315, exp: 1574330715 }
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json(new SuccessModel('未检测到token'))
    }
}