<template>
  <!--学术研究-->
  <div class="academic page">
    <background>
      <crumb/>
      <div class="title"><h3>学术资讯</h3></div>

      <div class="article">
        <p v-for="(item,index) in article" :key="'article'+index" @click="to_study_article_detail(item.id)">
          <span>{{item.title}}</span><span>{{item.create_time}}</span></p>
      </div>
      <div class="more">
        <router-link to="/study_article">查看更多</router-link>
      </div>

      <div class="title"><h3>出版书籍</h3></div>
      <div class="books">
        <div class="book" v-for="(item,index) in books" :key="'books'+index">
          <div class="img" :style="'background-image: url('+item.pic+')'"></div>
          <h3>{{item.title}}</h3>
          <p>{{item.author}}</p>
        </div>
      </div>
      <div class="more">
        <router-link to="/books">查看更多</router-link>
      </div>
      <div class="title"><h3>学术委员会</h3></div>
      <div class="study-council">
        <div class="new-study">
          <div class="bg-study-img" :style="'background-image: url('+imgs[3]+')'"></div>
          <div class="cont">
            <p>唐山博物馆学术委员会是唐山博物馆为实现学术发展宗旨而设立的专业性学术仁导机构。</p>
            <p>学术委员会由馆内在职高级职称职工及外聘馆外高水平专家、学者组成，</p>
            <p>具体负责学会学术科研发展规划、工作计划的组织实施；学术科研活动的组织、指导、咨询和监督；</p>
            <p>教育科学研究成果的鉴定、评审、推广普及工作。</p>
            <router-link tag="div" to="/committee" class="btn-more">查看更多</router-link>
          </div>
          <div class="bg-study-img" :style="'background-image: url('+imgs[4]+')'"></div>
        </div>
        <!--<ul>-->
        <!--<li @click="to_committee(1)" :style="'background-image: url('+imgs[0]+')'">-->
        <!--<div class="council"><h3>唐山博物馆学术委员会章程</h3></div>-->
        <!--</li>-->
        <!--<li @click="to_committee(2)" :style="'background-image: url('+imgs[1]+')'">-->
        <!--<div class="council"><h3>唐山博物馆学术委员会工作规程</h3></div>-->
        <!--</li>-->
        <!--<li @click="to_committee(3)" :style="'background-image: url('+imgs[2]+')'">-->
        <!--<div class="council"><h3>唐山博物馆学术委员会成员名录</h3></div>-->
        <!--</li>-->
        <!--</ul>-->
      </div>

    </background>
  </div>
</template>

<script>
  export default {
    name: "Academic",
    data() {
      return {
        imgs: [
          this.config.aliyun + 'ts-static/pc/img-study1.png',
          this.config.aliyun + 'ts-static/pc/img-study2.png',
          this.config.aliyun + 'ts-static/pc/img-study3.png',
          this.config.aliyun + 'ts-static/pc/img-study4.png',
          this.config.aliyun + 'ts-static/pc/img-study5.png'
        ],//学术委员会图片数组

        article: [],//学术资讯列表
        books: [],//出版书籍列表
      }
    },
    mounted() {
      this.getStudyArticleList();
      this.getStudyBookList();
    },
    methods: {
      // 点击前往详情
      to_study_article_detail(id) {
        this.$router.push({ name: 'detail_study_article', query: { id: id, from_type: 1 } })
      },

      // // 点击跳转学术委员会
      // to_committee(num) {
      //   this.$router.push({ name: 'committee', query: { id: num } });
      // },

      // 获取学术资讯列表
      getStudyArticleList() {
        this.utils.ajax(this, 'study/studyArticleList', { page: 1, perpage: 5 }).then(res => {
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].create_time = res.list[i].create_time.split(' ')[0];
          }
          this.article = res.list;
        });
      },

      // 获取出版书籍列表
      getStudyBookList() {
        this.utils.ajax(this, 'study/studyBookList', { page: 1, perpage: 4 }).then(res => {
          this.utils.aliyun_format(res.list);
          this.books = res.list;
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .academic {
    .more {
      margin: 46px 0 80px;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        display: block;
        width: 200px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        color: #666666;
        background-image: url('../assets/bg-btn-more.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;

        &:hover {
          color: #cf903a;
        }
      }
    }

    .article {
      margin-top: 40px;

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

    .books {
      display: flex;
      margin-bottom: 60px;

      .book {
        width: calc(25% - 18px);
        margin-right: 24px;

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

    .study-council {
      margin-bottom: 50px;

      .new-study {
        height: 321px;
        background-color: rgb(240, 240, 232);
        display: flex;
        justify-content: space-between;

        .bg-study-img {
          width: 188px;
          height: 100%;
          flex-shrink: 0;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: bottom;
        }

        .cont {
          flex-grow: 1;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;

          p {
            text-align: center;
            font-size: 16px;
            line-height: 35px;
          }

          .btn-more {
            width: 176px;
            height: 54px;
            background-image: url("../assets/bg-home-btn.png");
            background-size: 100%;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            margin-top: 30px;
            line-height: 54px;
            cursor: pointer;
            user-select: none;
          }
        }
      }

      /*ul {*/
      /*display: flex;*/
      /*justify-content: space-between;*/

      /*li {*/
      /*width: 368px;*/
      /*height: 560px;*/
      /*background-size: 100%;*/
      /*background-position: center;*/
      /*background-repeat: no-repeat;*/
      /*cursor: pointer;*/

      /*.council {*/
      /*width: 100px;*/
      /*height: 100%;*/
      /*background-color: rgba(207, 144, 58, 0.9);*/
      /*display: flex;*/
      /*justify-content: center;*/

      /*h3 {*/
      /*margin-top: 40px;*/
      /*font-size: 24px;*/
      /*color: #ffffff;*/
      /*font-weight: normal;*/
      /*writing-mode: vertical-lr;*/
      /*}*/
      /*}*/
      /*}*/
      /*}*/
    }
  }
</style>
