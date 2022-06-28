<template>
  <div>
    <div class="desBox">
      <h2>{{ authorSigle.author }}</h2>
      <h3>{{ authorSigle.dynasty }}</h3>
      <div class="description">
        <p>{{ authorSigle.authorDesc }}</p>
      </div>
    </div>
    <div class="imgBox">
      <h2>作家作品</h2>
      <div class="imgDiv">
        <div class="recommend">
          <div class="reco-list">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide
                v-for="authorDec in authorDetail"
                :key="authorDec.artid"
              >
                <div class="image-box">
                  <router-link :to="`/artdetail/${authorDec.artid}`">
                    <img :src="authorDec.image_01" alt="" />
                  </router-link>
                </div>
                <div>
                  <p class="reco-art-name">{{ authorDec.artName }}</p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AuthorDetail",
  data() {
    return {
      // Swiper参数
      swiperOptions: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        slidesPerView: 3,
        spaceBetween: 20,
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    ...mapGetters(["authorDetail"]),
    authorSigle() {
      return this.authorDetail[0] || {};
    },
  },
  methods: {
    getAuthorDetail() {
      this.$store.dispatch("getAuthorDetail", this.$route.params.authorid);
    },
  },
  mounted() {
    this.getAuthorDetail();
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>

<style scoped>
.description {
  padding: 0 100px;
}
.imgDiv {
  overflow: hidden;
  margin: 0 auto;
}
.recommend {
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}
.reco-list div {
  overflow: hidden;
}
.reco-list div .reco-art-name {
  margin: 5px 0;
  font-size: 18px;
  color: #ea4e4e;
}
.reco-list div .reco-art-author {
  font-size: 14px;
  color: #475669;
}
.reco-list div img {
  transform: scale(1);
  transition: transform 2s;
}
.reco-list div img:hover {
  transform: scale(1.2);
}
.reco-list .image-box {
  overflow: hidden;
  width: 373.33px;
  height: 258.45px;
}
</style>
