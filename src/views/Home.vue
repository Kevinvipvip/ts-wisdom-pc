<template>
  <div class="home page">
    <div class="swiper-box">
      <swiper class='swiper' :options="banner" v-if="swiper.length>1">

        <swiper-slide v-for="(item, index) in swiper" :key="index" class="swiper-item">
          <div class="img" :style="'background-image: url('+item.pic+')'" @click="jump(item.url)"></div>
        </swiper-slide>

      </swiper>
      <div class="my-pagination swiper-pagination"></div>
    </div>

    <div class="home1 white" :style="'background-image: url('+bg_img.home1+');'">

      <div class="home1-item">
        <h3><p>微信公众号</p><span>WeChat Official Account</span></h3>
        <div class="wx-box">
          <div class="img"><img :src="code_img"/></div>
          <div class="tip">关注公众号二维码</div>
          <router-link class="btn-ticket" tag="div" to="/service">门票预约</router-link>
        </div>
      </div>
      <div class="home1-item">
        <h3><p>参观须知</p><span>Group Reservation</span></h3>
        <div class="cont">{{notice}}</div>
      </div>
      <div class="home1-item">
        <h3><p>交通指南</p><span>Traffic Guide</span></h3>
        <div class="cont">
          <p>唐山博物馆坐落在美丽的凤凰山公园内，东临龙泽路，北临北新道。</p>
          <p>公交线路有5路、15路、16路、27路、37路、77路可达，站点名称：唐山博物馆。</p>
          <p>2020年唐山建成纵贯整个城市的超级绿道，途经唐山博物馆。唐山博物馆设有免费停车场供观众使用。</p>
        </div>
      </div>

    </div>


    <div class="home2 white">
      <div class="home2-title" :style="'background-image: url('+bg_img.home2_title+');'">
        <p>精选展览</p>
        <span>Selected Exhibitions</span>
      </div>
      <div class="home2-swiper">
        <swiper class='h-swiper' :options="home2" v-if="select_data.length>1">

          <swiper-slide v-for="(item, index) in select_data" :key="index" class="h-swiper-item" :id="item.id">
            <div class="img-box">
              <div class="img" :style="'background-image: url('+item.cover+')'"></div>
            </div>
            <h3 class="one-line-ellipsis">{{item.title}}</h3>
          </swiper-slide>

        </swiper>
      </div>
      <div class="next-page" :class="show_swiper_next_page?'show':''" @click="swiper_next">
        <img src="../assets/icon-right.png"/>
      </div>
    </div>


    <div class="home3 white" :style="'background-image: url('+bg_img.home3+');'">
      <div class="home3-title">
        <h3><p>新闻公告</p><span>News Information</span></h3>
        <router-link tag="div" to="/news" class="more">
          <p>查看更多</p>
          <div class="icon"><img src="../assets/icon-right.png"/></div>
        </router-link>
      </div>
      <ul>
        <li v-for="(item,index) in news" :key="'news'+index" @click="to_news_detail(item.id)">
          <div class="date"><p>{{item.date[2]}}</p><span>{{item.date[0]}}.{{item.date[1]}}</span></div>
          <div class="new-cont">
            <h3 class="one-line-ellipsis">{{item.title}}</h3>
            <p class="two-line-ellipsis">{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  var _self, _h_swiper;
  export default {
    name: 'Home', components: {
      'swiper': Swiper,
      'swiper-slide': SwiperSlide
    }, data() {
      return {
        bg_img: {
          home1: this.config.aliyun + 'ts-static/pc/bg-home1.png',
          home2_title: this.config.aliyun + 'ts-static/pc/bg-home2-title.png',
          home3: this.config.aliyun + 'ts-static/pc/bg-home3.png'
        },//内容块背景图

        swiper: [],//顶部轮播图数据
        banner: {
          autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          speed: 4000,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          }
        },//首页顶部轮播图

        code_img: this.config.aliyun + 'ts-static/pc/code-wx.jpg',//公众号二维码在阿里云的图片链接
        notice: '',//参观须知

        home2: {
          slidesPerView: "auto",
          spaceBetween: 24,
          resistanceRatio: 0,
          on: {
            init() {
              _h_swiper = this;
            },
            tap() {
              let id = this.clickedSlide.getAttribute('id');
              _self.$router.push({ name: 'detail_exhibit', query: { id: id, from_type: 1 } });
              console.log(id);
            },
            reachEnd() {
              if (_self.show_swiper_next_page) {
                _self.show_swiper_next_page = false;
              }
            },
            slideChangeTransitionEnd() {
              if (!_self.show_swiper_next_page) {
                if ((_self.select_data.length - 3) === this.realIndex) {
                  _self.show_swiper_next_page = true;
                }
              }
            }
          }
        },//精选预览轮播图
        show_swiper_next_page: true,
        select_data: [],//精选预览数据

        news: [],//新闻数据
      }
    },
    mounted() {
      _self = this;
      this.getSlideList();
      this.getDisplayList();
      this.getArticleList();
      this.notice = this.config.notice;
    },
    methods: {
      // 点击精选展览轮播图下一页
      swiper_next() {
        _h_swiper.slideNext();
      },

      // 点击进入新闻公告详情
      to_news_detail(id) {
        this.$router.push({ name: 'detail_news', query: { id: id, from_type: 1 } });
      },

      // 点击轮播图跳转
      jump(url) {
        if (url) {
          if (url.indexOf('http') === 0) {
            window.open(url, "_blank");
          } else {
            let page = url.split('?');
            let query = page[1].split('=');
            this.$router.push({
              name: page[0],
              query: {
                id: query[1],
                from_type: 9999
              }
            });
          }
        }
      },

      // 获取轮播图列表
      getSlideList() {
        this.utils.ajax(this, 'api/slideList').then(res => {
          this.utils.aliyun_format(res, 'pic');
          this.swiper = res;
          // console.log(res);
        });
      },

      // 获取精选展览数据内容
      getDisplayList() {
        this.utils.ajax(this, 'api/displayList', { page: 1, perpage: 3 }).then(res => {
          this.utils.aliyun_format(res.list, 'cover');
          this.select_data = res.list;
        });
      },

      // 获取新闻公告数据内容
      getArticleList() {
        this.utils.ajax(this, 'api/articleList', { page: 1, perpage: 5 }).then(res => {
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].date = res.list[i].create_time.split(' ')[0].split('-');
          }
          this.news = res.list;
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    overflow: hidden;
    background-image: url('../assets/bg-home.png');

    .swiper-box {
      height: 970px;
      position: relative;

      .swiper {
        height: 100%;
        width: 100%;

        .swiper-item {
          .img {
            width: 100%;
            height: 100%;
            cursor: pointer;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
        }
      }

      /deep/ .my-pagination {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 50px;

        .swiper-pagination-bullet {
          width: 46px;
          height: 30px;
          margin: 0 5px;
          background-image: url("../assets/icon-swiper-page1.png");
          background-color: unset;
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: center;
          outline: none;

          &.swiper-pagination-bullet-active {
            background-image: url("../assets/icon-swiper-page2.png");
          }
        }
      }
    }

    .home1 {
      /*opacity: 0;*/
      height: 577px;
      margin-top: 43px;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      padding: 34px 25px;
      box-sizing: border-box;

      .home1-item {
        width: 33.3333%;
        border-right: 1px solid #786f63;

        &:last-child {
          border: none;
        }

        h3 {
          display: flex;
          flex-flow: column;
          align-items: center;
          font-weight: normal;
          margin-bottom: 35px;

          p {
            font-size: 32px;
            color: #333333;
          }

          span {
            font-size: 14px;
            color: #333333;
            opacity: 0.6;
            margin-top: -8px;
          }
        }

        .cont {
          white-space: pre-line;
          text-align: justify;
          margin: 0 14px;
          line-height: 23px;
          font-size: 14px;
          color: #333333;

          p {
            margin-bottom: 5px;
          }
        }

        .wx-box {
          display: flex;
          flex-flow: column;
          align-items: center;

          .img {
            width: 220px;
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
          }

          .tip {
            color: #333333;
            font-size: 14px;
            margin: 13px 0 66px;
          }

          .btn-ticket {
            background-image: url("../assets/bg-home-btn.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            width: 176px;
            height: 54px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #ffffff;
            cursor: pointer;
            user-select: none;
          }
        }
      }
    }

    .home2 {
      height: 359px;
      margin: 24px auto;
      display: flex;
      position: relative;

      .home2-title {
        width: 73px;
        height: calc(100% - 24px);
        margin: 12px 24px 12px 12px;
        flex-shrink: 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;

        p {
          width: 45%;
          line-height: 35px;
          font-size: 32px;
          color: #333333;
        }

        span {
          display: block;
          line-height: 19px;
          font-size: 14px;
          color: #333333;
          opacity: 0.6;
          writing-mode: vertical-lr;
        }
      }

      .home2-swiper {
        flex-grow: 1;
        width: calc(100% - 109px);
        margin: 12px 0;

        .h-swiper {
          height: 100%;

          .h-swiper-item {
            height: 100%;
            width: 500px;
            background-color: #c88e45;
            cursor: pointer;

            .img-box {
              width: 100%;
              height: 275px;
              overflow: hidden;

              .img {
                transition: 0.5s;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
              }
            }

            h3 {
              box-sizing: border-box;
              padding: 0 15px;
              font-weight: normal;
              font-size: 16px;
              color: #ffffff;
              text-align: center;
              line-height: 60px;
            }

            &:hover {
              .img-box {
                .img {
                  transform: scale(1.1);
                }
              }
            }
          }
        }
      }

      .next-page {
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        background-color: #e8e2ca;
        border: solid 1px #786f63;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s;
        opacity: 0;
        z-index: -9;
        user-select: none;

        &.show {
          opacity: 1;
          z-index: 9;
        }

        img {
          width: 10px;
          height: 14px;
        }
      }
    }

    .home3 {
      height: 849px;
      margin-bottom: 60px;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;
      padding: 63px 48px;
      box-sizing: border-box;

      .home3-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          display: flex;
          flex-flow: column;
          align-items: center;
          font-weight: normal;

          p {
            font-size: 32px;
            color: #333333;
          }

          span {
            font-size: 14px;
            color: #333333;
            opacity: 0.6;
            margin-top: -8px;
          }
        }

        .more {
          position: relative;
          height: 100%;
          display: flex;
          padding: 15px 0;
          box-sizing: border-box;
          align-items: center;
          border-bottom: 1px solid #c88e45;
          border-top: 1px solid #c88e45;
          margin-right: 15px;
          font-size: 14px;
          color: #333333;
          cursor: pointer;

          &:hover {
            color: #c88e45;
          }

          .icon {
            position: absolute;
            width: 10px;
            height: 14px;
            top: 50%;
            transform: translateY(-50%);
            right: -15px;
          }
        }
      }

      ul {
        margin-top: 60px;

        li {
          display: flex;
          margin-bottom: 25px;
          width: 100%;
          overflow: hidden;
          height: 96px;
          cursor: pointer;

          &:hover {
            .date {
              color: #c88e45;
              border-color: #c88e45;
            }
          }

          .date {
            width: 96px;
            height: 100%;
            display: flex;
            transition: 0.5s;
            justify-content: center;
            align-items: center;
            flex-flow: column;
            flex-shrink: 0;
            margin-right: 24px;
            color: #333333;
            font-size: 16px;
            border: 1px solid #333333;
            border-radius: 10px;

            p {
              line-height: 50px;
              font-size: 60px;
            }
          }

          .new-cont {
            flex-grow: 1;
            border-bottom: 1px solid #d6d0ba;
            width: calc(100% - 220px);
            text-align: justify;
            display: flex;
            flex-flow: column;
            justify-content: space-around;

            h3 {
              font-weight: normal;
              font-size: 20px;
              color: #333333;
              margin-bottom: 5px;
            }

            p {
              line-height: 25px;
            }
          }
        }
      }
    }
  }
</style>
