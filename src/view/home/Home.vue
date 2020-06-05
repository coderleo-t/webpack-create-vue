<style scoped>


</style>
<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in imageList" :key='index'>
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {Swiper, SwiperItem} from 'util/swiper'
export default {
  data() {
    return {
      imageList: [
        require('../../assets/img/1.jpg'),
        require('../../assets/img/2.jpg'),
        require('../../assets/img/3.jpg'),
        require('../../assets/img/4.jpg'),
        require('../../assets/img/5.jpg'),
      ]
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>
