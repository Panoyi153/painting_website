<template>
  <div>
    <div class="desBox">
      <h2>{{ typeSigle.type }}</h2>
      <div class="description">
        <p>{{ typeSigle.typeDesc }}</p>
      </div>
    </div>
    <div class="imgBox">
      <h2>代表作品</h2>
      <div class="imgDiv">
        <div class="recommend">
          <div class="reco-list">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="typeDec in typeDetail" :key="typeDec.artId">
                <router-link :to="`/artdetail/${typeDec.artId}`">
                  <div>
                    <img :src="typeDec.image_01" alt="" />
                  </div>
                  <div>
                    <p class="reco-art-name">{{ typeDec.artName }}</p>
                  </div>
                </router-link>
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
  name: "TypeDetail",
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
    ...mapGetters(["typeDetail"]),
    typeSigle() {
      return this.typeDetail[0] || {};
    },
  },
  methods: {
    getTypeDetail() {
      this.$store.dispatch("getTypeDtail", this.$route.params.typeid);
    },
  },
  mounted() {
    this.getTypeDetail();
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
  width: 373px;
  height: 210px;
  transform: scale(1);
  transition: transform 2s;
}
.reco-list div img:hover {
  transform: scale(1.2);
}
.reco-art-name {
  padding-top: 10px;
  text-align: center;
}
/* 373 210 */
</style>
