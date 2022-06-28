<template>
  <div class="bgBody">
    <div class="bgDiv">
      <div class="imgDiv">
        <img src="./images/logo-big.png" alt="" />
      </div>
      <div class="info">
        <ul>
          <li>
            <input type="text" placeholder="请输入用户名" v-model="username" />
          </li>
          <li>
            <input type="text" placeholder="请输入昵称" v-model="nickname" />
          </li>
          <li>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="请再次输入密码"
              v-model="repwd"
            />
          </li>
          <li><button @click="userRegister">注&nbsp册</button></li>
          <li>
            <p>前往<router-link to="/login">登录</router-link></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      nickname: "",
      password: "",
      repwd: "",
    };
  },
  methods: {
    async userRegister() {
      try {
        let registerData = {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        };
        console.log("判断格式");
        if (this.username && this.nickname && this.password === this.repwd) {
          console.log("格式正确");
          console.log("派发action");
          await this.$store.dispatch("getRegister", registerData);
          console.log("路由跳转");
          this.$router.push("/login");
        } else {
          alert("请确认格式是否输入正确");
          console.log("格式不正确");
        }
      } catch (error) {
        return "注册失败！";
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
  /* height: 400px; */
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
  padding: 10px;
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
  margin: 20px 0;
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
ul li p {
  float: right;
  font-size: 16px;
  color: #333333;
  margin-top: 20px;
  margin-right: 100px;
}
</style>