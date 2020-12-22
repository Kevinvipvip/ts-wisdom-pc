<template>
  <div class="bg-box" :style="bg_img?'background-image: url('+bg_img+')':''">
    <div class="if-box" v-if="type!=='border'">
      <div class="bg-img" v-if="bg_num===1">
        <div class="img m-top" :style="'background-image: url('+img.mou_top+')'"></div>
      </div>
      <div class="bg-img" v-else-if="bg_num===2">
        <div class="img m-top" :style="'background-image: url('+img.mou_top+')'"></div>
        <div class="img m-bottom" :style="'background-image: url('+img.mou_bottom+')'"></div>
      </div>
      <div class="bg-img" v-else>
        <div class="img m-top" :style="'background-image: url('+img.mou_top+')'"></div>
        <div class="img m-center" :style="'background-image: url('+img.mou_center+')'"></div>
        <div class="img m-bottom" :style="'background-image: url('+img.mou_bottom+')'"></div>
      </div>
    </div>
    <div class="bg-border">
      <div class="border b-top" :style="'background-image: url('+img.bor_top+')'"></div>
      <div class="border b-center" :style="'background-image: url('+img.bor_center+')'"></div>
      <div class="border b-bottom" :style="'background-image: url('+img.bor_bottom+')'"></div>
    </div>

    <div class="slot">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Bg",
    props: {
      bg_img: {//最底层背景图：有传值显示图片，没有传值为白色背景颜色
        type: String,
        default: ''
      },
      bg_num: {//黑色大山的个数
        type: Number,
        default: 3
      },
      type: {//有没有大山的背景填充，‘all’为默认的都有，‘border’ 为只显示边框和白背景
        type: String,
        default: 'all'
      }
    },
    data() {
      return {
        img: {
          mou_top: this.config.aliyun + 'ts-static/pc/bg/mou-top.png',
          mou_center: this.config.aliyun + 'ts-static/pc/bg/mou-center.png',
          mou_bottom: this.config.aliyun + 'ts-static/pc/bg/mou-bottom.png',
          bor_top: this.config.aliyun + 'ts-static/pc/bg/bor-top.png',
          bor_center: this.config.aliyun + 'ts-static/pc/bg/bor-center.png',
          bor_bottom: this.config.aliyun + 'ts-static/pc/bg/bor-bottom.png',
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .bg-box {
    width: 1200px;
    margin: 104px auto 24px;
    position: relative;
    min-height: 557px;
    background-color: #ffffff;
    box-shadow: 0 1px 20px 0 rgba(235, 228, 204, 0.6);

    .bg-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;

      .img {
        position: absolute;
        left: 0;
        width: 100%;
        background-position: top;
        background-size: 100%;
        background-repeat: no-repeat;
        height: 557px;

        &.m-top {
          top: 0;
          z-index: 2;
        }

        &.m-center {
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        &.m-bottom {
          bottom: 0;
          z-index: 2;
        }
      }
    }

    .bg-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      display: flex;
      flex-flow: column;
      justify-content: space-between;

      .border {
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;

        &.b-top {
          height: 60px;
          flex-shrink: 0;
        }

        &.b-center {
          flex-grow: 1;
          background-repeat: repeat-y;
        }

        &.b-bottom {
          height: 60px;
          flex-shrink: 0;
        }
      }
    }

    .slot {
      position: relative;
      z-index: 4;
      padding: 36px;
      box-sizing: border-box;
    }
  }
</style>
