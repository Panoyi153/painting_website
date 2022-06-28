<template>
  <div>
    <!-- 搜索列表 -->
    <div class="search-bg">
      <div class="search-content">
        <h2>作品搜索</h2>
        <div>
          朝代:&nbsp
          <input
            type="text"
            placeholder="请输入朝代名称"
            v-model="searchParams.dynasty"
          />
        </div>
        <div>
          作家:&nbsp
          <input
            type="text"
            placeholder="请输入作家名称"
            v-model="searchParams.author"
          />
        </div>
        <div>
          流派:&nbsp
          <input
            type="text"
            placeholder="请输入流派名称"
            v-model="searchParams.type"
          />
        </div>
        <div>
          <el-button
            class="search-btn"
            icon="el-icon-search"
            size="medium"
            circle
            @click="goSearch"
          ></el-button>
          <el-button
            class="clean-btn"
            icon="el-icon-delete"
            size="medium"
            circle
            @click="cleanValue"
          ></el-button>
        </div>
      </div>
    </div>
    <!-- 作品列表 -->
    <div class="bg">
      <ul>
        <li v-for="art in artwork" :key="art.artid">
          <div class="grid-content">
            <img :src="art.image_01" :alt="art.artName" />
          </div>
          <router-link :to="`/artdetail/${art.artid}`">
            <div class="details">
              <div class="content">
                <h2>{{ art.artName }}</h2>
                <p>{{ art.dynasty }}/{{ art.author }}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="artTotalCount"
        :page-sizes="[9, 12, 15, 18]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentpage"
        :page-size.sync="searchParams.limit"
      >
      </el-pagination>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ArtList",
  data() {
    return {
      // 发送请求需要的数据
      searchParams: {
        dynasty: "",
        author: "",
        type: "",
        // 总数据的偏移量，9的倍数
        offset: 0,
        // 每页显示的数据数量
        limit: 9,
      },
      // 当前页码，初始化为1,之后会随着分页器的改变而改变
      currentpage: 1,
    };
  },
  computed: {
    ...mapGetters(["artwork", "artTotalCount"]),
  },
  methods: {
    // 发送请求方法
    getArtlist() {
      this.$store.dispatch("getPaintList", this.searchParams);
    },
    // 搜索功能
    goSearch() {
      this.currentpage = 1;
      this.handleCurrentChange(this.currentpage);
      // this.getArtlist();
    },
    // 清除所有参数，重新发送请求
    cleanValue() {
      this.searchParams.dynasty = "";
      this.searchParams.author = "";
      this.searchParams.type = "";
      this.currentpage = 1;
      this.handleCurrentChange(this.currentpage);
      // this.getArtlist();
    },
    // 分页器方法
    handleSizeChange(size) {
      this.pagesize = size;
      // console.log(this.pagesize); //每页显示数据
    },
    // 分页器方法，改变每页数据
    handleCurrentChange(currentPage) {
      console.log("currentPage:", currentPage);
      console.log("offset:", (currentPage - 1) * this.searchParams.limit);
      this.currentpage = currentPage;
      this.searchParams.offset = (currentPage - 1) * this.searchParams.limit;
      this.getArtlist();
    },
  },
  mounted() {
    // this.$bus.$on("getPageDate", (data) => {
    //   console.log(data);
    //   this.pageData = data;
    // });
    this.getArtlist();
  },
  // beforeDestroy() {
  //   this.$bus.$off("getPageDate");
  // },
};
</script>

<style lang="css" scoped>
/* 搜索栏 */
.search-bg {
  overflow: hidden;
  width: 100%;
  height: 200px;
  padding-left: 100px;
  padding-top: 30px;
  font-size: 18px;
  background-color: #f6f2ee;
}
.search-content {
  width: 1300px;
  margin: 0 auto;
  margin-top: 10;
}
.search-content h2 {
  font-size: 28px;
  color: #ea4e4e;
}
.search-content div {
  float: left;
  margin-right: 30px;
  margin-top: 10px;
}
.search-content div input {
  width: 200px;
  height: 40px;
  padding: 5px;
  padding-left: 10px;
  font-size: 14px;
  border-radius: 4px;
  outline: none;
  border: none;
}
.search-content div button {
  width: 50px;
  height: 40px;
  margin-left: 20px;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  color: #fff;
  background-color: #ea4e4e;
}
.search-btn:active {
  background-color: #cf3c3c;
}
.clean-btn {
  width: 50px;
  height: 50px;
  font-size: 18px;
}
.clean-btn:active {
  background-color: #cf3c3c;
}
/* .search-bg {
  overflow: hidden;
  width: 100%;
  height: 200px;
  font-size: 18px;
  background: url(./images/爱上紫禁城5.jpg) no-repeat;
  background-color: #f6f2ee;
}
.search-bg .detail {
  width: 100%;
  height: 100%;
  padding-left: 100px;
  padding-top: 30px;
  color: #fff;
  background-color: rgba(84, 84, 84, 0.3);
}
.search-content {
  width: 1300px;
  margin: 0 auto;
  margin-top: 10;
}
.search-content h2 {
  font-size: 28px;
  color: #fff;
}
.search-content div {
  float: left;
  margin-right: 30px;
  margin-top: 10px;
}
.search-content div input {
  width: 200px;
  height: 40px;
  padding: 5px;
  padding-left: 10px;
  font-size: 14px;
  border-radius: 4px;
  color: #ea4e4e;
  outline: none;
  border: none;
}
.search-content div button {
  width: 50px;
  height: 40px;
  margin-left: 20px;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  color: #ea4e4e;
  background-color: #fff;
}
.search-btn:active {
  background-color: #eee;
}
.clean-btn {
  width: 50px;
  height: 50px;
  font-size: 18px;
}
.clean-btn:active {
  background-color: #eee;
} */

/* 作品列表 */
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
  margin-top: 30px;
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
/* 分页器 */
/* .block {
  margin-left: 600px;
  margin-top: 10px;
} */
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