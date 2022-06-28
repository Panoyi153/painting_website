<template>
  <div class="bg">
    <div class="updateinfo-title">
      <h3>修改信息</h3>
    </div>
    <dl>
      <dt><img :src="userInfo.avatar" alt="" /></dt>
      <dd>
        <!-- <div
          style="display: inline-block; vertical-align: middle; margin: 3px 0px"
          class="webuploader-container"
        >
          <div class="webuploader-pick">上传</div>
          <div
            style="
              position: absolute;
              inset: 0px auto auto 0px;
              width: 58px;
              height: 27px;
              overflow: hidden;
            "
          >
            <input type="file" name="file" />
            <label
              style="
                opacity: 0;
                width: 100%;
                height: 100%;
                display: block;
                cursor: pointer;
                background: rgb(255, 255, 255);
              "
            ></label>
          </div>
        </div> -->
        <label for="my_file" class="webuploader-pick">修改头像</label>
        <input
          type="file"
          ref="upload"
          name="avatar"
          id="my_file"
          style="display: none"
          @change="changeimg($event)"
        />
      </dd>
    </dl>
    <div class="text-up">
      <ul>
        <li>
          账号：
          <input type="text" v-model="newUsername" />
        </li>
        <li>
          昵称：
          <input type="text" v-model="newNickname" />
        </li>
        <li><button @click="updateUserinfo">确认修改</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UpUserInfo",
  data() {
    return {
      newNickname: "",
      newUsername: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.User.userInfo,
      token: (state) => state.User.token,
    }),
  },
  methods: {
    async changeimg(event) {
      let pic = event.target.files[0];
      let type = pic.type; //文件类型
      if (type != "image/jpeg" && type != "image/png") {
        alert("请上传正确格式图片");
        return false;
      }
      let size = parseInt(pic.size) / 1024 / 1024; //文件大小（换算成 M）
      if (size > 1) {
        alert("文件过大");
        return false;
      }
      let fd = new FormData();
      fd.append("avatar", pic);
      console.log(fd.get("avatar"));
      let avatarData = {
        uid: this.userInfo.uid,
        avatar: fd,
      };
      await this.$store.dispatch("upAvatar", avatarData);
      await this.$store.dispatch("getUserinfo", this.token);
    },
    async updateUserinfo() {
      if (this.newUsername && this.newNickname) {
        let newInfo = {
          uid: this.userInfo.uid,
          username: this.newUsername,
          nickname: this.newNickname,
        };
        await this.$store.dispatch("upUserinfo", newInfo);
        await this.$store.dispatch("getUserinfo", this.token);
        this.newUsername = "";
        this.newNickname = "";
        this.$router.push({ path: "collectlist" });
      } else {
        alert("请填写完整");
      }
    },
  },
};
</script>

<style lang='css' scoped>
/* 背景盒子 */
.bg {
  overflow: hidden;
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: #fff;
}
/* 标题 */
.updateinfo-title {
  overflow: hidden;
  padding-top: 45px;
  padding-left: 47px;
}
.updateinfo-title h3 {
  float: left;
  font-size: 32px;
  color: #ea4e4e;
}
/* 修改主体 */
.bg dl {
  overflow: hidden;
  margin-top: 40px;
}
.bg dl dt {
  width: 90px;
  /* height: 130px; */
  display: block;
  margin: 0 auto;
  /* padding: 5px; */
  border-radius: 1000px;
  overflow: hidden;
  border: 1px solid #eeeeee;
}
.bg dl dt img {
  width: 130px;
  height: 85px;
  /* border-radius: 1000px; */
}
.bg dl dd {
  display: block;
  margin-top: 30px;
  padding: 0 0 0 612px;
  font-size: 14px;
}
.bg dl dd .webuploader-pick {
  position: relative;
  display: inline-block;
  height: 35px;
  font-weight: normal;
  cursor: pointer;
  background: #ea4e4e;
  padding: 5px 15px;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  line-height: 27px;
  font-size: 14px;
}
.bg dl dd input {
  /* position: absolute !important; */
  margin-top: 20px;
  width: 72px;
}
.bg .text-up {
  overflow: hidden;
  text-align: center;
  color: #ea4e4e;
}
.bg .text-up ul li {
  margin-bottom: 20px;
}
.bg .text-up ul li input {
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
.bg .text-up ul li button {
  width: 150px;
  height: 40px;
  background: #ea4e4e;
  padding: 5px 15px;
  margin-left: 10px;
  margin-top: 30px;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
}
.bg .text-up ul li button:hover,
.bg dl dd .webuploader-pick:hover {
  background-color: #cd4343;
}
</style>