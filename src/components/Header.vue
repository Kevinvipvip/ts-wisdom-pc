<template>
  <div class="header" :class="click_on===1?'bg-white':''">
    <div class="img"><img :src="click_on===1?require('../assets/logo-header.png'):require('../assets/logo.png')" alt="">
    </div>
    <ul>
      <li v-for="(item,index) in nav" :key="'nav'+index" :class="click_on===item.id?'on':''"
          @click="click_nav(item.id,item.url)"
          @mouseenter="mouseenter(item.id,item.s_nav.length)"
          @mouseleave="mouseeleave(0,0)">
        <a :href="item.url" v-if="item.id === 7" target="_blank">{{item.name}}</a>
        <router-link :to="item.url" v-else>{{item.name}}</router-link>

        <div class="s-nav" v-if="item.s_nav" :class="show_s_nav===item.id?'show-nav':''" @click.stop>
          <div class="s-nav-item" v-for="(v,i) in item.s_nav" :key="'s-nav'+i">
            <p v-if="item.id === 7"><a :href="v.s_url" target="_blank">{{v.title}}</a></p>
            <router-link :to="{path:v.s_url,query:{id:v.id}}" tag="p" v-else-if="v.id">{{v.title}}</router-link>
            <router-link :to="v.s_url" tag="p" v-else>{{v.title}}</router-link>
          </div>
        </div>

      </li>
    </ul>
    <div class="search" @click.stop="click_show_search" :style="show_search?'background-color: unset;':''">
      <div class="icon-left"><img src="../assets/icon-tip-left.png"/></div>
      <div class="icon"><img src="../assets/icon-search.png"/></div>
    </div>
    <div class="s-nav-bg" :class="have_s_nav!==0?'have-nav':''"></div>

    <div class="search-ipt" @click.stop :class="show_search?'show-search':''">
      <div class="select-box" @click.stop="show_select=true">
        <div class="select">{{select_text}}</div>
        <div class="select-item-box" @click.stop :class="show_select?'show-select':''">
          <div class="select-item" @click="click_select('藏品')">藏品</div>
          <div class="select-item" @click="click_select('展览')">展览</div>
          <div class="select-item" @click="click_select('活动')">活动</div>
          <div class="select-item" @click="click_select('新闻')">新闻</div>
        </div>
      </div>
      <div class="ipt-box">
        <input type="text" placeholder="关键字" v-model="keyword" ref="input">
      </div>
      <div class="btn-search" @click="search"><img src="../assets/icon-search.png"/></div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        click_on: 1,
        have_s_nav: 0,//是否有二级导航：0为没有；非0为有
        show_s_nav: 0,//是否显示二级导航
        nav: [
          {
            id: 1, name: '首页', url: '/', s_nav: []
          }, {
            id: 2, name: '唐博概况', url: '/about', s_nav: []
          }, {
            id: 3, name: '最新动态', url: '/news', s_nav: []
          }, {
            id: 4,
            name: '陈列展览',
            url: '/exhibition',
            s_nav: [{
              title: '常设展览', s_url: '/exhibit_standing'
            }, {
              title: '临时展览', s_url: '/exhibit_temp'
            }, {
              title: '展览计划', s_url: '/exhibit_plan'
            },]
          }, {
            id: 5, name: '典藏文物', url: '/collection', s_nav: []
          }, {
            id: 6, name: '学术研究', url: '/academic',
            s_nav: [{
              title: '学术资讯', s_url: '/study_article'
            }, {
              title: '出版书籍', s_url: '/books'
            }, {
              title: '学术委员会', s_url: '/committee'
            },]
          }, {
            id: 7, name: '特色资源', url: 'http://tsk.tsggwl.com/HYINDEX/tsst/TSZK/',
            s_nav: [{
              title: '唐山文物', s_url: 'http://tsk.tsggwl.com/HYINDEX/tsst/TSWenWu/WenwuIndex.aspx'
            }, {
              title: '唐山工业', s_url: 'http://tsk.tsggwl.com/HYINDEX/tsst/TSGongYe/TSIndustry.aspx'
            }, {
              title: '唐山方言', s_url: 'http://tsk.tsggwl.com/HYINDEX/tsst/TSFangYan/FangYanIndex.aspx'
            },]
          }, {
            id: 8, name: '教育活动', url: '/edu_active',
            s_nav: []
          }, {
            id: 9, name: '观众服务', url: '/service',
            s_nav: [{
              title: '参观预约', s_url: '/service', id: 1
            }, {
              title: '活动预约', s_url: '/active'
            }, {
              title: '讲解预约', s_url: '/explain'
            }, {
              title: '交通指南', s_url: '/service', id: 2
            }, {
              title: '参观须知', s_url: '/service', id: 1
            }]
          }, {
            id: 10, name: '文创产品', url: '/products',
            s_nav: [{
              title: '文创赏析', s_url: 'products'
            }, {
              title: '文创销售', s_url: '/product_sale'
            }]
          }],

        show_search: false,//控制搜索框显隐
        show_select: false,//控制选择框显隐
        select_text: '藏品',//选择的搜索项
        keyword: '',//关键字
      }
    },
    watch: {
      $route(to) {
        switch (to.name) {
          case 'home'://首页
            this.click_on = 1;
            break;
          case 'about'://唐博概况
            this.click_on = 2;
            break;
          case 'news'://最新动态
          case 'detail_news'://动态详情
            this.click_on = 3;
            break;
          case 'exhibition'://陈列展览
          case 'exhibit_standing'://常设展览
          case 'exhibit_temp'://临时展览
          case 'exhibit_plan'://展览计划
          case 'detail_exhibit'://展览详情
          case 'detail_plan'://展览计划详情
            this.click_on = 4;
            break;
          case 'collection'://典藏文物
          case 'collect_list'://文物列表
          case 'detail_collect'://文物详情
            this.click_on = 5;
            break;
          case 'academic'://学术研究
          case 'committee'://学术委员会
          case 'study_article'://学术资讯
          case 'detail_study_article'://学术资讯详情
          case 'books'://出版书籍
            this.click_on = 6;
            break;
          case 'edu_active'://教育活动
          case 'edu_active_list'://教育活动列表
            this.click_on = 8;
            break;
          case 'service'://观众服务
          case 'active'://活动预约列表页
          case 'detail_active'://活动预约详情
          case 'explain'://讲解预约
            this.click_on = 9;
            break;
          case 'products'://文创赏析
          case 'product_sale'://文创销售
          case 'detail_product'://文创产品详情
            this.click_on = 10;
            break;
          default:
            this.click_on = 0;
            break;
        }
      }
    },
    mounted() {
      this.utils.ajax(this, 'edu/themeList').then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].s_url = '/edu_active_list';
        }
        this.nav[7].s_nav = res;
      }).then(() => {
        this.config.nav = this.nav;
      });
      window.addEventListener('click', () => {
        if (this.show_search) {
          this.show_search = false;
          this.show_select = false;
        }
      })
    },
    methods: {
      // 点击显示搜索框
      click_show_search() {
        this.show_search = true;
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      },

      // 点击选择搜索项
      click_select(title) {
        this.select_text = title;
        this.show_select = false;
      },
      // 点击搜索按钮搜索
      search() {
        let query = { select: this.select_text };
        if (this.keyword)
          query.keyword = this.keyword;
        this.$router.push({ name: 'search', query: query });
        this.show_search = false;
        this.keyword = '';
      },

      // 鼠标移入操作
      mouseenter(id, length) {
        this.show_s_nav = id;
        this.have_s_nav = length;
      },
      // 鼠标移出操作
      mouseeleave(id, length) {
        this.show_s_nav = id;
        this.have_s_nav = length;
      },

      // 点击一级导航是操作
      click_nav(nav, url) {
        if (nav !== 7) {
          this.click_on = nav;
          this.$router.push({ path: url });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    min-width: 1200px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    height: 80px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.bg-white {
      background-color: rgba(0, 0, 0, 0.65);

      .img {
        &:after {
          background-color: #ffffff;
        }
      }

      ul {
        li {
          a {
            color: #ffffff;
          }
        }
      }

      .search {
        background-color: unset;
        transition: 0.5s;

        &:hover {
          background-color: #cf903a;
        }
      }
    }

    .s-nav-bg {
      background-color: rgba(207, 144, 58, 0.8);
      height: 0;
      transition: 0.5s;
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      z-index: 99;

      &.have-nav {
        height: 64px;
      }
    }

    .img {
      width: 240px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 1px;
        height: 40px;
        transform: translateY(-50%);
        background-color: #cf903a;
      }

      img {
        width: 147px;
        height: 28px;
      }
    }

    ul {
      flex-grow: 1;
      height: 100%;
      display: flex;
      justify-content: center;

      li {
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        margin-right: 40px;
        /*margin-left: 40px;*/

        &:last-child {
          margin-right: 0;
        }

        /*overflow: auto;*/

        a {
          font-size: 16px;
          user-select: none;
          color: #666666;
        }

        .s-nav {
          position: absolute;
          top: 80px;
          z-index: 999;
          width: max-content;
          height: 0;
          transition: 0.5s;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 50%;
          transform: translateX(-50%);

          .s-nav-item {
            flex-shrink: 0;
            padding: 0 15px;
            border-right: 1px solid rgba(255, 255, 255, 0.4);

            &:last-child {
              padding-right: 0;
              border: none;
            }

            p, a {
              color: #ffffff;
              font-size: 14px;
            }
          }

          &.show-nav {
            height: 64px;
          }
        }

        &:hover, &.on {
          border-bottom: 2px solid #cf903a;
          box-sizing: border-box;

          a {
            color: #cf903a;
          }
        }
      }
    }

    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 100%;
      border-left: 1px solid #ffffff;
      background-color: #cf903a;
      transition: 0.5s;
      cursor: pointer;

      .icon-left {
        width: 5px;
        height: 9px;
        margin-right: 3px;
      }

      .icon {
        width: 18px;
        height: 17px;
      }
    }

    .search-ipt {
      position: absolute;
      background-color: #ffffff;
      height: 60px;
      right: 28px;
      z-index: 9999999999;
      overflow: hidden;
      width: 0;
      transition: 1s;
      display: flex;
      justify-content: space-between;

      .select-box {
        width: 104px;
        flex-shrink: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 9999999999;
        cursor: pointer;

        .select {
          width: 70px;
          padding-right: 20px;
          color: #cf903a;
          font-size: 16px;
          background-image: url("../assets/icon-down.png");
          background-position: right;
          background-repeat: no-repeat;
          background-size: 14px 10px;
        }

        .select-item-box {
          background-color: rgba(207, 144, 58, 0.8);
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          z-index: 9999999999;
          overflow: hidden;
          height: 0;
          transition: 0.5s;
          display: flex;
          flex-flow: column;

          .select-item {
            height: 25%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;

            &:hover {
              background-color: #a8510d;
            }
          }

          &.show-select {
            height: 180px;
          }
        }
      }

      .ipt-box {
        flex-grow: 1;
        background-color: #f5f5f5;
        height: 100%;

        input {
          padding: 0 10px;
          outline: none;
          background: unset;
          border: none;
          display: block;
          height: 100%;
          width: 100%;
        }
      }

      .btn-search {
        cursor: pointer;
        flex-shrink: 0;
        background-color: #cf903a;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 40%;
          height: 40%;
        }
      }

      &.show-search {
        width: 400px;
        border: solid 1px #cf903a;
        overflow: unset;
      }
    }
  }
</style>
