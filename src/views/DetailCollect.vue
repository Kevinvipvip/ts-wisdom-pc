<template>
  <!--文物详情页-->
  <div class="detail-collect page">
    <background type="border">
      <crumb :to="from_type===1?'/collection':{path:'/detail_exhibit',query:from_query}"
             :to_title="from_type===1?'典藏文物':'展览详情'"/>

      <div class="collect-cont">
        <div class="img-swiper">
          <swiper class='swiper' :options="collect_swiper" v-if="detail.pics.length>0">

            <swiper-slide v-for="(item, index) in detail.pics" :key="'collect-detail'+index" class="swiper-item">
              <div class="img" :style="'background-image: url('+item+')'">
                <a @click="open(item)"></a>
              </div>
            </swiper-slide>
          </swiper>
          <div class="btn btn-next" v-if="detail.pics.length>1"></div>
          <div class="btn btn-prev" v-if="detail.pics.length>1"></div>
          <a class="download" :href="detail.pics[active_index]" download></a>
        </div>

        <div class="collect-cont-right">
          <h3>{{detail.title}}</h3>
          <div class="attr">
            <p><span>年代：</span>{{detail.dynasty}}</p>
            <p><span>类别：</span>{{detail.cate_name}}</p>
            <p><span>尺寸：</span>{{detail.size}}</p>
            <p><span>来源：</span>{{detail.origin}}</p>
          </div>
          <div class="desc-box">
            <span>简介：</span>
            <div class="desc">{{detail.limit_desc}}...
              <div class="look-all" @click="look_all">查看全部<img src="../assets/icon-arrows-default.png"/></div>
            </div>
          </div>
          <div class="audio-share">
            <div class="audio-box">
              <audio :src="detail.audio_url" id="my_audio" controls ref="audio"></audio>
              <div class="audio" @click="play">
                <div class="icon"><img :src="is_play?icon_stop:icon_play"/></div>
                <p>语音介绍</p>
              </div>
            </div>
            <div class="share">
              <p>分享至：</p>
              <div class="share-icon" @click.stop="share(1,'微信')"><img src="../assets/wechat.png"/></div>
              <div class="share-icon" @click.stop="share(3,'QQ')"><img src="../assets/qq.png"/></div>
              <div class="share-icon" @click="share(2)"><img src="../assets/sina.png"/></div>
              <div class="create-share-code" @click.stop :class="show_share?'show-share':''">
                <span>分享至{{share_title}}</span>
                <div class="code" ref="qrCode"></div>
                <span>打开{{share_title}}，点击右上角加号</span>
                <span>使用扫一扫进入手机版网页即可分享</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="title" v-if="detail.display"><h3>相关展览</h3></div>
      <div class="about-exhibit" v-if="detail.display">
        <div class="cont">
          <h3>{{detail.display.title}}</h3>
          <p>展览类型：{{detail.display.tag}}</p>
          <p>展览起止时间：{{detail.display.start_time}} ~ {{detail.display.end_time}}</p>
          <p>展览地点：{{detail.display.address}}</p>
          <div class="btn-exhibit" @click="to_exhibit_detail(detail.display.id)">查看详情</div>
        </div>
        <div class="img" :style="'background-image: url('+detail.display.cover+')'"></div>
      </div>
      <div class="title" v-if="detail.relation_list.length"><h3>相关文物</h3></div>
      <div class="about-collect">
        <div class="item" v-for="(item,index) in detail.relation_list" :key="'about-collect'+index"
             @click="to_this_detail(item.id)">
          <div class="img" :style="'background-image: url('+item.pic+')'"></div>
          <p class="one-line-ellipsis">{{item.title}}</p>
        </div>
      </div>
    </background>
    <!--点击查看大图显示遮罩-->
    <div class="img-mask" v-if="img_mask" @click="hiddin_img">
      <div class="img-mask-cont">
        <img :src="look_img_url"/>
      </div>
    </div>
    <!--查看更多简介遮罩显示-->
    <div class="mask" v-if="show_mask" @click="close_mask">
      <div class="mask-cont" @click.stop>
        <div class="close" @click.stop="close_mask"><img src="../assets/icon-close.png"/></div>
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
  import icon_play from '../assets/icon-play.png'
  import icon_stop from '../assets/icon-stop.png'

  var _self;
  export default {
    components: {
      'swiper': Swiper,
      'swiper-slide': SwiperSlide
    },
    data() {
      return {
        id: 0,
        from_type: 0,//来源页面：1为典藏文物页；2为展览详情页
        from_query: {},

        detail: { pics: [], relation_list: [] },//文物详情
        active_index: 0,//当前轮播图的索引值
        collect_swiper: {
          navigation: {
            nextEl: ".btn-next", //前进按钮的css选择器或HTML元素。
            prevEl: ".btn-prev", //后退按钮的css选择器或HTML元素。
          },
          on: {
            slideChange() {
              _self.active_index = this.realIndex;
            }
          }
        },

        is_play: false,
        timeout: 0,//播放按钮定时器
        icon_play, icon_stop,

        show_mask: false,
        img_mask: false,
        look_img_url: '',

        share_title: '',
        show_share: false,
      };
    },
    // 跳转本页时参数变化后重新调取新闻公告详情数据
    beforeRouteUpdate(to, from, next) {
      this.id = parseInt(to.query.id);
      this.from_type = parseInt(to.query.from_type);
      this.getCollectDetail();
      next()
    },
    mounted() {
      _self = this;
      this.id = parseInt(this.$route.query.id);
      this.from_type = parseInt(this.$route.query.from_type);
      if (this.$route.query.query) {
        this.from_query = JSON.parse(this.$route.query.query);
      }
      this.getCollectDetail();
      this.utils.initCode(this);
      window.addEventListener('click', () => {
        this.show_share = false;
      });
    },
    destroyed() {
      window.clearTimeout(this.timeout);
      this.utils.move();
      window.removeEventListener('click', () => {
      }, false);
    },
    methods: {
      // 点击查看全部简介
      look_all() {
        this.show_mask = true;
        this.utils.stop();
      },
      // 点击关闭全部简介
      close_mask() {
        this.show_mask = false;
        this.utils.move();
      },

      // 分享
      share(type, title) {
        if (type === 2) {
          var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + this.detail.title + '&url=' + window.location.href + '&content=utf-8&sourceUrl=' + this.detail.desc + '&pic=' + this.detail.pic;
          window.open(sharesinastring);
        } else {
          this.share_title = title;
          this.show_share = true;
          this.qrcode.clear();
          this.qrcode.makeCode(this.config.url + 'wap/#/collect-detail?id=' + this.id);
        }
      },

      // 点击查看藏品详情
      to_this_detail(id) {
        this.$router.replace({ name: '', query: { id: id, from_type: this.from_type } });
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

      // 点击跳转展览详情
      to_exhibit_detail(id) {
        this.$router.push({ name: 'detail_exhibit', query: { id: id, from_type: 2 } });
      },
      // 播放或者暂停语音介绍
      play() {
        if (this.detail.audio_url) {
          this.$nextTick(() => {
            let audio = this.$refs.audio;
            let time = audio.duration - audio.currentTime;
            if (audio.paused) {
              audio.play();
              this.is_play = true;
              this.timeout = setTimeout(() => {
                this.is_play = false
              }, Math.floor(time * 1000));
            } else {
              audio.pause();
              this.is_play = false;
              window.clearTimeout(this.timeout);
            }
          });
        } else {
          this.$Message.info('暂无语音介绍');
        }
      },

      // 获取文物详情
      getCollectDetail() {
        this.utils.ajax(this, 'collect/collectDetail', { collect_id: this.id }).then(res => {
          this.utils.aliyun_format(res.pics);
          this.utils.aliyun_format(res, 'audio_url');
          this.utils.aliyun_format(res.display, 'cover');
          if (res.display) {
            res.display.start_time = this.utils.date_format(res.display.start_time, 'yyyy/MM/dd');
            res.display.end_time = this.utils.date_format(res.display.end_time, 'yyyy/MM/dd');
          }
          if (res.relation_list.length) {
            this.utils.aliyun_format(res.relation_list, 'pic');
          }
          res.limit_desc = res.desc.substr(0, 156);
          this.detail = res;
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .detail-collect {
    .title {
      h3 {
        background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
        background-size: 13px 28px;
      }
    }

    .collect-cont {
      display: flex;
      margin-top: 40px;
      margin-bottom: 89px;

      .img-swiper {
        width: 552px;
        height: 552px;
        background-color: #333333;
        border: solid 1px #dcdcdc;
        flex-shrink: 0;
        position: relative;
        margin-right: 25px;

        .swiper {
          width: 100%;
          height: 100%;

          .swiper-item {
            .img {
              width: 100%;
              height: 100%;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;

              a {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }

        .btn {
          width: 44px;
          height: 60px;
          position: absolute;
          top: 50%;
          z-index: 9;
          transform: translateY(-50%);
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-color: rgba(215, 163, 93, 0.8);
          cursor: pointer;
          outline: none !important;

          &.btn-next {
            right: 0;
            background-image: url("../assets/icon-nextpage.png");
          }

          &.btn-prev {
            left: 0;
            background-image: url("../assets/icon-previouspage.png");
          }
        }

        .download {
          position: absolute;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          width: 50px;
          z-index: 9;
          height: 50px;
          background-image: url("../assets/icon-download.png");
          background-repeat: no-repeat;
          background-size: 27px 25px;
          background-position: center;
        }
      }

      .collect-cont-right {
        flex-grow: 1;
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        h3 {
          font-size: 24px;
          color: #333333;
          font-weight: normal;
          padding-bottom: 40px;
          border-bottom: 1px solid #e8e2ca;
        }

        .attr {
          font-size: 16px;
          line-height: 32px;

          p {
            color: #333333;

            span {
              color: #666666;
            }
          }
        }

        .desc-box {
          span {
            color: #666666;
          }

          .desc {
            margin-top: 16px;
            text-align: justify;
            font-size: 16px;
            color: #333333;
            white-space: pre-line;

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
        }

        .audio-share {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .audio-box {
            position: relative;

            audio {
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 1;
              opacity: 0;
            }

            .audio {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 140px;
              height: 60px;
              background-color: #cf903a;
              border-radius: 4px;
              cursor: pointer;
              position: relative;
              z-index: 3;


              .icon {
                width: 36px;
                height: 36px;
                margin-right: 12px;
              }

              p {
                user-select: none;
                font-size: 16px;
                color: #ffffff;
              }
            }
          }

          .share {
            display: flex;
            align-items: center;
            position: relative;

            p {
              font-size: 14px;
              color: #666666;
            }

            .share-icon {
              cursor: pointer;
              width: 28px;
              height: 28px;
              margin-left: 17px;
            }
          }
        }
      }
    }

    .about-exhibit {
      display: flex;
      justify-content: space-between;
      background: linear-gradient(to right, #ffffff 24px, #cf903a 0);

      .cont {
        flex-grow: 1;
        margin: 24px 0;
        background-color: #dba357;
        color: #ffffff;
        font-size: 16px;
        padding: 56px 24px 66px;
        box-sizing: border-box;

        h3 {
          font-weight: normal;
          font-size: 20px;
          margin-bottom: 40px;
        }

        p {
          margin-bottom: 23px;
        }

        .btn-exhibit {
          width: 168px;
          margin: 65px auto 0;
          height: 46px;
          background-image: url("../assets/bg-home-btn.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: 46px;
          cursor: pointer;
          user-select: none;
        }
      }

      .img {
        width: 633px;
        height: 422px;
        margin: 24px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }

    .about-collect {
      display: flex;

      .item {
        width: calc(25% - 18px);
        margin-right: 24px;
        cursor: pointer;

        &:nth-child(4n) {
          margin-right: 0;
        }

        p {
          margin: 19px 6px 0;
          font-size: 20px;
          color: #333333;
          text-align: center;
        }

        .img {
          height: 176px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
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
