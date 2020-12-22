<template>
  <!--典藏文物页-->
  <div class="collection page">
    <background>
      <crumb/>

      <div class="banner"><img :src="banner"/></div>

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

      <div class="cate-list">
        <ul>
          <li v-for="(item,index) in recommend" :key="'cate-list'+index"
              :style="'background-image: url('+cate_bg+')'" @click="to_collect_list(item.id)">
            <div class="img"><img :src="item.pic"/></div>
            <p>{{item.cate_name}}</p>
          </li>
        </ul>
      </div>
    </background>
  </div>
</template>

<script>
  export default {
    name: "Collection",
    data() {
      return {
        banner: this.config.aliyun + 'ts-static/pc/img-collect-banner.png',//banner图在阿里云上的链接地址
        cate_bg: this.config.aliyun + 'ts-static/pc/bg-collect-cate.png',//分类背景图在阿里云上的链接地址

        dynasty: '全部朝代',//已选朝代
        dynasty_id: 0,//已选朝代ID
        show_dynasty: false,//点击显示朝代

        cate_name: '全部类别',//已选类别
        cate_id: 0,//已选类别ID
        show_cate: false,//点击显示分类

        keyword: '',//输入的关键字

        dynasty_list: [],//朝代列表
        cate_list: [],//分类列表
        recommend: [],//分类列表
      }
    },
    mounted() {
      this.getDynastyList();
      this.getCollectCateList();
    },
    methods: {
      // 点击搜索按钮
      sreach() {
        this.$router.push({
          name: 'collect_list',
          query: {
            dynasty_id: this.dynasty_id,
            cate_id: this.cate_id,
            keyword: this.keyword
          }
        });
      },

      // 点击前往文物列表
      to_collect_list(id) {
        this.$router.push({
          name: 'collect_list',
          query: {
            dynasty_id: this.dynasty_id,
            cate_id: id,
            keyword: this.keyword
          }
        });
      },

      // 点击选择朝代
      choice_dynasty(id, name) {
        this.dynasty_id = id;
        this.dynasty = name;
      },

      // 点击选择分类
      choice_cate(id, name) {
        this.cate_id = id;
        this.cate_name = name;
      },

      // 获取朝代列表
      getDynastyList() {
        this.utils.ajax(this, 'collect/dynastyList').then(res => {
          this.dynasty_list = res;
        });
      },
      // 获取分类列表
      getCollectCateList() {
        this.utils.ajax(this, 'collect/collectCateList').then(res => {
          this.utils.aliyun_format(res.list);
          this.utils.aliyun_format(res.recommend);
          this.cate_list = res.list;
          this.recommend = res.recommend;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .collection {
    .banner {
      margin-top: 30px;
      width: 100%;
      height: 400px;
    }

    .search {
      margin-top: 61px;
      display: flex;
      justify-content: space-between;

      .sreach-item {
        width: 287px;
        height: 60px;
        background-image: url("../assets/bg-btn-more.png");
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
          z-index: 9;

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

    .cate-list {
      padding-bottom: 186px;

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          margin-top: 160px;
          width: 264px;
          height: 220px;
          margin-bottom: 40px;
          margin-right: 24px;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;

          &:nth-child(4n) {
            margin-right: 0;
          }

          &:nth-child(even) {
            transform: translateY(186px);
          }

          .img {
            position: absolute;
            bottom: 119px;
            left: 50%;
            transform: translateX(-50%);
            height: 221px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center;
            display: flex;
            align-items: flex-end;
            justify-content: center;

            box-shadow: 0 140px 20px -100px rgba(0, 0, 0, 0.2);

            img {
              width: auto;
              max-height: 100%;
              transition: 1s;
            }
          }

          p {
            width: 215px;
            height: 40px;
            font-size: 16px;
            text-align: center;
            line-height: 40px;
            color: #ffffff;
            background-image: url("../assets/btn-cate-border.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-bottom: 20px;
          }

          &:hover {
            .img {
              img {
                transform: translateY(20px);
              }
            }
          }
        }
      }
    }
  }
</style>
