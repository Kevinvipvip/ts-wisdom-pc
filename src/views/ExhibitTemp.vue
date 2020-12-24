<template>
  <!--临时展览页-->
  <div class="exhibit-temp page">
    <background type="border">
      <crumb to="/exhibition" to_title="陈列展览"/>
      <ul class="temp-list" v-if="temp_list.length">
        <li v-for="(item,index) in temp_list" :key="'temp'+index" @click="to_detail(item.id)">
          <div class="img-box">
            <div class="img" :style="'background-image: url('+item.cover+')'"></div>
            <div class="type" :class="'bg'+item.cate_id">{{item.tag}}</div>
          </div>
          <div class="item-cont">
            <h3 class="two-line-ellipsis">{{item.title}}</h3>
            <p>展览起止时间：{{item.start_time}} ~ {{item.end_time}}</p>
          </div>
        </li>
      </ul>
      <div class="my-page" v-if="count>perpage">
        <Page :total="count" :page-size="perpage" @on-change="click_page"/>
      </div>
    </background>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        perpage: 9,
        count: 0,

        temp_list: [],
      };
    },
    mounted() {
      this.getDisplayList();
    },
    methods: {
      to_detail(id) {
        this.$router.push({ name: 'detail_exhibit', query: { id: id, from_type: 4 } });
      },

      //点击分页
      click_page(page) {
        this.page = page;
        this.getDisplayList();
      },
      // 获取展览列表
      getDisplayList() {
        let post = {
          type: 1,//1为临时展览；2为常设展览；0为全部
          page: this.page,
          perpage: this.perpage
        };
        this.utils.ajax(this, 'api/displayList', post).then(res => {
          this.utils.aliyun_format(res.list, 'cover');
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].start_time = this.utils.date_format(res.list[i].start_time, 'yyyy/MM/dd');
            res.list[i].end_time = this.utils.date_format(res.list[i].end_time, 'yyyy/MM/dd');
          }
          this.count = res.count;
          this.temp_list = res.list;
        });
      },

    }
  };
</script>

<style lang="scss" scoped>
  .exhibit-temp {

  }
</style>
