<template>
  <div class="web-map page">
    <background :bg_num="2">
      <crumb/>

      <div class="title"><h3>网站地图</h3></div>
      <div class="url-box">
        <ul>
          <li v-for="(item,index) in nav" :key="'map'+index">
            <a :href="item.url" v-if="item.id === 7" target="_blank" class="nav-url">{{item.name}}</a>
            <router-link :to="item.url" class="nav-url" v-else>{{item.name}}</router-link>
            <div class="s-nav" v-if="item.s_nav.length">
              <div class="s-nav-item" v-for="(v,i) in item.s_nav" :key="'s-nav'+i">
                <a v-if="item.id===7" :href="v.s_url" target="_blank" class="s-nav-url">{{v.title}}</a>
                <router-link v-else-if="v.id" :to="{path:v.s_url,query:{id:v.id}}" class="s-nav-url">{{v.title}}
                </router-link>
                <router-link v-else :to="v.s_url" class="s-nav-url">{{v.title}}</router-link>
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
    data() {
      return {
        nav: []
      };
    },
    mounted() {
      this.nav = this.config.nav;
    }
  };
</script>

<style lang="scss" scoped>
  .web-map {
    .url-box {
      padding-bottom: 300px;

      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
          position: relative;
          padding-left: 30px;
          margin-right: 30px;
          background-image: url("../assets/icon-arrows-default.png");
          background-repeat: no-repeat;
          background-size: 10px 14px;
          background-position: left;
          line-height: 30px;

          &:first-child {
            width: 100%;
            margin-bottom: 40px;
          }

          &:last-child {
            margin-right: 0;
          }

          .nav-url {
            font-size: 16px;
            color: #666666;

            &:hover {
              color: #cf903a;
            }
          }

          .s-nav {
            position: absolute;
            width: max-content;

            .s-nav-item {
              .s-nav-url {
                font-size: 14px;
                color: #666666;
              }
            }
          }
        }
      }
    }
  }
</style>
