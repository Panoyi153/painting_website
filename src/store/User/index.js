import {
  reqLogin,
  reqRegister,
  reqUpavatar,
  reqUppwd,
  reqUpuserinfo,
  reqUserinfo,
} from "@/api";

const actions = {
  // 请求登录
  async getLogin({ commit }, userAccount) {
    let result = await reqLogin(userAccount);
    if (result.code === 200) {
      commit("GETLOGIN", result.data);
      localStorage.setItem("TOKEN", result.data.token);
    } else {
      console.log(result.message);
      return Promise.reject(new Error("登录失败"));
    }
  },
  // 获取用户信息
  async getUserinfo({ commit }, token) {
    let result = await reqUserinfo(token);
    if (result.code === 200) {
      commit("GETUSERINFO", result.data);
    } else {
      return Promise.reject(new Error("获取用户信息失败"));
    }
  },
  // 退出登录
  loginOut({ commit }) {
    commit("LOGINOUT");
  },
  // 请求注册
  async getRegister({ commit }, registerData) {
    let result = await reqRegister(registerData);
    if (result.code === 200) {
      return "注册成功";
    } else {
      console.log(result.message);
      return Promise.reject(new Error("注册失败"));
    }
  },
  // 修改头像
  async upAvatar({ commit }, avatarData) {
    let { uid, avatar } = avatarData;
    let result = await reqUpavatar(uid, avatar);
    if (result.code === 200) {
      commit("UPAVATAR", result.data);
    } else {
      return Promise.reject(new Error("上传失败"));
    }
  },
  // 修改用户名和昵称
  async upUserinfo({ commit }, infoData) {
    let result = await reqUpuserinfo(infoData);
    if (result.code === 200) {
      return "修改成功";
    } else {
      return Promise.reject(new Error("修改失败"));
    }
  },
  // 修改用户密码
  async upUserpwd({ commit }, pwdData) {
    let result = await reqUppwd(pwdData);
    if (result.code === 200) {
      return "修改成功";
    } else {
      return Promise.reject(new Error("修改失败"));
    }
  },
};
/**
 * {
    "data": {
        "smg": "登录成功！",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InB5eSIsImlhdCI6MTY0ODI5Mzk0OCwiZXhwIjoxNjU2OTMzOTQ4fQ.HtWCryYP3cmhSzy5Le0rgBEXmfhoEVZ8WeZKLSFZSuI",
        "username": "pyy",
        "nickname": "李四"
    },
    "code": 200
}
 */
const mutations = {
  GETLOGIN(state, data) {
    state.token = data.token;
  },
  GETUSERINFO(state, data) {
    state.userInfo = data;
  },
  LOGINOUT(state) {
    state.userInfo = {};
    state.token = "";
    localStorage.clear("TOKEN");
  },
  UPAVATAR(state, avatar) {
    state.userInfo.avatar = avatar;
  },
};
const state = {
  userInfo: {},
  token: localStorage.getItem("TOKEN"),
};
const getters = {
  user_id(state) {
    return state.userInfo.uid || "";
  },
  token(state) {
    return state.token || "";
  },
};
export default {
  actions,
  mutations,
  state,
  getters,
};
