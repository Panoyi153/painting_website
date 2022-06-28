<template>
  <div class="background">
    <!-- 用户信息 -->
    <div class="user-bg">
      <div class="user-content">
        <dl>
          <dt>
            <a href="#"> <img :src="userInfo.avatar" /></a>
          </dt>
          <a href="#"> </a>
          <dd>
            <b>{{ userInfo.username }}</b>
            <p>昵称:{{ userInfo.nickname }}</p>
            <p>
              <router-link to="/personalcenter/upuserinfo">修改信息</router-link
              >|
              <router-link to="/personalcenter/collectlist"
                >查看收藏</router-link
              >
              |
              <a href="javascript:;" @click.prevent="loginout">退出登录</a>
            </p>
          </dd>
          <div class="clear"></div>
        </dl>
      </div>
    </div>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PersonalCenter",
  computed: {
    ...mapState({
      userInfo: (state) => state.User.userInfo,
    }),
  },
  methods: {
    // 退出登录
    loginout() {
      console.log("退出登录");
      this.$store.dispatch("loginOut");
      // 跳转到登录页;
      this.$router.push("/login");
    },
  },
};
</script>

<style lang='css' scoped>
/* 用户信息栏 */
.user-bg {
  overflow: hidden;
  width: 100%;
  height: 200px;
  padding-left: 100px;
  padding-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  background-color: #f6f2ee;
}
.user-content {
  width: 1300px;
  margin: 0 auto;
  margin-top: 10;
}
.user-content dl {
  width: 420px;
  float: left;
  display: inline;
  margin-top: 30px;
  /* background-color: rgba(0, 0, 0, 0.2); */
  border-radius: 1000px;
}
.user-content dl dt {
  width: 120px;
  float: left;
  display: inline;
  border-radius: 1000px;
  overflow: hidden;
}
.user-content dl dt img {
  width: 120px;
  height: 120px;
}
.user-content dl dd {
  display: block;
  width: 270px;
  float: right;
  text-align: left;
  margin-top: 8px;
  /* margin-inline-start: 40px; */
}
.user-content dl dd b {
  color: #ea4e4e;
  font-size: 30px;
}
.user-content dl dd p,
.user-content dl dd p a {
  margin: 10px 0;
  color: rgb(71, 71, 71);
  font-size: 16px;
}
.clear {
  clear: both;
  font-size: 0;
  line-height: 0;
  height: 0;
  vertical-align: middle;
}
</style>