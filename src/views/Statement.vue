<template>
  <div class="statement page">
    <background :bg_num="2">
      <crumb :last_title="type===1?'隐私声明':'版权声明'" change/>
      <div class="title"><h3>{{type===1?'隐私声明':'版权声明'}}</h3></div>
      <div class="rich-text" v-html="type===1?statement.privacy:statement.copyright"></div>
    </background>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: 1,
        statement: {}
      };
    },
    beforeRouteUpdate(to, from, next) {
      this.type = parseInt(to.query.id);
      next();
    },
    mounted() {
      this.type = parseInt(this.$route.query.id);
      this.utils.ajax(this, 'api/statement').then(res => {
        this.statement = res;
      })
    }
  };
</script>

<style lang="scss" scoped>
  .statement {

  }
</style>
