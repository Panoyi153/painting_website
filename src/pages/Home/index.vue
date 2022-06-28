<template>
  <div>
    <!-- 轮播图部分 -->
    <div class="carousel">
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide
          v-for="recoArt in recommendArtworkList"
          :key="recoArt.artid"
        >
          <div class="box">
            <div class="imageBox">
              <router-link :to="`/artdetail/${recoArt.artid}`">
                <img :src="recoArt.image_01" alt="" />
              </router-link>
            </div>
            <div class="details">
              <div class="content">
                <h1>{{ recoArt.artName }}</h1>
                <p>{{ recoArt.dynasty }}&nbsp&nbsp{{ recoArt.author }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 推荐列表部分 -->
    <!-- 绘画 -->
    <div class="recommend">
      <div class="reco-title">
        <h3>作品</h3>
        <p><router-link to="/artlist">查看更多</router-link></p>
      </div>
      <div class="reco-list">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide
            v-for="recoArt in recommendArtworkList"
            :key="recoArt.artid"
          >
            <div class="imageBox">
              <router-link :to="`/artdetail/${recoArt.artid}`">
                <img :src="recoArt.image_01" alt="" />
              </router-link>
            </div>
            <div>
              <p class="reco-art-name">{{ recoArt.artName }}</p>
              <p class="reco-art-author">
                {{ recoArt.dynasty }}&nbsp&nbsp{{ recoArt.author }}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 流派 -->
    <div class="recommend">
      <div class="reco-title">
        <h3>流派</h3>
        <p><router-link to="/typelist">查看更多</router-link></p>
      </div>
      <div class="reco-list">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide
            v-for="typedata in recommendTypeList"
            :key="typedata.id"
          >
            <div class="imageBox" id="typeImg">
              <router-link :to="`/typedetail/${typedata.id}`">
                <img :src="typedata.type_img" :alt="typedata.type" />
              </router-link>
            </div>
            <div>
              <p class="reco-art-name">{{ typedata.type }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 作家 -->
    <div class="recommend">
      <div class="reco-title">
        <h3>作家</h3>
        <p><router-link to="/authorlist">查看更多</router-link></p>
      </div>
      <div class="reco-list">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide
            v-for="authordata in recommendAuthorList"
            :key="authordata.authorid"
          >
            <div class="imageBox">
              <router-link :to="`/authordetail/${authordata.authorid}`">
                <img :src="authordata.author_img" alt="" />
              </router-link>
            </div>
            <div>
              <p class="reco-art-name">{{ authordata.author }}</p>
              <p class="reco-art-author">{{ authordata.dynasty }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      swiperOptions: {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        loop: true,
        slidesPerView: 4,
        spaceBetween: 50,
      },
      swiperOption: {
        autoplay: {
          delay: 5000,
        },
        loop: true,
        effect: "fade",
      },
    };
  },
  computed: {
    // 在 new swiper 之前，页面必须要有结构！！！ nextTick
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    // 在vuex binding里面展示
    ...mapGetters(["artworkTotal", "typedataTotal", "authordataTotal"]),
    // 随机推荐列表--绘画
    recommendArtworkList() {
      return this.getRecommendlist(this.artworkTotal);
    },
    // 随机推荐列表--流派
    recommendTypeList() {
      return this.getRecommendlist(this.typedataTotal);
    },
    // 随机推荐列表--作者
    recommendAuthorList() {
      return this.getRecommendlist(this.authordataTotal);
    },
  },
  // watch: {
  //   recommendArtworkList: {
  //     handler(newValue, oldValue) {
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.cur, {
  //           autoplay: {
  //             delay: 3000,
  //             stopOnLastSlide: false,
  //             disableOnInteraction: false,
  //           },
  //           loop: true,
  //           slidesPerView: 4,
  //           spaceBetween: 50,
  //         });
  //       });
  //     },
  //   },
  // },

  methods: {
    // 请求封装--绘画列表
    getArtlist() {
      this.$store.dispatch("getPaintList");
    },
    // 请求封装--流派列表
    getTypelist() {
      this.$store.dispatch("getTypeList");
    },
    // 请求封装--作者派列表
    getAuthorlist() {
      this.$store.dispatch("getAuthorList");
    },
    // 得到随机推荐列表方法
    getRecommendlist(arr) {
      const count = 5;
      // Array.slice 的常用用法： https://blog.csdn.net/qq_36437172/article/details/109431814
      // slice 方法可以在不修改原始列表的情况下，创建列表子集的浅拷贝。
      // 注意： splice 方法会修改原始数组
      // 例如：slice(1,4) 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）
      let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      // count=4
      // i=10 min=6 i>min 执行循环体 i--
      // i=9 min=6 i>min 执行循环体 i--
      // i=8 min=6 i>min 执行循环体 i--
      // i=7 min=6 i>min 执行循环体 i--
      // i=6 min=6 i<min exit i-- i=5
      while (i-- > min) {
        //Math.random()参考：  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        // index不会超过i+1（不包括i+1），也就是说index可能是在数组中的任意个一个索引（假设数组长度为10，那么index可以是）
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        // 交换数组值 shuffled[i]是该数组的最后四项中的某一项（从最后一项开始循环，一直到倒数第四项结束）
        // shuffled[index]是随机抽取原数组中的某一个数组值
        // 每一循环都会随机抽取一组原数组的数组值（arr数组与shuffled数组最开始是一样的），然后依次循环放入到shuffled数组最后四项中
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      // 数组最后四项值，成为一个新数组
      return shuffled.slice(min);
    },
  },
  mounted() {
    // 页面挂载时发送请求
    this.getArtlist();
    this.getTypelist();
    this.getAuthorlist();

    // 给其他组件传递pageData数据
    // this.$bus.$emit("getPageDate", this.pageData);
    // console.log("Current Swiper instance object", this.mySwiper);
    // this.mySwiper.slideTo(3, 1000, false);

    // console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>
<style lang="css" scoped>
.carousel {
  width: 100%;
}
/* 轮播图样式 */
.carousel h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
/* 轮播图遮罩层样式 */
.carousel .box {
  position: relative;
  height: 700px;
}
.carousel .box .details {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.5);
}
.box .details .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
  color: #fff;
}
.box .details .content h1 {
  font-size: 60px;
}
.box .details .content p {
  font-size: 30px;
}
/* 作品部分 */
.recommend {
  margin-top: 30px;
  width: 1300px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px;
  padding-left: 50px;
  background-color: #fff;
}
.reco-title {
  overflow: hidden;
}
.reco-title h3 {
  float: left;
  font-size: 32px;
  color: #ea4e4e;
}
.reco-title p {
  float: right;
  font-size: 16px;
  color: #cacaca;
}
.reco-list div {
  overflow: hidden;
}
.reco-list .reco-art-name {
  margin: 5px 0;
  font-size: 18px;
  color: #ea4e4e;
}
.reco-list .reco-art-author {
  font-size: 14px;
  color: #475669;
}
.reco-list .imageBox img {
  transform: scale(1);
  transition: transform 2s;
}
.reco-list .imageBox img:hover {
  transform: scale(1.2);
}
.reco-list .imageBox {
  width: 267.5px;
  height: 150.46px;
}
/* type轮播图由于图片大小不一致，所以需要重新设置动画 */
.reco-list #typeImg img {
  transform: scale(1.5);
  transition: transform 2s;
}
.reco-list #typeImg img:hover {
  transform: scale(1.7);
}
</style>