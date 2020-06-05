<style scoped>
  .contain {
    width: 530px;
    height: 280px;
    margin: 20px auto;
    border: 4px solid lightcoral;
    padding: 4px 0px;
    background-color: lightcoral;
    position: relative;
    overflow: hidden;
  }
  .swiper {
    display: flex;
    position: absolute;
    left: 0px;
  }
  .indicator {
    display: flex;
    position: absolute;
    bottom: 10px;
  }
  .indicator>a {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0px 10px;
    background-color: white;
  }
  .indicator>.indPoint {
    background-color: lightcoral;
  }
</style>
<template>
  <div class="contain">
    <div class="swiper">
      <slot></slot>
    </div>

    <div class="indicator" v-show="showimgList && this.imgList.length > 1">
      <a  v-for="(item, index) in imgCount" :key='index' href="javascript:" :class="{indPoint : index==currentIndex}" ></a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showimgList: {
      type: Boolean,
      default: true
    },
    intervalTime: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      swiperObj: null,
      imgList: [],
      indicators: [],
      currentIndex: 0,
      timer: null,
      moveTimer: null,
      imgCount: 0
    }
  },
  mounted() {
    this.getDom()
    this.startCarousel()
  },
  methods: {
    startCarousel() {
      this.timer = setInterval(() => {
        this.startSwiper()
      }, this.intervalTime)
    },
    getDom() {
      this.swiperObj = document.querySelector('.swiper')
      this.imgList = this.swiperObj.getElementsByClassName('slider')
      this.imgCount = this.imgList.length
      if(this.imgList.length > 1) {
        this.$nextTick(() => {
          this.indicators = document.querySelectorAll('.indicator>a')
          const contain = document.querySelector('.contain')
          let indicator = document.querySelector('.indicator')
          indicator.style['left'] = contain.clientWidth/2 
          - indicator.clientWidth/2 + 'px'
          const cloneNode = this.imgList[0].cloneNode(true)
          this.swiperObj.appendChild(cloneNode)
          this.clickIndicator()
        })
      }
    },
    startSwiper() {
      let oldPositon = parseInt(getComputedStyle(this.swiperObj, null)['left'])
      let targetPosition = oldPositon + (-530)
      let obj = this.swiperObj
      this.move(obj, oldPositon, targetPosition, 200, 300)
      setTimeout(() => {
        let index = this.currentIndex+1
        this.currentIndex = index%this.imgCount
      }, 1000)
    },
    move(obj, oldPosition, targetPosition, speed, time, callback) {
      clearInterval(this.moveTimer)
      speed = oldPosition > targetPosition? -speed : speed
      this.moveTimer = setInterval(() => {

        oldPosition += speed
        if(speed > 0 && oldPosition >= targetPosition 
        || speed < 0 && oldPosition <= targetPosition) {
          oldPosition = targetPosition
        }
        
        obj.style['left'] = oldPosition + 'px'

        if(-oldPosition + 540 >= parseInt(getComputedStyle(this.swiperObj, null)['width'])) {
          obj.style['left'] = 0 + 'px'
        }
        if(oldPosition == targetPosition) {
          clearInterval(this.moveTimer)
          callback && callback()
        }
      }, time)
    },
    clickIndicator() {
      this.indicators.forEach((item, index) => {
        item.onclick = () => {
          if(this.currentIndex !== index) {
            clearInterval(this.timer)
            this.currentIndex = index
            let oldPosition = parseInt(getComputedStyle(this.swiperObj, null)['left'])
            let targetPosition = -530 * index
            this.move(this.swiperObj, oldPosition, targetPosition, 10000, 300, () => {
              this.startCarousel()
            })
          }
        }
      })
    }
  }
}
</script>
