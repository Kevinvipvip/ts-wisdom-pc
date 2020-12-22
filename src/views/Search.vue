<template>
  <div class="search page">
    <background>
      <crumb/>
      <div class="search-ipt">
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

      <!--搜索结果列表-->
      <div class="nodata" v-if="no_keyword"><span>请填写关键词后搜索</span></div>
      <div class="result" v-else-if="!nodata">
        <div class="collect-cont" v-if="type===1">
          <ul v-for="(item,index) in collect_list" :key="index">
            <li v-for="v in item.list" :key="'collect'+v.id" @click="to_more_detail(type,v.id)">
              <div class="img"
                   :style="{paddingBottom: v.height / v.width * 100 + '%', backgroundImage: 'url('+v.cover+')'}"></div>
              <div class="item-cont">
                <h3>{{v.title}}</h3>
                <p>{{v.dynasty}} | {{v.cate_name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <ul class="temp-list" v-else-if="type===2">
          <li v-for="(item,index) in result" :key="'result-temp'+index" @click="to_more_detail(type,item.id)">
            <div class="img" :style="'background-image: url('+item.cover+')'">
              <div class="type" :class="'bg'+item.cate_id">{{item.tag}}</div>
            </div>
            <div class="item-cont">
              <h3 class="two-line-ellipsis">{{item.title}}</h3>
              <p>展览起止时间：{{item.start_time}} ~ {{item.end_time}}</p>
            </div>
          </li>
        </ul>

        <div class="active" v-else-if="type===3">
          <div class="item" v-for="(item,index) in result" :key="'result-active'+index"
               @click="to_more_detail(type,item.id)">
            <div class="img" :style="'background-image: url('+item.pic+')'"></div>
            <div class="item-cont">
              <h3 class="two-line-ellipsis">{{item.title}}</h3>
              <div class="p-box">
                <p class="one-line-ellipsis">活动时间：{{item.start_time}}</p>
                <p class="hove-right-tip one-line-ellipsis">活动地点：{{item.address}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="news-list" v-else-if="type===4">
          <ul>
            <li v-for="(item,index) in result" :key="'result-news'+index" @click="to_more_detail(type,item.id)">
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
        </div>

      </div>
      <div class="nodata" v-else><span>没有搜索结果</span></div>

    </background>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        show_select: false,

        no_keyword: true,//是否填写了关键词
        keyword: '',//关键词
        select_text: '',//搜索项
        type: 0,//当前显示的列表项

        result: [],//搜索结果
        nodata: true,

        //典藏文物列表
        collect_list: [
          {
            list: [],
            list_height: 0,
          }, {
            list: [],
            list_height: 0,
          }, {
            list: [],
            list_height: 0,
          }, {
            list: [],
            list_height: 0,
          }],

      }
    },
    beforeRouteUpdate(to) {
      this.select_text = to.query.select || '藏品';
      this.keyword = to.query.keyword || '';
      this.no_keyword = this.keyword ? false : true;
      this.search();
    },
    mounted() {
      this.select_text = this.$route.query.select || '藏品';
      this.keyword = this.$route.query.keyword || '';
      this.no_keyword = this.keyword ? false : true;
      this.search();
    },
    methods: {
      // 点击选择搜索项
      click_select(title) {
        this.select_text = title;
        this.show_select = false;
      },

      // 点击搜索按钮实现搜索功能
      search() {
        this.collect_list = [
          {
            list: [],
            list_height: 0,
          }, {
            list: [],
            list_height: 0,
          }, {
            list: [],
            list_height: 0,
          }, {
            list: [],
            list_height: 0,
          }];
        this.result = [];
        switch (this.select_text) {
          case '藏品':
            this.type = 1;
            this.getSearchResult('collect/collectList', {}, list => {
              this.utils.aliyun_format(list, 'cover');
              for (let i = 0; i < list.length; i++) {
                let index = this.utils.getMinIndex(this.collect_list);
                this.collect_list[index].list.push(list[i]);
                this.collect_list[index].list_height += list[i].height / list[i].width + 0.3599;
              }
              this.result = list;
            });
            break;
          case '展览':
            this.type = 2;
            this.getSearchResult('api/displayList', {}, list => {
              this.utils.aliyun_format(list, 'cover');
              for (let i = 0; i < list.length; i++) {
                list[i].start_time = this.utils.date_format(list[i].start_time, 'yyyy/MM/dd');
                list[i].end_time = this.utils.date_format(list[i].end_time, 'yyyy/MM/dd');
              }
              this.result = list;
            });
            break;
          case '活动':
            this.type = 3;
            this.getSearchResult('activity/activityList', {}, list => {
              this.utils.aliyun_format(list);
              for (let i = 0; i < list.length; i++) {
                list[i].start_time = this.utils.date_format(list[i].start_time, 'yyyy/MM/dd');
              }
              this.result = list;
            });
            break;
          case '新闻':
            this.type = 4;
            this.getSearchResult('api/articleList', {}, list => {
              this.utils.aliyun_format(list);
              for (let i = 0; i < list.length; i++) {
                list[i].create_time = this.utils.date_format(new Date(list[i].create_time), 'yyyy/MM/dd');
              }
              this.result = list;
            });
            break;
        }
      },

      // 点击分别前往相应的详情页
      to_more_detail(type, id) {
        let query = { id: id, from_type: 99, keyword: this.keyword, select: this.select_text };
        console.log(query)
        switch (type) {
          case 1:
            this.$router.push({ name: 'detail_collect', query: query });
            break;
          case 2:
            this.$router.push({ name: 'detail_exhibit', query: query });
            break;
          case 3:
            this.$router.push({ name: 'detail_active', query: query });
            break;
          case 4:
            this.$router.push({ name: 'detail_news', query: query });
            break;
        }
      },
      // 获取搜索结果
      getSearchResult(url, data, complete) {
        let post = data || {};
        post.page = 1;
        post.perpage = 100;
        post.search = this.keyword;
        if (this.keyword) {
          this.no_keyword = false;
          this.utils.ajax(this, url, post).then(res => {
              if (res.list.length) {
                this.nodata = false;
                if (complete)
                  complete(res.list);
              } else {
                this.nodata = true;
              }
            }
          );
        } else {
          console.log('请填写关键词后搜索');
          this.no_keyword = true;
        }
      }

    }
  }
</script>

<style scoped lang="scss">
  .search {
    .search-ipt {
      background-color: #ffffff;
      margin: 30px 63px;
      display: flex;
      justify-content: space-between;
      border: solid 1px #cf903a;
      height: 60px;

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
    }
  }
</style>
