<template>
  <div id="app">
    <router-view></router-view>
    <Header />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  mounted() {
    // console.log(this);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}
html,
body {
  height: 100%;
}
html {
  overflow: hidden;
}
body {
  background-color: #f1f1f1;
  overflow: auto;
  width: calc(100vw + 20px);
}
ul {
  list-style: none;
  display: block;
}
/* 分页器 */
.block {
  /* margin-left: 600px; */
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
.el-pagination {
  text-align: center;
}
</style>
