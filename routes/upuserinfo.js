var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { updateinfo, upuserinfo, uppwd } = require("../controller/users");
const { ErrorModel, SuccessModel } = require("../model/resModel");
// 设置图片存储路径
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let fileFormat = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        fileFormat[fileFormat.length - 1]
    );
  },
});
// 创建文件夹
var createFolder = function (folder) {
  try {
    // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误"no such file or directory"
    fs.accessSync(folder);
  } catch (e) {
    // 文件夹不存在，以同步的方式创建文件目录。
    fs.mkdirSync(folder);
  }
};
var uploadFolder = "./uploads/";
createFolder(uploadFolder);
// 添加配置文件到muler对象。
var upload = multer({
  storage: storage,
});
// 修改头像
router.post(
  "/upavatar/:uid",
  upload.single("avatar"),
  async (req, res, next) => {
    let files = req.file;
    // console.log(req.file);
    let { uid } = req.params;
    // 设置返回结果
    if (!files) {
      res.json(new ErrorModel("上传失败"));
    } else {
      files.path = files.path.split("\\").join("/");
      avatarUrl = "http://localhost:3000/" + files.path;
      let result = await updateinfo(uid, avatarUrl);
      console.log(result);
      res.json(new SuccessModel(result, "上传成功"));
    }
  }
);
// 修改用户名和昵称
router.post("/upuserinfo", async (req, res, next) => {
  // console.log(req.body);
  let { uid, username, nickname } = req.body;
  const result = await upuserinfo(uid, username, nickname);
  res.json(new SuccessModel(result));
});
// 修改密码
router.post("/uppwd", async (req, res, next) => {
  let { username, password, nickname } = req.body;
  const result = await uppwd(username, password, nickname);
  res.json(new SuccessModel(result));
});
module.exports = router;
