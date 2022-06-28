const { exec } = require("../db/mysql");
// 注册账号
const register = async (username, password, nickname) => {
  const createtime = Date.now();
  const avatar = "http://localhost:3000/uploads/logo-big.png";
  let sql = `INSERT INTO users ( username, password, nickname, register_time,avatar)
    VALUE
        (
            '${username}',
            '${password}',
            '${nickname}',
            '${createtime}',
			DEFAULT(avatar)
        );`;
  const insertData = await exec(sql);
  return { id: insertData.insertId };
  /*insertData的数据
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 9,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    },
    */
};
// 登录账号
const login = async (username, password) => {
  const sql = `select uid, username, nickname,avatar from users where username='${username}' and password='${password}';`;
  const rows = await exec(sql);
  // console.log(rows[0]);
  // 如果账号密码正确，则正常返回
  // 如果不正确，那么rows[0]会是一个undefined，所以会返回一个空对象
  return rows[0] || {};
  /*rows:
    [ RowDataPacket { username: 'py8', nickname: '潘咏仪', imgbase: null } ]
    */
};
// 获取用户信息
const userInfo = (uid) => {
  let sql = `select * from users where uid=${uid};`;
  return exec(sql);
};
// 修改用户头像
const updateinfo = async (uid, file) => {
  let sql = `UPDATE users SET avatar='${file}' WHERE uid=${uid}`;
  const result = await exec(sql);
  return result;
};
// 修改用户名和昵称
const upuserinfo = async (uid, username, nickname) => {
  let sql = `UPDATE users SET username='${username}',nickname='${nickname}' WHERE uid=${uid};`;
  const result = await exec(sql);
  return result;
};
// 修改用户密码
const uppwd = async (username, password, nickname) => {
  let sql = `UPDATE users SET password='${password}' WHERE username='${username}' AND nickname='${nickname}'`;
  return exec(sql);
};
module.exports = {
  register,
  login,
  userInfo,
  updateinfo,
  upuserinfo,
  uppwd,
};
