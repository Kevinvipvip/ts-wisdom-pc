<template>
  <div class="friend-link page">

    <background :bg_num="2">
      <crumb/>
      <div class="title"><h3>友情链接</h3></div>
      <ul>
        <li v-for="(item,index) in friend" :key="'friend'+index">
          <a :href="item.url" target="_blank">
            <div class="img"><img :src="item.pic"/></div>
            <p>{{item.title}}</p>
          </a>
        </li>
      </ul>
    </background>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        friend: [
          { title: '河北文明网', pic: this.config.aliyun + 'ts-static/pc/friend/img1.png', url: 'http://hb.wenming.cn' },
          { title: '河北志愿服务网', pic: this.config.aliyun + 'ts-static/pc/friend/img2.png', url: 'http://www.hbzyfw.cn' },
          {
            title: '河北博物院',
            pic: this.config.aliyun + 'ts-static/pc/friend/img3.png',
            url: 'http://www.hebeimuseum.org.cn'
          }, {
            title: '首都博物馆',
            pic: this.config.aliyun + 'ts-static/pc/friend/img4.png',
            url: 'http://www.capitalmuseum.org.cn'
          }, {
            title: '上海博物馆',
            pic: this.config.aliyun + 'ts-static/pc/friend/img5.png',
            url: 'https://www.shanghaimuseum.net'
          }, {
            title: '南京博物院',
            pic: this.config.aliyun + 'ts-static/pc/friend/img6.png',
            url: 'http://www.njmuseum.com'
          },
          { title: '故宫博物院', pic: this.config.aliyun + 'ts-static/pc/friend/img7.png', url: 'https://www.dpm.org.cn' },
          { title: '安徽博物院', pic: this.config.aliyun + 'ts-static/pc/friend/img8.png', url: 'https://www.ahm.cn' },
          { title: '广东省博物馆', pic: this.config.aliyun + 'ts-static/pc/friend/img9.png', url: 'http://www.gdmuseum.com' },
          {
            title: '湖南省博物馆',
            pic: this.config.aliyun + 'ts-static/pc/friend/img10.png',
            url: 'http://www.hnmuseum.com'
          },
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  .friend-link {
    ul {
      width: 900px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      li {
        margin: 30px 15px;

        a {
          display: block;
          width: 100%;
          height: 100%;

          .img {
            width: 192px;
            height: 100px;
            background-color: #ffffff;
            border: solid 1px #d6d6d6;
            overflow: hidden;

            img {
              transition: 0.5s;
            }
          }

          p {
            font-size: 16px;
            color: #666666;
            text-align: center;
            line-height: 24px;
            margin-top: 10px;
          }

          &:hover {
            .img {
              img {
                transform: scale(1.1);
              }
            }

            p {
              color: #cf903a;
            }
          }
        }
      }
    }
  }
</style>
