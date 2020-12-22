<template>
  <div class="news page">
    <background :bg_num="2">
      <crumb/>
      <div class="title"><h3>最新动态</h3></div>
      <div class="tab">
        <div class="tab-item" :class="tab===0?'active':''" @click="tab_click(0)">全部</div>
        <div class="tab-item" :class="tab===1?'active':''" @click="tab_click(1)">新闻</div>
        <div class="tab-item" :class="tab===2?'active':''" @click="tab_click(2)">公告</div>
        <div class="tab-item" :class="tab===3?'active':''" @click="tab_click(3)">展览</div>
        <div class="tab-item" :class="tab===4?'active':''" @click="tab_click(4)">活动</div>
      </div>
      <div class="news-list">
        <ul>
          <li v-for="(item,index) in news_list" :key="'news'+index" @click="look_detail(item.id)">
            <div class="bg-new-box"></div>
            <div class="li-item">
              <div class="img" :style="'background-image: url('+item.pic+')'">
                <div class="type" :class="'bg'+item.type">{{item.type_name}}</div>
              </div>
              <div class="new-cont">
                <h3 class="one-line-ellipsis">{{item.title}}</h3>
                <p class="date">{{item.create_time}}</p>
                <p class="two-line-ellipsis">{{item.desc}}</p>
                <div class="btn">查看详情</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="my-page" v-if="count>perpage">
          <Page :total="count" :page-size="perpage" @on-change="click_page"/>
        </div>
      </div>
    </background>

  </div>
</template>

<script>
  export default {
    name: "News",
    data() {
      return {
        tab: 0,

        page: 1,
        perpage: 5,
        count: 10,

        news_list: []
      }
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      // 切换动态分类
      tab_click(num) {
        this.tab = parseInt(num);
        this.page = 1;
        this.getArticleList();
      },
      //点击分页
      click_page(page) {
        this.page = page;
        this.getArticleList();
      },

      // 点击跳转详情页
      look_detail(id) {
        this.$router.push({ path: '/detail_news', query: { id: id, from_type: 2 } });
      },

      // 获取新闻公告数据内容
      getArticleList() {
        let post = { type: this.tab, page: this.page, perpage: this.perpage };
        this.utils.ajax(this, 'api/articleList', post).then(res => {
          this.utils.aliyun_format(res.list);
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].create_time = this.utils.date_format(new Date(res.list[i].create_time), 'yyyy/MM/dd');
          }
          this.count = res.count;
          this.news_list = res.list;
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .news {
    .tab {
      display: flex;
      align-items: center;
      justify-content: center;

      .tab-item {
        padding: 0 37px;
        margin: 0 20px;
        cursor: pointer;
        background-image: url("../assets/icon-tab-left-default.png"), url("../assets/icon-tab-right-default.png");
        background-repeat: no-repeat;
        background-position: left, right;
        font-size: 16px;
        color: #666666;

        &:hover, &.active {
          color: #c88e45;
          background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
        }
      }
    }
  }
</style>
