<template>
  <div class="explain page">
    <background type="border">
      <crumb to="/service" to_title="观众服务"/>
      <div class="title"><h3>讲解参观流程</h3></div>
      <div class="rich-text" v-html="explain"></div>
      <!--<div class="cont">-->
      <!--<h2>一、电话预约讲解</h2>-->
      <!--<p> 1.拨打唐山博物馆宣教部电话 <span>0315-5772269</span>-->
      <!--，登记信息，工作人员填写《讲解预约记录本》，内容包括：来电单位、预约人、联系人电话、参观人数、参观时间、是否讲解。如需提供发票，也请一并说明。</p>-->
      <!--<div class="img"><img :src="imgs.img1"/></div>-->
      <!--<p>2.工作人员填写派遣单</p>-->
      <!--<div class="img"><img :src="imgs.img2"/></div>-->
      <!--<p>3.到馆参观时，讲解员携派遣单和发票（如有要求）在A馆序厅等候。参观结束后由领队在派遣单上签字确认。</p>-->
      <!--<h2>二、现场预约讲解</h2>-->
      <!--<p>拨打唐山博物馆宣教部电话 <span>0315-5772269</span> 联系讲解员，在A馆序厅等候（约15分钟）。如需发票，请在讲解结束后随讲解员到办公区开具。</p>-->
      <!--</div>-->
    </background>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        explain: '',
        // imgs: {
        //   img1: this.config.aliyun + 'ts-static/pc/img-explain1.png',
        //   img2: this.config.aliyun + 'ts-static/pc/img-explain2.png'
        // }
      };
    },
    mounted() {
      this.utils.ajax(this, 'api/aboutUs').then(res => {
        this.explain = res.explain;
      });
    }
  };
</script>

<style lang="scss" scoped>
  .explain {
    .title {
      h3 {
        background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
        background-size: 13px 28px;
      }
    }

    .rich-text {
      margin-bottom: 50px;
      font-size: 16px;
      color: #666666;

      /deep/ img {
        display: block;
        max-width: calc(100% - 66px);
        margin: 0 auto;
      }
    }

    /*.cont {*/
    /*margin-bottom: 50px;*/

    /*h2 {*/
    /*background-image: url("../assets/icon-arrows-default.png");*/
    /*background-size: 10px 14px;*/
    /*background-repeat: no-repeat;*/
    /*background-position: left center;*/
    /*padding-left: 33px;*/
    /*margin-top: 41px;*/
    /*margin-bottom: 10px;*/
    /*font-size: 16px;*/
    /*font-weight: normal;*/
    /*color: #c88e45;*/
    /*}*/

    /*p {*/
    /*margin-left: 33px;*/
    /*font-size: 16px;*/
    /*color: #666666;*/

    /*span {*/
    /*color: #29ac83;*/
    /*}*/
    /*}*/

    /*.img {*/
    /*margin: 25px 33px 39px 33px;*/
    /*box-shadow: 0 1px 4px 0 rgba(166, 166, 166, 0.75);*/
    /*box-sizing: border-box;*/
    /*}*/
    /*}*/
  }
</style>
