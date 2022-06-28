<template>
  <div>
    <!-- 搜索列表 -->
    <div class="search-bg">
      <div class="search-content">
        <h2>作者搜索</h2>
        <div>
          朝代:&nbsp
          <input
            type="text"
            placeholder="请输入朝代名称"
            v-model="searchParams.dynasty"
          />
        </div>
        <div>
          作者:&nbsp
          <input
            type="text"
            placeholder="请输入作者名称"
            v-model="searchParams.author"
          />
        </div>
        <div>
          <el-button
            icon="el-icon-search"
            class="search-btn"
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
        <li v-for="author in authorData" :key="author.authorid">
          <div class="grid-content">
            <router-link :to="`/authordetail/${author.authorid}`">
              <img :src="author.author_img" />
              <h2>
                {{ author.author }}
                <font>{{ author.dynasty }}</font>
              </h2>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="authorTotalCount"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
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
  name: "AuthorList",
  data() {
    return {
      searchParams: {
        dynasty: "",
        author: "",
        offset: 0,
        limit: 12,
      },
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["authorData", "authordataTotal", "authorTotalCount"]),
  },
  methods: {
    getAuthorlist() {
      this.$store.dispatch("getAuthorList", this.searchParams);
    },
    goSearch() {
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
      // this.getAuthorlist();
    },
    cleanValue() {
      this.searchParams.author = "";
      this.searchParams.dynasty = "";
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
      // this.getAuthorlist();
    },
    handleCurrentChange(currentPage) {
      console.log("currentPage:", currentPage);
      console.log("offset:", (currentPage - 1) * this.searchParams.limit);
      this.currentpage = currentPage;
      this.searchParams.offset = (currentPage - 1) * this.searchParams.limit;
      this.getAuthorlist();
    },
  },
  mounted() {
    this.getAuthorlist();
  },
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
  color: #cacaca;
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
/* 作品列表 */
.bg {
  overflow: hidden;
  width: 1300px;
  height: 100%;
  margin: 20px auto;
  padding-bottom: 20px;
  background-color: #fff;
}
ul {
  margin-left: 150px;
  padding: 0;
  border: 0;
}
ul li {
  position: relative;
  float: left;
  overflow: hidden;
  width: 192px;
  height: 192px;
  display: inline;
  margin-top: 60px;
  margin-right: 60px;
  border-radius: 1000px;
}
ul li div {
  overflow: hidden;
}
ul li div img {
  height: 192px;
  border-radius: 1000px;
  display: block;
  transform: scale(1.05);
  transition: transform 2s;
}
ul li:hover div img {
  transform: scale(1.2);
}

ul li .grid-content h2 {
  width: 192px;
  height: 126px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  font-weight: 300;
  color: #fff;
  text-align: center;
  padding: 66px 0 0 0;
  z-index: 5;
  transition: all 0.5s;
  border-radius: 1000px;
}
ul li .grid-content h2 a {
  color: #fff;
}
ul li .grid-content h2 font {
  display: block;
  width: 70px;
  font-size: 15px;
  font-weight: 300;
  color: #fff;
  text-align: center;
  margin: 0 auto;
  border-top: 1px solid #fff;
  line-height: 30px;
  margin-top: 4px;
}
.grid-content {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1000px;
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