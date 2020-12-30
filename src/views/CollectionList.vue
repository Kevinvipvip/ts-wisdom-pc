<template>
  <!--典藏文物列表页-->
  <div class="collection page">
    <background>
      <crumb to_title="典藏文物" to="/collection"/>

      <div class="search">
        <div class="sreach-item" @click="show_dynasty=!show_dynasty" :class="show_dynasty?'hover':''"
             @mouseleave="show_dynasty=false">
          <p>{{dynasty}}</p>
          <div class="icon"><img src="../assets/icon-down.png"/></div>
          <ul>
            <li :class="dynasty_id === 0?'on':''" @click="choice_dynasty(0,'全部朝代')">全部</li>
            <li v-for="(item,index) in dynasty_list" :key="'dynasty'+index" :class="dynasty_id === item.id?'on':''"
                @click="choice_dynasty(item.id,item.name)"> {{item.name}}
            </li>
          </ul>
        </div>
        <div class="sreach-item" @click="show_cate=!show_cate" :class="show_cate?'hover':''"
             @mouseleave="show_cate=false">
          <p>{{cate_name}}</p>
          <div class="icon"><img src="../assets/icon-down.png"/></div>
          <ul>
            <li :class="cate_id === 0?'on':''" @click="choice_cate(0,'全部类别')">全部</li>
            <li v-for="(item,index) in cate_list" :key="'cate'+index" :class="cate_id === item.id?'on':''"
                @click="choice_cate(item.id,item.cate_name)">{{item.cate_name}}
            </li>
          </ul>
        </div>
        <div class="sreach-item ipt-box">
          <input type="text" placeholder="请输入文物名称" v-model="keyword"/>
        </div>
        <div class="sreach-item sreach-box" @click="sreach">
          <div class="sreach-icon"><img src="../assets/icon-search1.png"/></div>
          <span>搜索</span>
        </div>
      </div>

      <div class="collect-cont">
        <ul v-for="(item,index) in collect_list" :key="index">
          <li v-for="v in item.list" :key="'collect'+v.id" @click="to_collect_detail(v.id)">
            <div class="img-box">
              <div class="img"
                   :style="{paddingBottom: v.height / v.width * 100 + '%', backgroundImage: 'url('+v.cover+')'}"></div>
            </div>
            <div class="item-cont">
              <h3>{{v.title}}</h3>
              <p>{{v.dynasty}} | {{v.cate_name}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="more"><p @click="look_more">{{more_text}}</p></div>
    </background>
  </div>
</template>

<script>
  export default {
    name: "Collection",
    data() {
      return {
        dynasty: '全部朝代',//已选朝代
        dynasty_id: 0,//已选朝代ID
        show_dynasty: false,//点击显示朝代

        cate_name: '全部类别',//已选类别
        cate_id: 0,//已选类别ID
        show_cate: false,//点击显示分类

        keyword: '',//输入的关键字

        dynasty_list: [],//朝代列表
        cate_list: [],//分类列表

        page: 1,
        perpage: 24,
        count: 0,

        no_more: false,
        more_text: '点击查看更多',
        //典藏文物列表
        collect_list: [{
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
    mounted() {
      this.dynasty_id = parseInt(this.$route.query.dynasty_id) || 0;
      this.cate_id = parseInt(this.$route.query.cate_id) || 0;
      this.keyword = this.$route.query.keyword || '';
      this.getDynastyList();
      this.getCollectCateList();
      this.getCollectList();
    },
    methods: {
      // 点击搜索按钮
      sreach() {
        this.reset();
        this.getCollectList();
      },

      // 点击前往文物详情
      to_collect_detail(id) {
        this.$router.push({ name: 'detail_collect', query: { id: id, from_type: 1 } })
      },

      // 重置数据
      reset() {
        this.page = 1;
        this.no_more = false;
        this.more_text = '点击查看更多';
        for (let i = 0; i < this.collect_list.length; i++) {
          this.collect_list[i].list = [];
          this.collect_list[i].list_height = 0;
        }
      },

      // 点击选择朝代
      choice_dynasty(id, name) {
        this.dynasty_id = id;
        this.dynasty = name;
        this.reset();
        this.getCollectList();
      },

      // 点击选择分类
      choice_cate(id, name) {
        this.cate_id = id;
        this.cate_name = name;
        this.reset();
        this.getCollectList()
      },

      // 点击查看更多
      look_more() {
        if (this.no_more) {
          this.$Message.info('没有更多了')
        } else {
          this.page++;
          this.getCollectList();
        }
      },

      // 获取朝代列表
      getDynastyList() {
        this.utils.ajax(this, 'collect/dynastyList').then(res => {
          // console.log(parseInt(this.$route.query.dynasty_id));
          for (let i = 0; i < res.length; i++) {
            if (res[i].id === this.dynasty_id) {
              this.dynasty_id = res[i].id;
              this.dynasty = res[i].name;
            }
          }
          this.dynasty_list = res;
        });
      },
      // 获取分类列表
      getCollectCateList() {
        this.utils.ajax(this, 'collect/collectCateList').then(res => {
          for (let i = 0; i < res.list.length; i++) {
            if (res.list[i].id === this.cate_id) {
              this.cate_id = res.list[i].id;
              this.cate_name = res.list[i].cate_name;
            }
          }
          this.cate_list = res.list;
        });
      },
      // 获取典藏文物列表
      getCollectList() {
        let post = {
          cate_id: this.cate_id, dynasty: this.dynasty_id, page: this.page,
          perpage: this.perpage, search: this.keyword
        };
        this.utils.ajax(this, 'collect/collectList', post).then(res => {
          this.utils.aliyun_format(res.list, 'cover');
          for (let i = 0; i < res.list.length; i++) {
            let index = this.utils.getMinIndex(this.collect_list);
            this.collect_list[index].list.push(res.list[i]);
            this.collect_list[index].list_height += res.list[i].height / res.list[i].width + 0.3599;
          }
          this.count = res.count;
          if (res.list.length < this.perpage) {
            this.no_more = true;
            this.more_text = '没有更多了'
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .collection {
    .search {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;

      .sreach-item {
        width: 287px;
        height: 60px;
        background-image: url("../assets/bg-border-collect.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        font-size: 16px;
        color: #666666;
        position: relative;
        cursor: pointer;

        .icon {
          transition: 0.5s;
          width: 14px;
          height: 10px;
          border-radius: 2px;
        }

        ul {
          position: absolute;
          background-color: #ffffff;
          top: 60px;
          left: 20px;
          width: calc(100% - 40px);
          height: 0;
          overflow: auto;
          transition: 0.5s;

          &::-webkit-scrollbar {
            display: none;
          }

          li {
            font-size: 16px;
            line-height: 40px;
            color: #666666;
            padding: 0 20px;
            cursor: pointer;

            &:hover, &.on {
              background-color: #b38146;
              color: #ffffff;
            }
          }
        }

        &.hover {
          ul {
            height: 400px;
          }

          .icon {
            transform: rotate(180deg);
          }
        }

        &.ipt-box {
          input {
            font-size: 16px;
            color: #666666;
            outline: none;
            background: unset;
            border: none;
            display: block;
            width: 100%;
          }
        }

        &.sreach-box {
          width: 118px;
          height: 60px;
          padding: 0;
          background-image: url("../assets/bg-btn-sreach.png");
          display: flex;
          justify-content: center;
          cursor: pointer;

          .sreach-icon {
            width: 21px;
            height: 20px;
            margin-right: 8px;
          }
        }
      }
    }

    .more {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 40px 0;

      p {
        font-size: 14px;
        color: #aaaaaa;
        cursor: pointer;
      }
    }
  }
</style>
