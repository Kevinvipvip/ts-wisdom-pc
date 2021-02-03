<template>
  <!--活动预约详情页-->
  <div class="detail-active page">
    <background type="border">
      <crumb v-if="from_type===1"/>
      <crumb v-else :to="from_type===2?'/service':'/active'" :to_title="from_type===2?'观众服务':'活动预约'"/>

      <div class="active-top">
        <div class="img" :style="'background-image: url('+detail.pic+')'"></div>
        <div class="cont">
          <h3>{{detail.title}}</h3>
          <div class="p-box">
            <p><span>面向人群：</span>{{detail.object}}</p>
            <p><span>活动名额：</span>{{detail.num}}人</p>
            <p><span>活动时间：</span>{{detail.start_time}} ~ {{detail.end_time}}</p>
            <p><span>活动地点：</span>{{detail.address}}</p>
            <p><span>参与费用：</span><span class="color">￥{{detail.price}}</span></p>
          </div>
          <div class="now_subscribe">
            <div class="btn">立即预约
              <div class="code">
                <div class="qrCode" ref="subscribe_qrcode"></div>
                <p>微信扫描二维码预约</p></div>
            </div>
            <div class="share">
              分享至：
              <div class="icon" @click.stop="share(1,'微信')"><img src="../assets/wechat.png"/></div>
              <div class="icon" @click.stop="share(3,'QQ')"><img src="../assets/qq.png"/></div>
              <div class="icon" @click="share(2)"><img src="../assets/sina.png"/></div>
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
      <div class="rich-text" v-html="detail.content"></div>

    </background>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  export default {
    data() {
      return {
        from_type: 0,//来源type：1为首页轮播图，2为观众服务；3为活动预约

        id: 0,
        code: this.config.aliyun + 'ts-static/pc/code-active.jpg',//二维码在阿里云的图片链接

        detail: {},

        share_title: '',
        show_share: false,
      };
    },
    mounted() {
      this.id = parseInt(this.$route.query.id);
      this.from_type = parseInt(this.$route.query.from_type);
      this.getActivityDetail();
      this.utils.initCode(this);
      this.initSubscribeCode();
      this.subscribe_qrcode.clear();
      this.subscribe_qrcode.makeCode(this.config.url + 'wap/#/detail_activity?id=' + this.id);
      window.addEventListener('click', () => {
        this.show_share = false;
      });
    },
    destroyed() {
      window.removeEventListener('click', () => {
      }, false);
    },
    // beforeRouteEnter(to, from, next) {
    //   console.log(to);
    //   console.log(from, 'from');
    //   next(vm => {
    //     vm.from_router = from.path;
    //     vm.from_title = from.meta.title;
    //   });
    // },
    methods: {
      // 预约二维码
      initSubscribeCode() {
        this.subscribe_qrcode = new QRCode(this.$refs.subscribe_qrcode, {
          text: '',
          width: 163,
          height: 163,
          colorDark: '#333333', // 二维码颜色
          colorLight: '#ffffff', // 二维码背景色
          correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
        });
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
          this.qrcode.makeCode(this.config.url + 'wap/#/detail_activity?id=' + this.detail.id);
        }
      },

      getActivityDetail() {
        let post = { activity_id: this.id };
        this.utils.ajax(this, 'activity/activityDetail', post).then(res => {
          this.utils.aliyun_format(res);
          res.start_time = this.utils.date_format(res.start_time, 'yyyy/MM/dd hh:mm');
          res.end_time = this.utils.date_format(res.end_time, 'yyyy/MM/dd hh:mm');
          this.detail = res;
          console.log(res);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .detail-active {
    .active-top {
      display: flex;
      margin-top: 40px;

      .img {
        width: 552px;
        height: 368px;
        flex-shrink: 0;
        margin-right: 25px;
        background-color: rgb(232, 226, 201);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .cont {
        flex-grow: 1;
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        h3 {
          font-size: 24px;
          color: #333333;
          font-weight: normal;
        }

        p {
          color: #333333;
          font-size: 16px;
          line-height: 30px;

          span {
            color: #666666;

            &.color {
              color: #c88e45;
            }
          }
        }

        .now_subscribe {
          display: flex;
          align-items: center;
          justify-content: space-between;

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
              z-index: 2;
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

              .qrCode {
                width: 163px;
                height: 163px;
                flex-shrink: 0;
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

          .share {
            display: flex;
            align-items: center;
            position: relative;
            font-size: 14px;
            color: #666666;

            .icon {
              width: 28px;
              height: 28px;
              margin-left: 17px;
              cursor: pointer;
            }
          }
        }
      }
    }

    .rich-text {
      margin-top: 60px;
      margin-bottom: 100px;
      font-size: 16px;
      color: #666666;
      line-height: 24px;

      /deep/ img {
        max-width: 100%;
      }
    }
  }
</style>
