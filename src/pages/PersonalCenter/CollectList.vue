<template>
  <div class="bg">
    <div class="collect-title">
      <h3>我的收藏</h3>
    </div>
    <div class="noCollect" v-show="!collectList.length">
      <p>您还没有收藏噢~</p>
    </div>
    <ul v-show="collectList.length">
      <li v-for="collect in collectList" :key="collect.co_id">
        <div class="grid-content">
          <img :src="collect.image_01" />
        </div>
        <router-link :to="`/artdetail/${collect.art_id}`">
          <div class="details">
            <div class="content">
              <h2>{{ collect.artName }}</h2>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CollectList",
  computed: {
    ...mapState({
      collectList: (state) => state.Collect.collectList || [],
      token: (state) => state.User.token,
    }),
  },
  mounted() {
    this.$store.dispatch("getCollectList", this.token);
  },
};
</script>

<style lang='css' scoped>
/* 收藏列表 */
.collect-title {
  overflow: hidden;
  padding-top: 45px;
  padding-left: 47px;
}
.collect-title h3 {
  float: left;
  font-size: 32px;
  color: #ea4e4e;
}
.bg {
  overflow: hidden;
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: #fff;
}
ul {
  margin-left: 50px;
  padding: 0;
  border: 0;
}
ul li {
  position: relative;
  float: left;
  overflow: hidden;
  width: 380px;
  height: 200px;
  margin-right: 30px;
  margin-top: 20px;
  border-radius: 4px;
}
ul li div {
  overflow: hidden;
}
ul li div img {
  transform: scale(1.05);
  transition: transform 2s;
}
ul li:hover div img {
  transform: scale(1.2);
}
ul li .details {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  transform: scaleY(0) scaleX(0);
  transition: transform 0.5s;
}
ul li:hover .details {
  transform: scaleY(1) scaleX(1);
}
ul li .details .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
  color: #fff;
}
ul li .details .content h2 {
  padding-top: 20px;
  font-size: 22px;
}
ul li .details .content h2 a {
  color: #fff;
}
ul li .details .content p {
  font-size: 16px;
}
.grid-content {
  border-radius: 4px;
  /* height: 350px; */
}

.bg .noCollect {
  overflow: hidden;
  width: 100%;
  padding-bottom: 10px;
  margin: 15px 0;
}
.bg .noCollect p {
  text-align: center;
  margin: 0 auto;
  line-height: 100px;
  color: #ccc;
  font-weight: bold;
  font-size: 30px;
}

/* 分页器 */
.block {
  margin-left: 600px;
  margin-top: 10px;
}
.block >>> button,
.block >>> .el-pager li {
  background-color: transparent !important;
  color: rgb(78, 78, 78) !important;
  border: 1px solid #d1d3d4;
}

.block >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ea4e4e !important;
  color: white !important;
}
</style>