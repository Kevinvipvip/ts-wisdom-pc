<template>
  <div class="crumb">
    <router-link to="/" tag="p">首页</router-link>
    <div class="slant"></div>
    <div v-if="is_search">
      <router-link :to="{path:'/search',query:query}" tag="p">搜索</router-link>
    </div>
    <div v-else>
      <router-link :to="to" tag="p" v-if="to!=='null'">{{to_title}}</router-link>
    </div>
      <div class="slant" v-if="is_search"></div>
      <div class="slant" v-else-if="to!=='null'"></div>
    <p class="no-click" v-if="change">{{last_title}}</p>
    <p class="no-click" v-else>{{to_router_title}}</p>
  </div>
</template>

<script>
  export default {
    name: "Crumb",
    data() {
      return {
        is_search: false, to_router_title: '', query: {}
      }
    },
    props: {
      to: {
        type: [String, Object],
        default: 'null'
      },
      to_title: { type: String, default: "二级页" },
      change: { type: Boolean, default: false },
      last_title: { type: String, default: "三级页" }
    },
    mounted() {
      if (parseInt(this.$route.query.from_type) === 99) {
        this.is_search = true;
        this.query = { keyword: this.$route.query.keyword, select: this.$route.query.select };
      } else {
        this.is_search = false;
      }
      this.to_router_title = this.$route.meta.title;
    }
  }
</script>

<style scoped lang="scss">
  //面包屑样式
  .crumb {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999999;

    .slant {
      transform: rotate(15deg);
      margin: 0 5px;
      width: 1px;
      height: 48%;
      background-color: #666666;
    }

    p {
      cursor: pointer;
      user-select: none;

      &.no-click {
        cursor: unset;

      }
    }
  }
</style>
