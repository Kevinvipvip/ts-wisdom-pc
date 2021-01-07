<template>
  <!--教育活动列表-->
  <div class="edu-active-list page">
    <background type="border">
      <crumb to="/edu_active" to_title="教育活动" change :last_title="crumb_title"/>

      <div class="choice-box" @click="show_choice=!show_choice" @mouseleave="show_choice=false">{{crumb_title}}
        <i :class="show_choice?'show':''"></i>
        <ul :class="show_choice?'show':''" @click.stop>
          <li v-for="(item,index) in theme_list" :key="'theme'+index" :class="choice_on ===index?'choice':''"
              @click="choice_click(index)">
            {{item.title}}
          </li>
        </ul>
      </div>

      <div class="edu-list" v-if="edu_list.length">
        <div class="edu-item" v-for="(item,index) in edu_list" :key="'edu-list'+index">
          <h3>{{item.start_time}}</h3>
          <p>{{item.title}}</p>
          <div class="img-list">
            <div class="img" v-for="(v,i) in item.pics" :key="'edu-item'+i" @click="open(v)">
              <i :style="'background-image:url('+v+')'"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="nodata" v-else><span>暂无数据</span></div>

      <div class="my-page" v-if="count>perpage">
        <Page :total="count" :page-size="perpage" @on-change="click_page"/>
      </div>
    </background>

    <!--点击查看大图显示遮罩-->
    <div class="img-mask" v-if="img_mask" @click="hiddin_img">
      <div class="img-mask-cont" :style="'background-image: url('+look_img_url+')'"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: 0,
        crumb_title: '',//面包屑最后一级显示内容
        choice_on: 0,//选择的列表

        show_choice: false,//显示可选项

        theme_list: [],//主题列表
        edu_list: [],//活动列表

        page: 1,
        perpage: 10,
        count: 0,

        img_mask: false,
        look_img_url: '',
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.id = parseInt(to.query.id);
      this.choice_on = this.id;
      this.crumb_title = this.theme_list[this.choice_on - 1].title;
      this.getEduList();
      next();
    },
    mounted() {
      this.id = parseInt(this.$route.query.id);
      this.getThemeList();
      this.getEduList();
    },
    destroyed() {
      this.utils.move();
    },
    methods: {
      // 点击分页
      click_page(page) {
        this.page = page;
        this.getEduList();
      },

      // 选择显示的内容
      choice_click(index) {
        if (index !== this.choice_on) {
          this.choice_on = index;
          this.show_choice = false;
          this.id = this.theme_list[index].id;
          this.crumb_title = this.theme_list[index].title;
          this.getEduList();
        } else {
          this.$Message.info('不可重复选择');
        }
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

      // 获取教育活动主题列表
      getThemeList() {
        this.utils.ajax(this, 'edu/themeList').then(res => {
          if (this.id) {
            for (let i = 0; i < res.length; i++) {
              if (res[i].id === this.id) {
                this.choice_on = i;
                this.crumb_title = res[i].title;
              }
            }
          } else {
            this.choice_on = 0;
            this.crumb_title = res[0].title;
            this.id = res[0].id;
          }
          this.theme_list = res;
        });
      },
      // 获取教育活动列表
      getEduList() {
        let post = { tid: this.id, page: this.page, perpage: this.perpage };
        this.utils.ajax(this, 'edu/eduList', post).then(res => {
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].start_time = this.utils.date_format(new Date(res.list[i].start_time), 'yyyy/MM/dd');
            this.utils.aliyun_format(res.list[i].pics);
          }
          this.edu_list = res.list;
          this.count = res.count;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .edu-active-list {
    .choice-box {
      margin-top: 35px;
      position: relative;
      background-image: url("../assets/border2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      height: 40px;
      width: 100%;
      font-size: 16px;
      color: #cf903a;
      text-align: center;
      line-height: 40px;
      padding: 0 40px;
      cursor: pointer;

      i {
        display: block;
        width: 14px;
        height: 10px;
        background-image: url("../assets/icon-down.png");
        background-repeat: no-repeat;
        background-size: 14px 10px;
        background-position: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 30px;
        transition: 0.5s;

        &.show {
          transform-origin: 7px 2.5px;
          transform: rotate(180deg);
        }
      }

      ul {
        position: absolute;
        overflow: hidden;
        height: 0;
        transition: 0.5s;
        top: 40px;
        left: 8px;
        right: 8px;
        background-color: #ffffff;
        z-index: 999;

        li {
          &:hover {
            background-color: #cf903a;
            color: #ffffff;
          }
        }

        &.show {
          height: 300px;
        }
      }
    }

    .edu-list {
      margin-top: 50px;

      .edu-item {
        border-left: 1px solid #e8e2ca;
        /*overflow: hidden;*/
        padding-top: 40px;

        &:first-child {
          padding-top: 0;
        }

        h3 {
          padding-left: 30px;
          position: relative;
          font-size: 20px;
          color: #cf903a;
          font-weight: normal;
          margin-bottom: 13px;

          &:after {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -2.5px;
            content: '';
            display: block;
            width: 5px;
            height: 5px;
            background-color: #cf903a;
            border-radius: 3px;
          }

          &:before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 15px;
            width: 10px;
            height: 14px;
            background-image: url("../assets/icon-arrows-default.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 10px 14px;
          }
        }

        p {
          margin-left: 30px;
          font-size: 16px;
          color: #666666;
        }

        .img-list {
          margin-left: 30px;
          display: flex;
          margin-top: 20px;
          flex-wrap: wrap;

          .img {
            cursor: pointer;
            width: 300px;
            height: 200px;
            margin-right: 24px;
            margin-top: 24px;
            overflow: hidden;

            &:nth-child(-n+3) {
              margin-top: 0;
            }

            i {
              display: block;
              width: 100%;
              height: 100%;
              transition: 0.5s;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
            }

            &:hover {
              i {
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
  }
</style>
