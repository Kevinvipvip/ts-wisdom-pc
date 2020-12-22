<template>
  <div class="active-list page">
    <background type="border">
      <crumb/>
      <div class="active">
        <div class="item" v-for="(item,index) in active" :key="'active'+index" @click="to_active_detail(item.id)">
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
        perpage: 6,
        count: 120,

        active: [],//活动预约列表
      };
    },
    mounted() {
      this.getActivityList();
    },
    methods: {
      // 点击分页时
      click_page(page) {
        this.page = page;
        this.getActivityList();
      },

      // 点击前往活动预约详情
      to_active_detail(id) {
        this.$router.push({ name: 'detail_active', query: { id: id, from_type: 2 } });
      },

      getActivityList() {
        let post = { page: this.page, perpage: this.perpage };
        this.utils.ajax(this, 'activity/activityList', post).then(res => {
          this.utils.aliyun_format(res.list);
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].start_time = this.utils.date_format(res.list[i].start_time, 'yyyy/MM/dd');
          }
          this.count = res.count;
          this.active = res.list;
          console.log(res);
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .active-list {

  }
</style>
