<template>
  <div class="committee page">
    <background type="border">
      <crumb to_title="学术研究" to="/academic"></crumb>

      <div class="tab">
        <div class="tab-item" :class="tab===1?'active':''" @click="tab_click(1)">章程</div>
        <div class="tab-item" :class="tab===2?'active':''" @click="tab_click(2)">工作规程</div>
        <div class="tab-item" :class="tab===3?'active':''" @click="tab_click(3)">成员名录</div>
      </div>

      <!--选择成员名录时显示-->
      <div class="member" v-if="tab === 3">
        <h3>唐山博物馆学术委员会成员名录</h3>
        <ul>
          <li v-for="(item,index) in member" :key="'member'+index">
            <div class="img-box">
              <div class="img" :style="'background-image:url('+item.pic+')'"></div>
            </div>
            <div class="member-cont">
              <h2>{{item.name}} | {{item.title1}}</h2>
              <p><span>姓名：{{item.name}}</span><span>学历：{{item.edu}}</span></p>
              <p><span>性别：{{item.sex===1?'男':'女'}}</span><span>学位：{{item.degree}}</span></p>
              <p><span>年龄：{{item.age}}</span><span>单位：{{item.museum}}</span></p>
              <p><span>民族：{{item.nation}}</span><span>现任职称：{{item.title2}}</span></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="rules" v-else>
        <!--选中工作流程时显示-->
        <div class="rules-item" v-if="tab === 2">
          <h3>唐山博物馆学术委员会工作规程</h3>
          <p>{{rules.rules}}</p>
        </div>
        <!--选中章程时显示-->
        <div class="rules-item" v-else>
          <h3>唐山博物馆学术委员会章程</h3>
          <p>{{rules.standard}}</p>
        </div>
      </div>

    </background>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tab: 1,

        rules: {},//章程和工作规则数据

        member: [],//成员名录列表
      };
    },
    mounted() {
      this.tab = parseInt(this.$route.query.id) || 1;
      this.getStudyRules();
      this.getStudyMemberList();
    },
    methods: {
      // 点击切换类别
      tab_click(on) {
        this.tab = on;
      },

      // 获取学术委员会章程和工作规范
      getStudyRules() {
        this.utils.ajax(this, 'study/studyRules').then(res => {
          this.rules = res;
        })
      },

      // 获取学术委员会成员名录
      getStudyMemberList() {
        this.utils.ajax(this, 'study/studyMemberList').then(res => {
          this.utils.aliyun_format(res.list);
          this.member = res.list;
          console.log(res);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .committee {
    h3 {
      font-size: 30px;
      font-weight: normal;
      color: #333333;
      text-align: center;
      margin: 80px 0 40px;
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;

      .tab-item {
        padding: 0 23px;
        margin: 0 20px;
        cursor: pointer;
        background-image: url("../assets/icon-tab-left-default.png"), url("../assets/icon-tab-right-default.png");
        background-size: 9px 18px;
        background-repeat: no-repeat;
        background-position: left, right;
        font-size: 16px;
        color: #666666;

        &:hover, &.active {
          color: #cf903a;
          background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
        }
      }
    }

    .member {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          display: flex;
          width: 50%;
          border-top: 1px solid #e8e2ca;
          padding: 24px 24px 24px 0;

          .img-box {
            width: 135px;
            height: 189px;
            flex-shrink: 0;
            margin-right: 24px;
            overflow: hidden;

            .img {
              width: 100%;
              height: 100%;
              transition: 0.5s;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
            }

            &:hover {
              .img {
                transform: scale(1.1);
              }
            }
          }

          .member-cont {
            flex-grow: 1;

            h2 {
              font-weight: normal;
              font-size: 24px;
              color: #333333;
              margin-bottom: 25px;
            }

            p {
              color: #333333;
              font-size: 16px;
              line-height: 32px;
              display: flex;
              justify-content: space-between;

              span {
                flex: 2;

                &:nth-child(1) {
                  flex: 1;
                }
              }
            }
          }
        }
      }
    }

    .rules {
      margin-bottom: 50px;

      .rules-item {
        p {
          white-space: pre-line;
          text-align: justify;
        }
      }
    }
  }
</style>
