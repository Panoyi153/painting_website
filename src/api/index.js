//api接口进行统一管理
import requests from "./request";
//axios返回一个promise对象
// 获取绘画列表数据 query参数 非必须
export const reqPaintList = (searchParams) =>
  requests({ url: `/artlist`, params: searchParams || {}, method: "get" });
// 获取绘画详情 params参数 必须
export const reqPaintDetail = (artid) =>
  requests({ url: `/artlist/detail/${artid}`, method: "get" });
// 获取流派列表数据 query参数 非必须
export const reqTypeList = (searchParams) =>
  requests({ url: `/typelist`, params: searchParams, method: "get" });
// 获取流派详情 params参数 必须
export const reqTypeDetail = (typeid) =>
  requests({ url: `/typelist/detail/${typeid}`, method: "get" });
// 获取作者列表数据 query 非必须
export const reqAuthorList = (searchParams) =>
  requests({ url: `/authorlist`, params: searchParams, method: "get" });
// 获取作者详情 params 必须
export const reqAuthorDetail = (authorid) =>
  requests({ url: `/authorlist/detail/${authorid}`, method: "get" });
// 请求登录 post请求 req.body username和password 必须
export const reqLogin = (userAccount) =>
  requests({ url: `/users/login`, data: userAccount, method: "post" });
// 请求用户信息 get请求 token必须
export const reqUserinfo = (token) =>
  requests({ url: `/users/user-info`, token, method: "get" });
// 请求注册 post请求 req.body username、password和nickname必须
export const reqRegister = (registerData) =>
  requests({ url: `/users/register`, data: registerData, method: "post" });
// 请求加入收藏 post请求 req.body art_id和user_id必须
export const reqAddcollect = (collectSmg) =>
  requests({ url: `/collect/addcollect`, data: collectSmg, method: "post" });
// 获取收藏列表 get请求 token必须
export const reqCollectList = (token) =>
  requests({ url: `/collect/getcollect`, token, method: "get" });
// 删除某条收藏数据请求 get请求 art_id和user_id必须
export const reqDelcollect = (collectSmg) =>
  requests({ url: `/collect/delcollect`, params: collectSmg, method: "get" });
// 添加评论 post请求 art_id、user_id和comment_content必须
export const reqAddcomment = (commentSmg) =>
  requests({ url: `/comment/addcomment`, data: commentSmg, method: "post" });
// 获取评论内容 get请求 params参数 artid必须
export const reqCommentList = (artid) =>
  requests({ url: `/comment/getcomment/${artid}`, method: "get" });
// 修改头像 post请求 uid和avatar参数必须
export const reqUpavatar = (uid, avatar) =>
  requests({
    url: `/upuser/upavatar/${uid}`,
    data: avatar,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    processData: false,
  });
// 修改用户名和昵称 post请求 infoData(uid username nickname)参数必须
export const reqUpuserinfo = (infoData) =>
  requests({ url: `/upuser/upuserinfo`, data: infoData, method: "post" });
// 修改用户密码 post请求 username password nickname参数必须
export const reqUppwd = (pwdData) =>
  requests({ url: `/upuser/uppwd`, data: pwdData, method: "post" });
