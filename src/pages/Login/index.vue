<template>
  <div class="bgBody">
    <div class="bgDiv">
      <div class="imgDiv">
        <img src="./images/logo-big.png" alt="" />
      </div>
      <div class="info">
        <ul>
          <li>
            <input type="text" placeholder="请输入账号" v-model="username" />
          </li>
          <li>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </li>
          <li><button @click.prevent="userLogin">登&nbsp录</button></li>
          <li>
            <span
              ><router-link to="/findpas"
                >忘记&nbsp/&nbsp修改密码</router-link
              ></span
            >
            <p>没有账号，前往<router-link to="/register">注册</router-link></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.User.token,
    }),
  },
  methods: {
    // 点击登录触发方法
    async userLogin() {
      try {
        let userAccount = { username: this.username, password: this.password };
        if (this.username && this.password) {
          await this.$store.dispatch("getLogin", userAccount);
          await this.$store.dispatch("getUserinfo", this.token);
          // await this.$store.dispatch("getCollectList", this.token);
          // 路由跳转
          // let toPath = "/personalcenter";
          // this.$router.push(toPath);
          // router.push({ path: 'home' })
          console.log("登录成功");
          this.$router.push({ path: "personalcenter" });
        } else {
          console.log("账号或密码不能为空");
        }
      } catch (error) {
        console.log(error);
        console.log("登录失败");
      }
    },
  },
};
</script>

<style scoped>
.bgBody {
  overflow: hidden;
  text-align: center;
  color: #333333;
  background: url(./images/爱上紫禁城5.jpg) no-repeat;
  height: 100%;
  width: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.bgDiv {
  overflow: hidden;
  width: 600px;
  height: 400px;
  margin: 100px auto;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.8);
}
.bgDiv .info {
  margin-top: 25px;
  color: #ea4e4e;
}
.bgDiv .info input {
  width: 200px;
  height: 30px;
  padding: 5px;
  color: #ea4e4e;
  font-size: 16px;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #ea4e4e;
}
.bgDiv .imgDiv {
  width: 90px;
  height: 80px;
  margin: 20px auto;
  padding: 15px;
  border-radius: 50%;
  background-color: #fff;
}
.bgDiv img {
  transform: scale(1);
  transition: transform 1s;
}
.bgDiv img:hover {
  transform: scale(1.2);
}
ul li {
  margin: 30px 0;
}
ul li button {
  width: 200px;
  height: 35px;
  padding: 5px;
  padding-left: 10px;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  background: #ea4e4e;
  outline: none;
  border: none;
}
ul li span {
  float: left;
  font-size: 14px;
  color: #333333;
  margin-left: 120px;
}
ul li p {
  float: right;
  font-size: 14px;
  color: #333333;
  margin-right: 100px;
}
</style>