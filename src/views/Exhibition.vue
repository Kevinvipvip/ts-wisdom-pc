<template>
  <div class="exhibition page">
    <background>
      <crumb/>

      <!--常设展览-->
      <div class="title"><h3>常设展览</h3></div>
      <div class="standing" v-if="standing_list.length">
        <div class="img" :style="'background-image: url('+standing_list[standing_index].cover+')'"></div>
        <ul>
          <li v-for="(item,index) in standing_list" :key="'standing'+index"
              :class="standing_index === index?'hover-on':''"
              @mouseenter="standing_hover(index)" @click="to_detail(item.id)">
            <h3 class="one-line-ellipsis">{{item.title}}</h3>
            <p class="one-line-ellipsis">{{item.desc}}</p>
          </li>
        </ul>
      </div>
      <div class="more">
        <router-link to="/exhibit_standing">查看更多</router-link>
      </div>

      <!--临时展览-->
      <div class="title"><h3>临时展览</h3></div>
      <div class="temp">
        <div class="tab">
          <div class="tab-item" :class="tab===0?'active':''" @click="tab_temp(0)">全部展览</div>
          <div class="tab-item" :class="tab===2?'active':''" @click="tab_temp(2)">原创展览</div>
          <div class="tab-item" :class="tab===1?'active':''" @click="tab_temp(1)">馆际交流</div>
        </div>
        <ul v-if="temp_list.length">
          <li v-for="(item,index) in temp_list" :key="'temp'+index" @click="to_detail(item.id)">
            <div class="img" :style="'background-image: url('+item.cover+')'">
              <div class="type" :class="'bg'+item.cate_id">{{item.tag}}</div>
            </div>
            <div class="item-cont">
              <h3 class="two-line-ellipsis">{{item.title}}</h3>
              <p>展览起止时间：{{item.start_time}} ~ {{item.end_time}}</p>
            </div>
          </li>
        </ul>
        <div class="nodata" v-else>
          <span v-if="tab === 1">暂无馆际交流，敬请期待</span>
          <span v-else-if="tab===2">暂无原创展览，敬请期待</span>
          <span v-else>暂无临时展览，敬请期待</span>
        </div>
      </div>
      <div class="more">
        <router-link to="/exhibit_temp">查看更多</router-link>
      </div>

      <!--展览计划-->
      <div class="title"><h3>展览计划</h3></div>
      <div class="plan-img" :style="'background-image: url('+plan.pic+')'" @click="to_plan_detail(plan.id)">
        <h3><p>{{plan.title}}</p>
          <p>{{plan.create_time}}</p></h3>
      </div>
      <div class="more">
        <router-link to="/exhibit_plan">查看更多</router-link>
      </div>
    </background>
  </div>
</template>

<script>
  export default {
    name: "Exhibition",
    data() {
      return {
        standing_index: 0,
        standing_list: [],//长设展览列表

        temp_list: [],//临时展览列表

        plan: {},//展览计划
        tab: 0,
      }
    },
    mounted() {
      // console.log('将婚纱的客户技术技术就，飒沓。'.length);
      // 常设展览
      this.getDisplayList(2, 4, list => {
        this.standing_list = list;
      });
      // 临时展览列表
      this.getDisplayList(1, 3, list => {
        this.temp_list = list;
      });
      // 展览计划数据
      this.getDisplayArticleList();
    },
    methods: {
      // 鼠标悬浮在常设展览上时操作
      standing_hover(index) {
        this.standing_index = index;
      },
      // 点击前往展览详情页
      to_detail(id) {
        console.log(id);
        this.$router.push({ path: '/detail_exhibit', query: { id: id, from_type: 2 } });
      },
      // 点击跳转展览计划详情页
      to_plan_detail(id) {
        this.$router.push({ path: '/detail_plan', query: { id: id, from_type: 1 } });
      },
      // 点击切换临时展览类别
      tab_temp(num) {
        this.tab = num;
        this.getDisplayList(1, 3, list => {
          this.temp_list = list;
        });
      },

      // 获取展览列表
      getDisplayList(type, perpage, succ) {
        let post = {
          type: type,//1为临时展览；2为常设展览；0为全部
          cate_id: this.tab,//type为1时有效；1为馆际交流，2为原创展览；0为全部
          page: 1,
          perpage: perpage
        };
        this.utils.ajax(this, 'api/displayList', post).then(res => {
          this.utils.aliyun_format(res.list, 'cover');
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].start_time = this.utils.date_format(res.list[i].start_time, 'yyyy/MM/dd');
            res.list[i].end_time = this.utils.date_format(res.list[i].end_time, 'yyyy/MM/dd');
          }
          if (succ) {
            succ(res.list);
          }
        });
      },

      // 获取展览计划
      getDisplayArticleList() {
        this.utils.ajax(this, 'api/displayArticleList').then(res => {
          this.utils.aliyun_format(res.list);
          res.list[0].create_time = this.utils.date_format(new Date(res.list[0].create_time), 'yyyy/MM/dd');
          this.plan = res.list[0];
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .exhibition {
    .more {
      margin: 46px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        display: block;
        width: 200px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        color: #666666;
        background-image: url('../assets/bg-btn-more.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;

        &:hover {
          color: #cf903a;
        }
      }
    }

    .standing {
      display: flex;

      .img {
        flex-shrink: 0;
        width: 552px;
        height: 368px;
        margin-right: 24px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        background-color: #cccccc;
      }

      ul {
        width: calc(100% - 580px);
        flex-grow: 1;
        display: flex;
        flex-flow: column;

        li {
          height: 25%;
          border-bottom: 1px solid #cf903a;
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          cursor: pointer;

          h3 {
            font-size: 20px;
            color: #333333;
            font-weight: normal;
            position: relative;
            padding-left: 32px;
            box-sizing: border-box;

            &:after {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
              content: '';
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #cf903a;
            }
          }

          p {
            font-size: 16px;
            color: #666666;
            padding-left: 32px;
          }

          &:hover, &.hover-on {
            h3 {
              color: #cf903a;
            }
          }
        }
      }
    }

    .temp {
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
          user-select: none;

          &:hover, &.active {
            color: #c88e45;
            background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
          }
        }
      }

      ul {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;

        li {
          width: calc(33.3333% - 16px);
          background-color: #ffffff;
          border: 1px solid #cccccc;
          margin-right: 24px;
          margin-bottom: 24px;
          cursor: pointer;

          &:nth-child(3n) {
            margin-right: 0;
          }

          .img {
            position: relative;
            width: 100%;
            height: 240px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;

            .type {
              position: absolute;
              top: 10px;
              left: 10px;
              font-size: 14px;
              color: #ffffff;
              padding: 5px 10px;
              background-color: #cf903a;
              border-radius: 4px;

              &.bg1 {
                background-color: #29ac83;
              }
            }
          }

          .item-cont {
            h3 {
              font-size: 20px;
              font-weight: normal;
              color: #333333;
              margin: 20px;
              text-align: justify;
            }

            p {
              margin: 24px 20px;
              font-size: 14px;
              color: #666666;
              padding-right: 15px;
              box-sizing: border-box;
              background-image: url("../assets/icon-arrows-default.png");
              background-repeat: no-repeat;
              background-position: right;
              background-size: 10px 14px;
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
      }
    }

    .plan-img {
      height: 480px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      align-items: flex-end;
      cursor: pointer;

      h3 {
        width: 100%;
        display: flex;
        font-weight: normal;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #ffffff;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px;
        font-size: 16px;

        p:last-child {
          font-size: 20px;
        }
      }
    }
  }
</style>
