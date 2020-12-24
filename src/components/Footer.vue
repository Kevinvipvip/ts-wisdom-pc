<template>
  <div class="footer">
    <h3>网站访问量</h3>
    <p>{{footer.visits}}</p>
    <ul>
      <li>
        <router-link to="/web_map">网站地图</router-link>
      </li>
      <li>
        <router-link to="/friend_link">友情链接</router-link>
      </li>
      <li>
        <router-link :to="{path:'/statement',query:{id:1}}">隐私声明</router-link>
      </li>
      <li>
        <router-link :to="{path:'/statement',query:{id:2}}">版权声明</router-link>
      </li>
      <li>
        <router-link to="/about">关于我们</router-link>
      </li>
    </ul>
    <div class="copyright">
      <div class="item"><span>技术支持：</span><a href="https://www.wcip.net" target="_blank">山海文化</a></div>
      <div class="item">版权所有：唐山博物馆</div>
      <div class="item"><span>ICP备案：</span><a href="https://beian.miit.gov.cn" target="_blank">冀ICP备20003697号-1</a>
      </div>
    </div>
    <div class="img"><img src="../assets/img-footer.png"/></div>

    <div class="fixed-box">
      <div class="fixed-item piying">
        <div class="icon"><img src="../assets/fixed/piying.png"/></div>
      </div>
      <div class="fixed-item" @click="to_buy_ticket">
        <div class="icon"><img src="../assets/fixed/icon-order.png"/></div>
        <div class="line"><i></i><i></i></div>
      </div>
      <div class="fixed-item">
        <div class="icon"><img src="../assets/fixed/icon-wechat.png"/></div>
        <div class="line"><i></i><i></i></div>
        <div class="code"><img src="../assets/fixed/img-wechat.jpg"/></div>
      </div>
      <div class="fixed-item">
        <div class="icon"><img src="../assets/fixed/icon-tiktok.png"/></div>
        <div class="line one"><i></i></div>
        <div class="code"><img src="../assets/fixed/img-tiktok.png"/></div>
      </div>
      <!--<div class="fixed-item ">-->
        <!--<div class="icon"><img src="../assets/fixed/icon-share.png"/></div>-->
        <!--<div class="line one"><i></i></div>-->
        <!--&lt;!&ndash;<div class="share-box">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="share-icon"><img src="../assets/wechat.png"/></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="share-icon"><img src="../assets/qq.png"/></div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
      <div class="fixed-item" @click="return_top">
        <div class="icon"><img src="../assets/fixed/icon-top.png"/></div>
      </div>
      <!--<div class="qr-code" ref="qrCode"></div>-->
      <!--<vue-qr :text="wap_url" :margin="5" :logoSrc="logo" :logoScale="0.3" :size="200"></vue-qr>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        footer: { visits: 0, wap_url: 'https://www.wcip.net', logo: require('../assets/logo.png') }
      }
    },
    // watch: {
    //   $route(to) {
    //     console.log(to);
    //   }
    // },
    mounted() {
      this.utils.ajax(this, 'api/aboutUs').then(res => {
        let str = res.visit;
        str = str.toString();
        if (str.length < 8)
          str = (Array(8).join("0") + str).slice(-8);
        this.footer.visits = str;
      });
      // this.creatQrCode('https://www.wcip.net');
    },
    methods: {
      // 点击跳转门票预约
      to_buy_ticket() {
        this.$router.push({ name: 'service' });
      },

      // 返回顶部
      return_top() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .footer {
    height: 300px;
    background-color: #333333;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    a {
      color: #cccccc;

      &:hover {
        color: #cf903a;
      }
    }

    h3 {
      font-weight: normal;
      color: #f5f5f5;
      font-size: 14px;
    }

    p {
      margin-top: 12px;
      min-width: 272px;
      height: 44px;
      background-color: #4d4d4d;
      font-size: 26px;
      letter-spacing: 16px;
      text-indent: 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ul {
      display: flex;
      align-items: center;
      margin-top: 26px;

      li {
        color: #cccccc;
        margin: 0 10px;
      }
    }

    .copyright {
      display: flex;
      align-items: center;

      .item {
        color: #cccccc;
        font-size: 14px;
        margin: 18px 6px 0;


      }
    }

    .img {
      width: 26px;
      height: 32px;
      margin-top: 23px;
    }

    .fixed-box {
      position: fixed;
      right: 30px;
      z-index: 9999999;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-flow: column;
      align-items: center;

      .qr-code {
        width: 100px;
        height: 100px;
        display: none;
      }

      .fixed-item {
        cursor: pointer;
        width: 42px;
        height: 42px;
        margin-bottom: 5px;
        position: relative;

        i {
          display: block;
          width: 1px;
          height: 14px;
          background-image: url("../assets/fixed/line.png");
          background-size: 1px 14px;
          background-position: center;
          background-repeat: no-repeat;
        }

        .icon {
          width: 100%;
          height: 100%;

          img {
            height: 100%;
          }
        }

        .line {
          position: absolute;
          display: flex;
          width: 18px;
          justify-content: space-between;
          bottom: -9px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 23;

          &.one {
            width: 2px;
            left: 52%;
          }
        }

        .code {
          position: absolute;
          right: 42px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 999999;
          width: 0;
          transition: 0.5s;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .share-box {
          position: absolute;
          right: 42px;
          top: 0;
          height: 100%;
          width: 0;
          transition: 0.5s;
          background-color: #ffffff;
          display: flex;
          justify-content: space-around;
          align-items: center;

          .share-icon {
            width: 35px;
            height: 35px;

            img {
              height: 100%;
            }
          }
        }

        &.piying {
          width: 48px;
          height: 67px;
          margin-bottom: 0;
          cursor: auto;
        }

        &:hover {
          .code {
            width: 200px;
            padding-right: 10px;

            &:after {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              border-left: 10px solid #ffffff;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
            }
          }

          .share-box {
            width: 100px;
          }
        }
      }
    }
  }
</style>
