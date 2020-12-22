<template>
  <!--出版书籍列表页-->
  <div class="books page">
    <background type="border">
      <crumb to_title="学术研究" to="/academic"></crumb>
      <div class="books-list">
        <div class="book" v-for="(item,index) in books" :key="'books'+index">
          <div class="img" :style="'background-image: url('+item.pic+')'"></div>
          <h3>{{item.title}}</h3>
          <p>{{item.author}}</p>
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
        books: [],//出版书籍列表

        page: 1,
        perpage: 8,
        count: 0,
      }
    },
    mounted() {
      this.getStudyBookList();
    },
    methods: {

      click_page(page) {
        this.page = page;
        this.getStudyBookList();
      },

      // 获取出版书籍列表
      getStudyBookList() {
        let post = { page: this.page, perpage: this.perpage };
        this.utils.ajax(this, 'study/studyBookList', post).then(res => {
          this.utils.aliyun_format(res.list);
          this.books = res.list;
          this.count = res.count;
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .books {
    .books-list {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 60px;

      .book {
        width: calc(25% - 18px);
        margin-right: 24px;
        margin-bottom: 40px;
        cursor: pointer;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .img {
          transition: 0.5s;
          height: 374px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        h3 {
          color: #333333;
          font-size: 18px;
          font-weight: normal;
          text-align: center;
          margin-top: 20px;
        }

        p {
          margin-top: 8px;
          text-align: center;
          font-size: 14px;
          color: #666666;
        }

        &:hover {
          .img {
            box-shadow: 0 8px 10px #a6a6a6;
          }
        }
      }
    }
  }
</style>
