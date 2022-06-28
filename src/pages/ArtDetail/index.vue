<template>
  <div>
    <div class="desBox">
      <h2>{{ artDetail.artName }}</h2>
      <h3>{{ artDetail.dynasty }}，{{ artDetail.author }}作</h3>
      <div class="description">
        <p>
          {{ artDetail.artDesc }}
        </p>
      </div>
    </div>
    <div class="imgBox">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide><img :src="artDetail.image_01" alt="" /></swiper-slide>
        <swiper-slide><img :src="artDetail.image_02" alt="" /></swiper-slide>
        <swiper-slide><img :src="artDetail.image_03" alt="" /></swiper-slide>
      </swiper>
      <div class="menuBox">
        <button @click="addCollect" class="collect-btn" ref="collect_style">
          加入收藏
        </button>
        <el-button
          @click="
            getComment();
            drawer = true;
          "
          type="primary"
          style="margin-left: 16px"
          >查看评论</el-button
        >
      </div>

      <el-drawer title="评论区" :visible.sync="drawer" size="50%">
        <div class="commentPart">
          <div class="comment-send">
            <div class="no-comment" v-show="!commentList.length">
              <p>暂无评论</p>
            </div>
            <ul v-show="commentList.length">
              <li
                class="comm-item"
                v-for="comment in commentList"
                :key="comment.id"
              >
                <div class="avatar">
                  <!-- <el-avatar icon="el-icon-user-solid"></el-avatar> -->
                  <el-avatar
                    class="avatar-img"
                    :size="50"
                    :src="comment.avatar"
                  ></el-avatar>
                  <span class="user-info"
                    >用户&nbsp&nbsp<em>{{ comment.nickname }}</em
                    >&nbsp&nbsp评论
                  </span>
                  <!-- <img src="./images/logo-small.png" alt="" /> -->
                </div>
                <div class="comm-content">
                  <p>
                    {{ comment.comm_content }}
                  </p>
                  <!-- <a href="##">回复</a> -->
                </div>
              </li>
            </ul>
          </div>
          <div class="noLogin" v-show="!user_id">
            <div class="no-login">
              <p>请先登录</p>
            </div>
          </div>
          <div class="myComment" v-show="user_id">
            <div class="avatar">
              <!-- <el-avatar icon="el-icon-user-solid"></el-avatar> -->
              <el-avatar
                class="avatar-img"
                :size="50"
                :src="userInfo.avatar"
              ></el-avatar>
              <span class="mycomm-title">发表我的评论 </span>
              <!-- <img src="./images/logo-small.png" alt="" /> -->
            </div>
            <div class="my-comment">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="textarea1"
              >
              </el-input>
              <a href="##" @click="sendComment">发表评论</a>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "ArtDetail",
  data() {
    return {
      drawer: false,
      outerVisible: false,
      innerVisible: false,
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: 20,
        grabCursor: true,
        // 鼠标滑动切换
        // mousewheel: true,
      },
      isHave: "",
      paintCollect_id: [],
      textarea1: "",
    };
  },
  computed: {
    ...mapGetters([
      "artDetail",
      "user_id",
      "collectList",
      "token",
      "commentList",
    ]),
    ...mapState({ userInfo: (state) => state.User.userInfo }),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  methods: {
    // 封装请求
    getArtdetail() {
      this.$store.dispatch("getPaintDetail", this.$route.params.artid);
    },
    // 删除数组中指定元素的方法
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    // 加入收藏事件
    addCollect() {
      /*
      1. 判断是否登录
      2.判断是否已经被收藏
      3.在组件挂载的时候就要判断，这样才能及时改变收藏图标样式
       */
      if (this.user_id) {
        // console.log("已登录");
        // 获取最新的收藏列表
        // this.$store.dispatch("getCollectList", this.token);
        // 判断是否被收藏
        // 将当前的art_id与数组中的比较，是否有相同
        this.isHave = this.paintCollect_id.find(
          (ele) => ele === parseInt(this.$route.params.artid)
        );
        // console.log("是否被收藏", this.isHave);
        if (!this.isHave) {
          // 当前绘画没有被收藏 ---> 发送加入收藏请求，成功后，改变图标样式
          // console.log("当前绘画没有被收藏");
          // console.log("发送加入收藏请求并改变样式");
          let add_collectData = {
            art_id: this.$route.params.artid,
            user_id: this.user_id,
          };
          // 请求加入收藏
          this.$store.dispatch("getAddcollect", add_collectData);
          this.$refs.collect_style.innerHTML = "取消收藏";
          // 将当前的art_id加入paintCollect_id数组中
          this.paintCollect_id.push(parseInt(this.$route.params.artid));
          // console.log(this.paintCollect_id);
        } else {
          // 当前绘画已经被收藏 ---> 发送取消收藏请求
          // console.log("当前绘画已经被收藏");
          // console.log("发送取消收藏请求并改变样式");
          let del_collectData = {
            art_id: this.$route.params.artid,
            user_id: this.user_id,
          };
          this.$store.dispatch("getDelcollect", del_collectData);
          this.$refs.collect_style.innerHTML = "加入收藏";
          // 将当前art_id从paintCollect_id数组中移除
          this.removeByValue(this.paintCollect_id, this.$route.params.artid);
          // console.log(this.paintCollect_id);
        }
      } else {
        console.log("未登录");
        // 路由跳转到登录页面
        this.$router.push({ name: "login" });
      }
    },
    // 获取评论
    getComment() {
      // console.log("发送获取评论请求");
      // 请求评论
      console.log(this.$route.params.artid);
      this.$store.dispatch("getCommentList", this.$route.params.artid);
    },
    // 发表评论
    sendComment() {
      if (this.textarea1 !== "") {
        let commentData = {
          user_id: this.user_id,
          art_id: this.$route.params.artid,
          comment_content: this.textarea1,
        };
        this.$store.dispatch("getAddcomment", commentData);
        this.textarea1 = "";
        // 重新获取评论表
        this.$store.dispatch("getCommentList", this.$route.params.artid);
      } else {
        alert("输入评论不能为空");
      }
    },
  },
  mounted() {
    this.getArtdetail();
    this.swiper.slideTo(3, 1000, false);

    // 获取收藏列表请求
    this.$store.dispatch("getCollectList", this.token);
    // 将收藏表里面的所有art_id封装成一个数组
    // let paintCollect_id = [];
    this.collectList.forEach((collect) => {
      let { art_id } = collect;
      this.paintCollect_id.push(art_id);
    });
    // console.log(this.paintCollect_id);
    // 将当前的art_id与数组中的比较，是否有相同
    this.isHave = this.paintCollect_id.find(
      (ele) => ele === parseInt(this.$route.params.artid)
    );
    // isHave不是undefined
    if (this.isHave) {
      // 如果已被收藏，改变样式
      this.$refs.collect_style.innerHTML = "取消收藏";
    }
  },
};
// removeHtmlTab(tab) {
//   console.log(tab.replace(/<[^<>]+?>/g, ""));
//   return tab.replace(/<[^<>]+?>/g, ""); //删除所有HTML标签
// },
</script>

<style>
/* 与xxxDetail组件共享样式 */
.desBox,
.imgBox {
  width: 1300px;
  margin: 15px auto;
  padding: 20px;
  background-color: #fff;
}
.desBox h2,
.imgBox h2 {
  margin: 5px 0;
  font-size: 32px;
  color: #ea4e4e;
  font-weight: 500;
  display: block;
  text-align: center;
}
.desBox h3 {
  margin: 5px 0;
  font-size: 16px;
  font-weight: normal;
  color: #fa6c6c;
  display: block;
  text-align: center;
  line-height: 40px;
}
.desBox .description {
  padding: 0 30px;
}
.desBox .description p {
  font-size: 17px;
  font-weight: 300;
  color: #333;
  line-height: 27px;
  margin-top: 24px;
}
.imgBox .menuBox {
  width: 500px;
  margin: 50px auto;
}
.imgBox .menuBox button {
  width: 180px;
  height: 50px;
  margin-right: 50px;
  padding: 5px;
  padding-left: 10px;
  color: white;
  font-size: 16px;
  border-radius: 100px;
  background: #ea4e4e;
  outline: none;
  border: none;
}
.imgBox .menuBox button:hover {
  background: #d04747;
}
/* collect-btn */
.comment .commitCom {
  background-color: #ea4a4a;
  border: #ea4a4a;
}
.comment .commitCom:hover {
  background-color: #cf3a3a;
}
.comment .closeBtn:hover {
  color: #333;
  background-color: #fff;
  border: 1px solid rgb(238, 238, 238);
}
/* 评论区域 */
.commentPart {
  margin: 10px;
}
.commentPart .comment-send .no-comment {
  overflow: hidden;
  width: 700px;
  height: 100px;
  padding-bottom: 10px;
  margin: 15px 0;
  border: #ccc solid 1px;
  border-radius: 10px;
}
.commentPart .comment-send .no-comment p {
  /* margin-left: 300px; */
  text-align: center;
  line-height: 100px;
  color: #ccc;
  font-weight: bold;
  font-size: 30px;
}
.commentPart .comment-send ul li {
  overflow: hidden;
  width: 700px;
  /* height: 60px; */
  padding-bottom: 10px;
  margin: 15px 0;
  border: #ea4e4e solid 1px;
  border-radius: 10px;
}
.commentPart .comment-send .comm-item .avatar {
  overflow: hidden;
  width: 100%;
  /* height: 50px; */
  margin: 5px 10px;
  /* padding: 10px;
  border-bottom: #ccc solid 1px; */
}
.commentPart .comment-send .comm-item .avatar .avatar-img {
  float: left;
}
.commentPart .comment-send .comm-item .avatar .user-info {
  float: left;
  color: rgb(187, 187, 187);
  margin-left: 10px;
  font-size: 16px;
  margin-top: 10px;
}
.commentPart .comment-send .comm-item .avatar .user-info em {
  color: #ea4e4e;
}
.commentPart .comment-send .comm-item .comm-content {
  margin: 10px;
}
.commentPart .comment-send .comm-item .comm-content p {
  margin: 0 10px;
}
.commentPart .comment-send .comm-item .comm-content a {
  float: right;
  font-size: 16px;
  margin-right: 10px;
}
/* 发表我的评论 */
.commentPart .myComment {
  overflow: hidden;
  width: 700px;
  padding: 10px;
  border: #ea4e4e solid 1px;
  border-radius: 10px;
}
.commentPart .myComment .avatar {
  overflow: hidden;
}
.commentPart .myComment .avatar span {
  float: left;
}

.commentPart .myComment .avatar .mycomm-title {
  color: rgb(187, 187, 187);
  margin-left: 10px;
  font-size: 16px;
  margin-top: 10px;
}
.commentPart .myComment .my-comment {
  overflow: hidden;
  width: 100%;
  margin-top: 20px;
}
.commentPart .myComment .my-comment a {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
/* 未登录时的显示 */
.commentPart .noLogin {
  overflow: hidden;
  width: 700px;
  height: 100px;
  padding: 10px;
  border: #ccc solid 1px;
  border-radius: 10px;
}
.commentPart .noLogin .no-login p {
  /* margin-left: 300px; */
  text-align: center;
  line-height: 80px;
  color: #ccc;
  font-weight: bold;
  font-size: 30px;
}
</style>