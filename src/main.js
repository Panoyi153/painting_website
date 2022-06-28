import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "@/router";
// 引入elementUI插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入Swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
// 使用插件
Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI);
// 引入全局组件
// import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
// 使用全局组件
// Vue.component(Pagination.name, Pagination)
Vue.component(Footer.name, Footer);
// 引入其他文件
import * as API from "@/api";
// 关闭Vue自动生成的提示
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
