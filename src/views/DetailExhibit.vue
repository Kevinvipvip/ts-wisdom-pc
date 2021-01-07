<template>
  <!--展览详情-->
  <div class="detail page exhibit">
    <background type="border">
      <crumb :to="from_route" :to_title="from_title"/>
      <div class="title"><h3>展览简介</h3></div>
      <div class="brief">
        <div class="img" :style="'background-image: url('+detail.cover+')'"></div>
        <div class="brief-cont">
          <h3>{{detail.title}}</h3>
          <div class="attr">
            <div class="attr-item">
              <p>展览类型</p>
              <span>{{detail.tag}}</span>
            </div>
            <div class="attr-item">
              <p>展览开始时间</p>
              <span>{{detail.start_time}}</span>
            </div>
            <div class="attr-item">
              <p>展览地点</p>
              <span>{{detail.address}}</span>
            </div>
          </div>
          <div class="desc">{{detail.limit_desc}}...
            <div class="look-all" @click="look_all">查看全部<img src="../assets/icon-arrows-default.png"/></div>
          </div>
          <div class="btn">预约参观
            <div class="code"><img :src="code"/>
              <p>微信扫描二维码预约</p></div>
          </div>
        </div>
      </div>


      <div class="title" v-if="detail.collect_list.length"><h3>精彩展品</h3></div>
      <div class="wonderful-box" v-if="detail.collect_list.length">
        <div class="wonderful" :class="show_more?'show-more':''">
          <div class="wonderful-item" v-for="(item,index) in detail.collect_list" :key="'collect'+index"
               @click="to_collect_detail(item.id)">
            <div class="img-box">
              <div class="img" :style="'background-image: url('+item.pic+')'"></div>
            </div>
            <div class="item-cont">
              <h3 class="two-line-ellipsis">{{item.title}}</h3>
              <p>{{item.dynasty}}/{{item.cate_name}}/{{item.origin}}</p>
            </div>
          </div>
        </div>
        <div class="btn-more" v-if="!show_more" @click="show_more=true">查看更多</div>
      </div>


      <div class="title" v-if="detail.pics.length>0"><h3>展厅内景</h3></div>
      <swiper class='swiper' :options="banner" v-if="detail.pics.length>0">

        <swiper-slide v-for="(item, index) in detail.pics" :key="index" class="swiper-item">
          <div class="img" :style="'background-image: url('+item+')'" @click="open(item)"></div>
        </swiper-slide>

      </swiper>

    </background>

    <!--点击查看大图显示遮罩-->
    <div class="img-mask" v-if="img_mask" @click="hiddin_img">
      <div class="img-mask-cont" :style="'background-image: url('+look_img_url+')'"></div>
    </div>

    <div class="mask" v-if="show_mask" @click="show_mask=false">
      <div class="mask-cont" @click.stop>
        <div class="close" @click.stop="show_mask=false"><img src="../assets/icon-close.png"/></div>
        <background class="bg" type="border">
          <h2>{{detail.title}}</h2>
          <p>{{detail.desc}}</p>
        </background>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    components: {
      'swiper': Swiper,
      'swiper-slide': SwiperSlide
    }, data() {
      return {
        from_route: '',
        from_title: '',
        id: 0,
        code: this.config.aliyun + 'ts-static/pc/code-ticket.png',//二维码在阿里云的图片链接

        detail: { pics: [] },//展览简介

        banner: {
          slidesPerView: "auto",
          spaceBetween: 24,
          resistanceRatio: 0,
        },//展厅内景轮播图配置

        show_mask: false,
        img_mask: false,
        look_img_url: '',
        show_more: false,//精彩展品是否显示更多
      };
    },
    // beforeRouteEnter(to, from, next) {
    //   console.log(to, 'to')
    //   console.log(from, 'from')
    //   next();
    // },
    mounted() {
      this.id = parseInt(this.$route.query.id);
      if (this.id === 2 || this.id === 3)
        this.id = 1;
      this.judge_from_type(parseInt(this.$route.query.from_type));
      this.utils.ajax(this, 'api/displayDetail', { display_id: this.id }).then(res => {
        this.utils.aliyun_format(res, 'cover');
        this.utils.aliyun_format(res.pics,);
        this.utils.aliyun_format(res.collect_list, 'pic');
        res.start_time = this.utils.date_format(res.start_time, 'yyyy.MM.dd');
        res.limit_desc = res.desc.substr(0, 90);
        this.detail = res;
        console.log(res);
      });
    },
    methods: {
      // 判断来源页
      judge_from_type(type) {
        //来源页面：1为首页；2为陈列展览页;3为常设展览
        switch (type) {
          case 2:
            this.from_route = '/exhibition';
            this.from_title = '陈列展览';
            break;
          case 3:
            this.from_route = '/exhibit_standing';
            this.from_title = '常设展览';
            break;
          case 4:
            this.from_route = '/exhibit_temp';
            this.from_title = '临时展览';
            break;
          case 99:
            this.from_route = '/search';
            this.from_title = '搜索';
            break;
          default:
            this.from_route = 'null';
            break;
        }
      },
      // 点击查看全部简介
      look_all() {
        this.show_mask = true;
      },

      // 点击查看大图
      open(url) {
        this.look_img_url = url;
        this.img_mask = true;
        this.utils.stop()
      },
      // 点击关闭大图
      hiddin_img() {
        this.img_mask = false;
        this.utils.move();
      },

      // 点击查看文物详情
      to_collect_detail(id) {
        this.$router.push({
          name: 'detail_collect',
          query: { id: id, from_type: 2, query: JSON.stringify(this.$route.query) }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .exhibit {
    .title {
      h3 {
        background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
        background-size: 13px 28px;
      }
    }

    /*展览简介*/
    .brief {
      display: flex;
      align-items: center;
      height: 368px;
      margin-bottom: 89px;

      .img {
        height: 100%;
        width: 552px;
        flex-shrink: 0;
        margin-right: 24px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #e8e2c9;
      }

      .brief-cont {
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        h3 {
          font-weight: normal;
          padding-bottom: 30px;
          box-sizing: border-box;
          color: #333333;
          font-size: 24px;
          border-bottom: 1px solid #e8e2ca;
        }

        .attr {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;

          .attr-item {
            padding-left: 25px;
            box-sizing: border-box;
            border-left: 1px dashed #cf903a;
            font-size: 16px;
            color: #666666;
            line-height: 30px;

            span {
              color: #c88e45;
            }

            &:first-child {
              border: none;
              padding-left: 0;
            }
          }
        }

        .desc {
          margin-top: 30px;
          text-align: justify;
          font-size: 16px;
          color: #666666;

          .look-all {
            display: inline-flex;
            align-items: center;
            color: #c88e45;
            cursor: pointer;

            img {
              margin-left: 5px;
              width: 10px;
              height: 14px;
            }
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

    /*精彩展览*/
    .wonderful {
      display: flex;
      flex-wrap: wrap;
      height: 383px;
      overflow: hidden;

      .wonderful-item {
        width: calc(33.33333% - 16px);
        margin-right: 24px;
        margin-top: 24px;
        background-color: #ffffff;
        border: solid 1px #cccccc;
        cursor: pointer;
        opacity: 0;

        &:nth-child(3n) {
          margin-right: 0;
        }

        &:nth-child(-n+3) {
          margin-top: 0;
          opacity: 1;
        }

        .img-box {
          width: 100%;
          height: 240px;
          overflow: hidden;

          .img {
            width: 100%;
            height: 100%;
            transition: 0.5s;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }

          &:hover {
            .img {
              transform: scale(1.1);
            }
          }
        }

        .item-cont {
          padding: 20px;
          box-sizing: border-box;
          text-align: justify;

          h3 {
            font-size: 20px;
            color: #333333;
            font-weight: normal;
            margin-bottom: 20px;
          }

          p {
            font-size: 14px;
            color: #666666;
            padding-right: 15px;
            background-image: url("../assets/icon-arrows-default.png");
            background-size: 10px 14px;
            background-repeat: no-repeat;
            background-position: right center;
          }
        }

        &:hover {
          background-color: #cf903a;

          .item-cont {
            h3 {
              color: #ffffff;
            }

            p {
              color: #ffffff;
              background-image: url("../assets/icon-arrows-selected.png");
            }
          }
        }
      }

      &.show-more {
        height: auto;

        .wonderful-item {
          opacity: 1;
        }
      }
    }

    .btn-more {
      width: 200px;
      height: 60px;
      margin: 40px auto 89px;
      background-image: url("../assets/bg-btn-detail.png");
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-size: 16px;
      color: #666666;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
      user-select: none;
    }

    /*展厅内景*/
    .swiper {
      height: 200px;

      .swiper-item {
        width: 300px;

        .img {
          cursor: pointer;
          width: 100%;
          height: 100%;
          background-color: #e8e2c9;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }

    .mask-cont {
      h2 {
        margin-top: 60px;
        margin-bottom: 40px;
        font-weight: normal;
        font-size: 20px;
        color: #333333;
      }

      p {
        text-align: justify;
        font-size: 16px;
        line-height: 26px;
        color: #666666;
        white-space: pre-line;
      }
    }
  }
</style>
