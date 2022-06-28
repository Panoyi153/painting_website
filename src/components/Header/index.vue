<template>
  <div>
    <!-- 侧边菜单栏 -->
    <div id="header" v-show="drawer != true">
      <!-- 小logo -->
      <div class="logo-small">
        <router-link to="/home"
          ><img src="./images/logo-small.png" title="Home" alt="logo"
        /></router-link>
      </div>
      <!-- 菜单 -->
      <span @click="drawer = true" class="header-menu-icon" title="Open Menu"
        ><i class="fas fa-bars"></i
      ></span>
      <!-- 联系方式 -->
      <a href="javascript:;" class="header-contact-icon" title="Contact Me"
        ><i class="far fa-envelope"></i
      ></a>
    </div>
    <!-- 抽屉菜单 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      :size="size"
    >
      <!-- 抽屉菜单的内容 -->
      <div class="header-inner">
        <!-- 顶部logo展示 -->
        <div class="header-top">
          <div class="logo-big">
            <router-link to="/home"
              ><img src="./images/logo-big.png" title="Home" alt="logo"
            /></router-link>
          </div>
        </div>
        <!-- 中部标题选项 -->
        <div class="header-middle">
          <div id="menu">
            <ul class="nav menu-list">
              <li>
                <router-link to="/home" class="sm-scroll">首页</router-link>
              </li>
              <li>
                <router-link to="/artlist" class="sm-scroll">作品</router-link>
              </li>
              <li>
                <router-link to="/authorlist" class="sm-scroll"
                  >作者</router-link
                >
              </li>
              <li>
                <router-link to="/typelist" class="sm-scroll">流派</router-link>
              </li>
              <li>
                <router-link to="/personalcenter" class="sm-scroll"
                  >个人</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- 底部关于和说明 -->
        <div class="header-bottom">
          <!-- 联系方式图标 -->
          <div class="follow-me-buttons">
            <ul>
              <li>
                <a href="javascript:;" title="Follow me on Facebook"
                  ><i class="fab fa-facebook-f"></i
                ></a>
              </li>
              <li>
                <a href="javascript:;" title="Follow me on Dribbble"
                  ><i class="fab fa-dribbble"></i
                ></a>
              </li>
              <li>
                <a href="" title="Follow me on Behance"
                  ><i class="fab fa-behance"></i
                ></a>
              </li>
              <li>
                <a href="javascript:;" title="Email Me"
                  ><i class="far fa-envelope"></i
                ></a>
              </li>
            </ul>
          </div>
          <!-- 版权标识 -->
          <div class="copyright">
            Copyright © 2022 <br />
            <a href="javascript:;">ArtworkMuseum</a>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: false, //默认关闭
      direction: "ltr", //抽屉菜单从左边打开
      size: "18%", //抽屉大小
    };
  },
};
</script>