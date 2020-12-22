<template>
  <!--展览计划页-->
  <div class="exhibit-plan page">
    <background :bg_num="2">
      <crumb to="/exhibition" to_title="陈列展览"/>
      <div class="plan-list">
        <ul>
          <li v-for="(item,index) in plan_list" :key="'plan'+index">
            <div class="img" :style="'background-image: url('+item.pic+')'"></div>
            <div class="plan-cont">
              <h3 class="one-line-ellipsis">{{item.title}}</h3>
              <p class="date">{{item.create_time}}</p>
              <p class="two-line-ellipsis">{{item.desc}}</p>
              <div class="btn" @click="to_plan_detail(item.id)">查看详情</div>
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
    data() {
      return {
        page: 1,
        perpage: 5,
        count: 10,

        plan_list: []
      };
    },
    mounted() {
      this.getDisplayArticleList();
    },
    methods: {
      //点击分页
      click_page(page) {
        this.page = page;
        this.getDisplayArticleList();
      },
      // 点击跳转详情页
      to_plan_detail(id) {
        this.$router.push({ path: '/detail_plan', query: { id: id, from_type: 2 } });
      },
      // 获取展览计划
      getDisplayArticleList() {
        let post = { page: this.page, perpage: this.perpage };
        this.utils.ajax(this, 'api/displayArticleList', post).then(res => {
          this.utils.aliyun_format(res.list);
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].create_time = this.utils.date_format(new Date(res.list[i].create_time), 'yyyy/MM/dd');
          }
          this.count = res.count;
          this.plan_list = res.list;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .exhibit-plan {
    .plan-list {
      margin-top: 40px;

      ul {
        li {
          height: 208px;
          display: flex;
          align-items: center;
          border-bottom: solid 1px #e8e2ca;

          &:hover {
            background-image: url("../assets/bg-news-list-selected.png");
            background-repeat: no-repeat;
            background-position: right;
            background-size: auto 100%;

            .plan-cont {
              color: #ffffff;

              h3 {
                color: #ffffff;
              }

              p {
                color: #ffffff;
              }

              .btn {
                color: #ffffff;

                &:after {
                  background-image: url("../assets/icon-arrows-selected.png");
                }
              }
            }
          }

          .img {
            margin: 24px;
            width: 240px;
            height: 160px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            flex-shrink: 0;
          }

          .plan-cont {
            flex-grow: 1;
            width: calc(100% - 300px);
            margin-right: 24px;

            h3 {
              font-weight: normal;
              font-size: 20px;
              color: #333333;
            }

            p {
              font-size: 14px;
              color: #999999;
              line-height: 20px;
              text-align: justify;

              &.date {
                margin: 18px 0;
              }
            }

            .btn {
              font-size: 14px;
              color: #333333;
              margin-top: 18px;
              display: flex;
              align-items: center;
              cursor: pointer;

              &:after {
                content: '';
                margin-left: 6px;
                width: 10px;
                height: 14px;
                display: block;
                background-image: url("../assets/icon-arrows-default.png");
                background-position: center;
                background-size: 100%;
                background-repeat: no-repeat;
              }
            }
          }
        }
      }
    }
  }
</style>
