<template>
  <!--学术资讯-->
  <div class="academic-article page">
    <background type="border">
      <crumb to_title="学术研究" to="/academic"></crumb>

      <div class="article">
        <p v-for="(item,index) in article" :key="'article'+index" @click="to_study_article_detail(item.id)">
          <span>{{item.title}}</span><span>{{item.create_time}}</span></p>
      </div>
      <div class="my-page" v-if="count>perpage">
        <Page :total="count" :page-size="perpage" @on-change="click_page"/>
      </div>

    </background>
  </div>
</template>

<script>
  export default {
    name: "Academic",
    data() {
      return {
        article: [],//学术资讯列表

        page: 1,
        perpage: 10,
        count: 0,
      }
    },
    mounted() {
      this.getStudyArticleList();
    },
    methods: {
      click_page(page) {
        this.page = page;
        this.getStudyArticleList();
      },

      // 点击前往详情
      to_study_article_detail(id) {
        this.$router.push({ name: 'detail_study_article', query: { id: id, from_type: 2 } })
      },

      // 获取学术资讯列表
      getStudyArticleList() {
        let post = { page: this.page, perpage: this.perpage };
        this.utils.ajax(this, 'study/studyArticleList', post).then(res => {
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].create_time = res.list[i].create_time.split(' ')[0];
          }
          this.article = res.list;
          this.count = res.count;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .academic-article {
    .article {
      margin-top: 25px;

      p {
        font-size: 16px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid rgba(207, 144, 58, 0.6);
        padding-left: 20px;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;

        &:before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          width: 10px;
          height: 10px;
          border: solid 1px #cf903a;
          border-radius: 50%;
        }

        &:hover {
          color: #cf903a;
        }
      }
    }
  }
</style>
