var express = require('express');
const { register, login, userInfo } = require('../controller/users');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')
const jwt = require('jsonwebtoken');
var router = express.Router();
// 登录路由
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  login(username, password).then(data => {
    // 这里的data就是rows[0]的数据
    // 如果账号密码错误，data.username不存在，就不会进if判断
    if (data.username) {
      // 如果正确，就将用户名等信息存入session中，这里很重要，是用来判断是否登录依据
      req.session.username = data.username
      req.session.nickname = data.nickname
      // 设置token
      let playload = {}
      playload.userId = data.uid
      playload.username = data.username
      playload.password = data.password
      const secretkey = 'art_panoyi_153'
      let token = jwt.sign(playload, secretkey, { expiresIn: '100day' })
      // 验证token
      jwt.verify(token, 'art_panoyi_153', (err, decoded) => {
        if (err) {
          console.log('invalid')
          return
        }
        req.decoded = decoded
        // console.log(decoded) // { userId: 2, username: 'pyy', iat: 1648299272, exp: 1656939272 }
      })

      res.json(new SuccessModel({ smg: '登录成功！', token: token, username: data.username, nickname: data.nickname, imgbase: data.imgbase }))
      return
    }
    else {
      res.json(new ErrorModel('登录失败！'))
      return
    }
  })
});
// 注册路由
router.post('/register', async (req, res, next) => {
  console.log(req.body)
  const username = req.body.username
  const password = req.body.password
  const nickname = req.body.nickname

  const userData = await register(username, password, nickname)
  res.json(new SuccessModel(userData))

})
// 获取用户信息路由
router.get('/user-info', loginCheck, async (req, res, next) => {
  // console.log(req.decoded);
  const userSmg = await userInfo(req.decoded.userId)
  // const userSmg = await userInfo(2)
  return res.json(new SuccessModel(userSmg[0]))
  /**
   * {
      "data": {
          "uid": 2,
          "username": "pyy",
          "password": "123ooo",
          "nickname": "李四",
          "register_time": 1647612093529,
          "imgbase": null
      },
      "code": 200
  }
   */
})
// 验证session
router.get('/session-test', (req, res, next) => {
  const session = req.session
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++
  if (session) {
    res.json({
      session,
      viewNum: session.viewNum
    })
    /**
     * {已登录
        "session": {
            "cookie": {
                "originalMaxAge": 86400000,
                "expires": "2022-03-20T14:24:05.729Z",
                "httpOnly": true,
                "path": "/"
            },
            "username": "py8",
            "nickname": "潘咏仪",
            "viewNum": 3
        },
        "viewNum": 3
      }

      未登录
      {"session":{"cookie":{"originalMaxAge":86400000,"expires":"2022-03-20T14:24:28.942Z","httpOnly":true,"path":"/"},"viewNum":5},"viewNum":5}
     */
  }
})

module.exports = router;
