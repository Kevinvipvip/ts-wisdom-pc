<template>
  <div class="detail-product page">
    <background type="border">
      <crumb to="/product_sale" to_title="文创销售"/>

      <div class="detail-title">
        <div class="detail-swiper">
          <!-- swiper1 -->
          <swiper :options="swiperOption" class="swiper product-swiper" ref="swiperTop">
            <swiper-slide class="swiper-item" v-for="(item,index) in detail.pics" :key="index">
              <div class="img-box" :style="'background-image: url('+item+')'"></div>
            </swiper-slide>
          </swiper>
          <!--swiper2 Thumbs-->
          <swiper :options="swiperOptionThumbs" class="swiper product-thumbs" ref="swiperThumbs">
            <swiper-slide class="swiper-item" v-for="(item,index) in detail.pics" :key="index">
              <div class="img-box" :style="'background-image: url('+item+')'"
                   :class="swiper_hove_on === index?'on':''"
                   @mouseenter="swiper_hover(index)"></div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="product-cont">
          <h3>{{detail.name}}</h3>
          <p><span>￥</span>{{detail.price}}</p>
          <div class="carriage"><span>运费：</span>￥{{detail.carriage}}</div>
          <div class="btn">立即购买
            <div class="code"><img :src="detail.qrcode"/>
              <p>微信扫描进入小程序</p></div>
          </div>
        </div>

      </div>

      <div class="detail-cont">
        <div class="title"><h3>产品详情</h3></div>

        <div class="rich-text" v-html="detail.detail"></div>
      </div>

    </background>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  var _self, swiperThumbs;
  export default {
    components: {
      'swiper': Swiper,
      'swiper-slide': SwiperSlide
    },
    data() {
      return {
        id: 0,
        detail: {},

        swiper_hove_on: 0,//轮播图标记

        // 轮播图配置
        swiperOption: {
          loopedSlides: 5, // looped slides should be the same
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          on: {
            init() {
              swiperThumbs = this;
            }, slideChange() {
              _self.swiper_hove_on = this.activeIndex;
            }
          }
        },
        swiperOptionThumbs: {
          loopedSlides: 5, // looped slides should be the same
          spaceBetween: 14,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          direction: 'vertical',
          slideToClickedSlide: true,
        }

      };
    }, mounted() {
      _self = this;
      this.id = parseInt(this.$route.query.id);
      this.getProductDetail();
    }, methods: {
      swiper_hover(index) {
        this.swiper_hove_on = index;
        swiperThumbs.slideTo(index);
      },

      // 获取文创产品详情
      getProductDetail() {
        this.utils.ajax(this, 'product/productDetail', { product_id: this.id }).then(res => {
          this.utils.aliyun_format(res.pics);
          this.detail = res;
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .detail-product {
    .detail-title {
      display: flex;
      margin-top: 40px;

      .detail-swiper {
        margin-right: 66px;
        width: 474px;
        height: 400px;
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;

        .swiper {
          height: 100%;

          .swiper-item {
            .img-box {
              height: 100%;
              width: 100%;
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
            }
          }

          &.product-swiper {
            flex-shrink: 0;
            width: 400px;
            background-color: #333333;
          }

          &.product-thumbs {
            flex-shrink: 0;
            width: 60px;

            .swiper-item {
              height: 60px;

              .img-box {
                background-size: cover;

                &.on {
                  box-sizing: border-box;
                  border: solid 2px #c88e45;
                }
              }
            }
          }
        }
      }

      .product-cont {
        flex-grow: 1;

        h3 {
          margin-top: 23px;
          font-weight: normal;
          font-size: 24px;
          color: #333333;
        }

        p {
          margin-top: 30px;
          color: #cf903a;
          font-size: 30px;

          span {
            margin-right: -2px;
            font-size: 24px;
          }
        }

        .carriage {
          margin-top: 30px;
          height: 52px;
          background-color: #f8f8f8;
          line-height: 52px;
          font-size: 14px;
          color: #333333;
          margin-bottom: 90px;

          span {
            color: #999999;
            margin: 0 20px;
          }
        }

        .btn {
          cursor: pointer;
          width: 168px;
          height: 46px;
          text-align: center;
          line-height: 46px;
          color: #ffffff;
          font-size: 16px;
          background-image: url("../assets/bg-home-btn.png");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;

          .code {
            position: absolute;
            opacity: 0;
            left: 190px;
            top: 50%;
            transform: translateY(-50%);
            padding: 13px;
            box-sizing: border-box;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            box-shadow: 0 1px 4px 0 rgba(210, 210, 210, 0.75);

            &:after {
              content: '';
              position: absolute;
              left: -10px;
              top: 50%;
              transform: translateY(-50%);
              width: 0;
              height: 0;
              border-right: 10px solid #eeeeee;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
            }

            img {
              width: 163px;
              height: 163px;
            }

            p {
              margin-top: 0;
              margin-left: 14px;
              line-height: 17px;
              font-size: 14px;
              color: #666666;
            }
          }

          &:hover {
            overflow: unset;

            .code {
              opacity: 1;
              transition: 0.5s;
            }
          }
        }
      }
    }

    .detail-cont {
      margin-top: 40px;
      background-color: #f8f8f8;
      overflow: hidden;

      .title {
        h3 {
          background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
          background-size: 13px 28px;
        }
      }

      .rich-text {
        margin: 0 140px 156px;

        /deep/ img {
          max-width: 100%;
        }
      }
    }
  }
</style>
