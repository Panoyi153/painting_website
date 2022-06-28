<template>
  <div>
    <!-- 搜索列表 -->
    <div class="search-bg">
      <div class="search-content">
        <h2>流派搜索</h2>
        <div>
          流派:&nbsp
          <input
            type="text"
            placeholder="请输入流派名称"
            v-model="searchParams.type"
          />
        </div>
        <!-- <div>
          作品:&nbsp
          <input type="text" placeholder="请输入作品名称" v-model="artInput" />
        </div> -->
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
        <li v-for="type in typeData" :key="type.id">
          <div class="grid-content">
            <img :src="type.type_img" :alt="type.type" />
          </div>
          <router-link :to="`/typedetail/${type.id}`">
            <div class="details">
              <div class="content">
                <h2>
                  <a href="#">{{ type.type }}</a>
                </h2>
                <!-- <p>宋代/方从义</p> -->
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
        :total="typeTotalCount"
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
  name: "TypeList",
  data() {
    return {
      searchParams: {
        type: "",
        limit: 6,
        offset: 0,
      },
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["typeTotalCount", "typedataTotal", "typeData"]),
  },
  methods: {
    // 封装请求
    getTypelist() {
      this.$store.dispatch("getTypeList", this.searchParams);
    },
    // 分页器方法，改变每页数据
    handleCurrentChange(currentPage) {
      console.log("currentPage:", currentPage);
      console.log("offset:", (currentPage - 1) * this.searchParams.limit);
      this.currentpage = currentPage;
      this.searchParams.offset = (currentPage - 1) * this.searchParams.limit;
      this.getTypelist();
    },
    goSearch() {
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
      // this.getTypelist();
    },
    cleanValue() {
      this.searchParams.type = "";
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
      // this.getTypelist();
    },
  },
  mounted() {
    this.getTypelist();
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
  margin-bottom: 20px;
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
  width: 380px;
  height: 200px;
}
ul li div img {
  transform: scale(1.5);
  transition: transform 2s;
}
ul li:hover div img {
  transform: scale(1.8);
}
ul li .details {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  border-radius: 4px;
  /* background: rgba(234, 78, 78, 0.8); */
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
  padding-top: 85px;
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
  margin-left: 650px;
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