<template>
  <div class="plan-detail page">
    <background type="border">
      <crumb :to="from_type === 2?'/exhibit_plan':'/exhibition'" :to_title="from_type===2?'展览计划':'陈列展览'"/>
      <div class="detail-title">{{detail.title}}</div>
      <div class="mini-title">
        <div class="mini-item">
          <div class="icon"><img src="../assets/icon-time.png"/></div>
          <p>发布时间：{{detail.create_time}}</p>
          <div class="icon eye"><img src="../assets/icon-eye.png"/></div>
          <p>阅读量：{{detail.views}}</p>
        </div>
        <div class="mini-item share">
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
      <div class="rich-text" v-html="detail.content"></div>

      <div class="page-box" v-if="plan_list.length>0">

        <p v-if="prev_i === plan_list.length-1" @click="prev_pages(plan_list[prev_i].id)">上一篇：没有上一篇了</p>
        <p class="one-line-ellipsis" v-else @click="prev_pages(plan_list[prev_i].id)">
          上一篇：{{plan_list[prev_i].title}}</p>

        <p v-if="next_i===0" @click="next_pages(plan_list[next_i].id)">下一篇：没有下一篇了</p>
        <p class="one-line-ellipsis" v-else @click="next_pages(plan_list[next_i].id)">
          下一篇：{{plan_list[next_i].title}}</p>
      </div>
    </background>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        from_type: 0,//来源类型：1为首页；2为最新动态页
        id: 0,
        prev_i: 0,
        next_i: 2,

        plan_list: [],
        detail: {},

        share_title: '',
        show_share: false,
      };
    },
    // 跳转本页时参数变化后重新调取新闻公告详情数据
    beforeRouteUpdate(to, from, next) {
      this.id = parseInt(to.query.id);
      this.from_type = parseInt(to.query.from_type);
      this.getDisplayArticleDetail();
      next()
    },
    mounted() {
      this.id = parseInt(this.$route.query.id);
      this.from_type = parseInt(this.$route.query.from_type);
      this.getDisplayArticleDetail();
      this.utils.initCode(this);
      window.addEventListener('click', () => {
        this.show_share = false;
      })
    },
    destroyed() {
      window.removeEventListener('click', () => {
      },false);
    },
    methods: {
      // 上一篇新闻
      prev_pages(id) {
        this.id = id;
        if (this.prev_i !== this.plan_list.length - 1) {
          this.$router.replace({ name: 'detail_plan', query: { id: id, } });
        } else {
          this.$Message.info('没有上一篇了')
        }
      },
      // 下一篇新闻
      next_pages(id) {
        this.id = id;
        if (this.next_i !== 0) {
          this.$router.replace({ name: 'detail_plan', query: { id: id, } });
        } else {
          this.$Message.info('没有下一篇了')
        }
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
          this.qrcode.makeCode(this.config.url + 'wap/#/detail_plan?id=' + this.detail.id);
        }
      },

      // 获取新闻公告详情
      getDisplayArticleDetail() {
        let post = { article_id: this.id };
        this.utils.ajax(this, 'api/displayArticleDetail', post).then(detail => {
          detail.create_time = detail.create_time.split(' ')[0];
          this.detail = detail;
          this.getDisplayArticleList();
        });
      },
      // 获取新闻公告数据内容
      getDisplayArticleList() {
        this.utils.ajax(this, 'api/displayArticleList', { page: 1, perpage: 1000 }).then(res => {
          this.plan_list = res.list;
        }).then(() => {
          let obj = this.plan_list;
          for (let i = 0; i < obj.length; i++) {
            if (obj[i].id === this.detail.id) {
              if ((i + 1) === obj.length) {
                this.prev_i = i - 1;
                this.next_i = 0;
              } else if (i === 0) {
                this.prev_i = obj.length - 1;
                this.next_i = i + 1;
              } else {
                this.prev_i = i - 1;
                this.next_i = i + 1;
              }
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .plan-detail {
    .detail-title {
      font-size: 24px;
      color: #333333;
      margin: 39px 0 25px;
    }

    .mini-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .mini-item {
        display: flex;
        align-items: center;

        .icon {
          width: 14px;
          height: 14px;
          margin-right: 8px;

          &.eye {
            width: 18px;
            height: 13px;
          }
        }

        p {
          line-height: 14px;
          font-size: 14px;
          color: #999999;
          margin-right: 20px;
        }

        &.share {
          font-size: 14px;
          color: #666666;
          position: relative;

          .icon {
            cursor: pointer;
            width: 28px;
            height: 28px;
            margin-left: 17px;
          }
        }
      }
    }

    .rich-text {
      margin-top: 39px;
      border-top: 1px solid #e8e2ca;
      padding-top: 39px;

      /deep/ img {
        max-width: 100%;
      }
    }

    .page-box {
      margin-top: 67px;
      margin-bottom: 75px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        cursor: pointer;
        font-size: 18px;
        color: #999999;
        max-width: 25%;

        &:hover {
          color: #d7a35d;
        }
      }
    }
  }
</style>
