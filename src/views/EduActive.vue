<template>
  <!--教育活动页-->
  <div class="edu-active page">
    <background :bg_num="1">
      <crumb/>
      <div class="title"><h3>教育活动</h3></div>

      <div class="edu-active-list">
        <ul>
          <li v-for="(item,index) in theme_list" :key="'theme-list'+index">
            <h2 :class="show_on===item.id?'show':''" @click="show_on=item.id">{{item.title}}</h2>
            <div class="theme-cont" :class="show_on===item.id?'show':''"
                 :style="'background-image: url('+theme_bg+')'">
              <div class="theme-cont-border">
                <div class="cont">
                  <div class="cont-title"><h3>{{item.title}}</h3></div>
                  <span>{{item.desc}}</span>
                  <p>{{item.content}}</p>
                </div>
                <router-link :to="{path:'/edu_active_list',query:{id:item.id}}" tag="div" class="btn-theme">进入内容<i></i>
                </router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </background>
  </div>
</template>

<script>
  export default {
    name: "EduActive",
    data() {
      return {
        theme_bg: this.config.aliyun + 'ts-static/pc/bg-theme-cont.png',//主题内容背景图
        show_on: 1,
        theme_list: [],//主题列表
      }
    }, mounted() {
      this.getThemeList();
    }, methods: {
      // 获取教育活动主题列表
      getThemeList() {
        this.utils.ajax(this, 'edu/themeList').then(res => {
          console.log(res);
          this.theme_list = res;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .edu-active {
    .edu-active-list {
      ul {
        display: flex;
        margin-bottom: 32px;

        li {
          height: 400px;
          display: flex;

          h2 {
            background-image: url("../assets/bg-theme-border.png");
            background-color: #cf903a;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            display: flex;
            color: #ffffff;
            align-items: center;
            padding-top: 43px;
            width: 55px;
            height: 100%;
            writing-mode: vertical-rl;
            font-weight: normal;
            font-size: 16px;
            cursor: pointer;

            &.show {
              background-color: #a40000;
            }
          }

          .theme-cont {
            flex-grow: 1;
            transition: 0.5s;
            width: 0;
            overflow: hidden;
            color: #cf903a;

            .theme-cont-border {
              height: 100%;
              background-repeat: no-repeat;
              background-position: left, right;
              background-image: url("../assets/bg-theme-border-left.png"), url("../assets/bg-theme-border-right.png");
              background-size: auto 100%, auto 100%;
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: space-between;

              .cont {
                display: flex;
                flex-flow: column;
                align-items: center;

                .cont-title {
                  background-image: url("../assets/border3-left.png"), url("../assets/border3-right.png");
                  background-position: left, right;
                  background-repeat: no-repeat;
                  background-size: 15px 40px;
                  padding: 0 15px;
                  height: 40px;
                  margin: 20px 0 20px;

                  h3 {
                    height: 100%;
                    background-image: url("../assets/border3-center.png");
                    padding: 0 10px;
                    line-height: 40px;
                    font-size: 16px;
                    color: #ffffff;
                    font-weight: normal;
                  }
                }

                span {
                  font-size: 16px;
                  display: block;
                  margin-bottom: 15px;
                }

                p {
                  min-width: 670px;
                  margin: 0 30px;
                  text-align: justify;
                  font-size: 14px;
                }
              }

              .btn-theme {
                width: 111px;
                height: 19px;
                display: flex;
                cursor: pointer;
                user-select: none;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #cf903a;
                margin-bottom: 20px;
                font-size: 14px;

                i {
                  display: block;
                  width: 10px;
                  height: 14px;
                  background-image: url("../assets/icon-arrows-default.png");
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: 10px 14px;
                  margin-left: 6px;
                }

                &:hover {
                  color: #a40000;
                  border-color: #a40000;

                  i {
                    background-image: url("../assets/icon-arrows-red.png");
                  }
                }
              }
            }

            &.show {
              margin: 0 7px;
              width: 730px;
            }
          }
        }
      }
    }
  }
</style>
