<template>
  <!--常设展览页-->
  <div class="exhibit-standing page">
    <background type="border">
      <crumb to="/exhibition" to_title="陈列展览"/>
      <div class="title"><h3>冀东三枝花</h3></div>
      <div class="minit-title">《冀东三枝花》陈列由《唐山皮影》、《评剧百年》、《乐亭大鼓》三部分组成。</div>
      <!--冀东三枝花-->
      <div class="three-box">
        <div class="three-item">
          <div class="img" :style="'background-image: url('+imgs.img1+')'">
            <div class="standing-mask">
              <p>展览地点：唐山博物馆A馆东半区</p>
              <div class="btn" @click="to_detail(1)">查看详情</div>
            </div>
          </div>
          <div class="three-cont" :style="'background-image: url('+imgs.bg_img1+')'">
            <h3>唐山皮影</h3>
            <p>
              皮影是一种集民间美术、音乐、舞蹈、说唱为一体的傀儡戏剧表演艺术。全国很多地区都有分布，并且各具特色，异彩纷呈。唐山皮影是其中影响较大的一支。著名戏剧史学家周贻白先生曾经这样评价唐山皮影：“因为熟在人口的关系，几乎成为一般影戏的代称。”足见其在中国皮影戏中的影响和地位。唐山皮影也被称为“乐亭影”、“滦州影”、“驴皮影”等，与评剧、乐亭大鼓并称为“冀东文艺三枝花”。2006年被列入国家非物质文化遗产。有道是：</p>
            <p>滦河水 越千秋</p>
            <p>驴皮影伴它岁岁流</p>
            <p>五尺影窗唱千古</p>
            <p>唱的名声贯九州</p>
          </div>
        </div>
        <div class="three-item">
          <div class="three-cont" :style="'background-image: url('+imgs.bg_img2+')'">
            <h3>评剧百年</h3>
            <p>
              评剧是我国戏曲百花园中一朵靓丽的奇葩。她根系唐山这片沃土，从梆子、皮影、大鼓、秧歌等异彩纷呈的民间艺术中汲取营养、萌芽和发展。她从莲花落的音韵中流转至今，历经风雨百年。她以淳朴的声腔、悠扬的管弦演绎人生百态；她以动听的旋律、曲折的故事述说世间悲欢。</p>
            <p>《评剧百年》，追溯评剧历史；</p>
            <p>《评剧百年》，关注评剧传承；</p>
            <p>《评剧百年》，祝福评剧辉煌！</p>
          </div>
          <div class="img" :style="'background-image: url('+imgs.img2+')'">
            <div class="standing-mask">
              <p>展览地点：唐山博物馆A馆内西部偏南</p>
              <div class="btn" @click="to_detail(2)">查看详情</div>
            </div>
          </div>
        </div>
        <div class="three-item">
          <div class="img" :style="'background-image: url('+imgs.img3+')'">
            <div class="standing-mask">
              <p>展览地点：唐山博物馆</p>
              <div class="btn" @click="to_detail(3)">查看详情</div>
            </div>
          </div>
          <div class="three-cont" :style="'background-image: url('+imgs.bg_img3+')'">
            <h3>乐亭大鼓</h3>
            <p>
              乐亭大鼓原名“乐亭腔”，也叫“乐亭调”，是中国北方的一个主要曲种，因产生于河北省乐亭县而得名。对此，傅惜华在《曲艺论丛》中有如下记载:“乐亭大鼓简称乐亭调，为北方俗曲鼓词之一种，产生于乐亭县，故名。”乐亭大鼓以唱词典雅，演唱规范，曲牌丰富，腔调优美，板式灵活，表演细腻著称曲坛。由于它具有较高的艺术价值，特色鲜明，流传广泛，影响较大，2006年被列入首批国家非物质文化遗产名录，成为重点保护对象。</p>
          </div>
        </div>
      </div>

      <!--唐山历史-->
      <div class="history" :style="'background-image: url('+imgs.bg_history+')'">
        <div class="history-mask">
          <div class="title"><h3>唐山历史</h3></div>
          <p>历史静下来。</p>
          <p>时间在这里凝固。</p>
          <p>让我们的目光穿越古老的时空，从石器的打磨痕迹，陶罐的简朴纹饰，青铜的斑斑锈蚀中，追溯和感悟先民们曾经拥有怎样美丽的怀想，书写出岁月的华彩篇章。</p>
          <p>《唐山历史文化陈列》仿佛一部徐徐展开的立体史书——它以13472平方公里的土地为背景，山地、平原、大海铺展开辽阔的地理版图；它以4万年的悠长岁月为主题，古代、近代、当代记录下遥远的日落日出。</p>
          <p>认识自己，就从认识我们脚下的土地开始；</p>
          <p>认识未来，就从认识我们的历史开始……</p>
          <span>展览地点：唐山博物馆B馆一、二层</span>
          <div class="btn" @click="to_detail(4)">查看详情</div>
        </div>
      </div>

      <!--馆藏艺术品-->
      <div class="art">
        <div class="title"><h3>馆藏艺术品</h3></div>
        <div class="minit-title">《馆藏艺术品》陈列共分为《潘绍棠捐赠雕塑作品陈列》、《凌寒轩珍藏书画选》、《李远、陈大远先生书画作品》以及国内知名书画家捐赠的作品四部分组成。</div>

        <ul>
          <li :style="'background-image: url('+imgs.bg_art1+')'">
            <div class="li-mask">
              <div class="mask-item">
                <p>展品均为著名雕塑家、广州美术学院教授潘绍棠先生创作的雕塑、绘画等。</p>
                <h3>第一部分<b></b> 《潘绍棠捐赠雕塑作品陈列》</h3>
              </div>
              <div class="btn" @click="to_detail(5)">查看详情</div>
            </div>
          </li>
          <li :style="'background-image: url('+imgs.bg_art2+')'">
            <div class="li-mask">
              <div class="mask-item">
                <p>此部分展出新华社记者、高级编辑贾靖宏先生捐赠的中国当代知名书画家作品。</p>
                <h3>第二部分<b></b> 《凌寒轩珍藏书画选》</h3>
              </div>
              <div class="btn" @click="to_detail(5)">查看详情</div>
            </div>
          </li>
          <li :style="'background-image: url('+imgs.bg_art3+')'">
            <div class="li-mask">
              <div class="mask-item">
                <p>由唐山书画院前院长李远先生绘画，著名书法家、作家陈大远先生撰写诗词，是诗、书、画的完美组合。</p>
                <h3>第三部分<b></b> 《李远、陈大远先生书画作品》</h3>
              </div>
              <div class="btn" @click="to_detail(5)">查看详情</div>
            </div>
          </li>
          <li :style="'background-image: url('+imgs.bg_art4+')'">
            <div class="li-mask">
              <div class="mask-item">
                <p>如杨再春、唐勇力、陶然、祁海峰等。</p>
                <h3>第四部分 <b></b> 国内知名书画家捐赠的作品</h3>
              </div>
              <div class="btn" @click="to_detail(5)">查看详情</div>
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
        imgs: {
          img1: this.config.aliyun + 'ts-static/pc/standing/tspy.png',
          img2: this.config.aliyun + 'ts-static/pc/standing/pjbn.png',
          img3: this.config.aliyun + 'ts-static/pc/standing/ytdg.png',
          bg_img1: this.config.aliyun + 'ts-static/pc/standing/bg-tspy.png',
          bg_img2: this.config.aliyun + 'ts-static/pc/standing/bg-pjbn.png',
          bg_img3: this.config.aliyun + 'ts-static/pc/standing/bg-ytdg.png',
          bg_history: this.config.aliyun + 'ts-static/pc/standing/bg-tsls.png',
          bg_art1: this.config.aliyun + 'ts-static/pc/standing/gcysp1.png',
          bg_art2: this.config.aliyun + 'ts-static/pc/standing/gcysp2.png',
          bg_art3: this.config.aliyun + 'ts-static/pc/standing/gcysp3.png',
          bg_art4: this.config.aliyun + 'ts-static/pc/standing/gcysp4.png',
        }
      };
    },
    methods: {
      to_detail(id) {
        this.$router.push({ name: 'detail_exhibit', query: { id: id, from_type: 3 } });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .exhibit-standing {
    .minit-title {
      text-align: center;
      font-size: 16px;
      color: #666666;
      margin: 38px auto 63px;
    }

    .three-box {
      display: flex;
      justify-content: space-between;
      height: 672px;

      .three-item {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        width: 33.3333333%;
        height: 100%;

        .img {
          height: 250px;
          flex-shrink: 0;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;

          .standing-mask {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            opacity: 0;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            transition: all 1s;

            p {
              color: #c88e45;
              font-size: 16px;
            }

            .btn {
              cursor: pointer;
              margin-top: 24px;
              width: 200px;
              height: 60px;
              background-image: url("../assets/bg-btn-detail.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center;
              text-align: center;
              line-height: 60px;
              color: #ffffff;
              font-size: 16px;
            }
          }

          &:hover {
            .standing-mask {
              opacity: 1;
              transition: all 1s;
            }
          }
        }

        .three-cont {
          flex-grow: 1;
          background-repeat: no-repeat;
          background-position: top;
          background-size: 100% 100%;
          padding: 0 18px;
          box-sizing: border-box;
          display: flex;
          flex-flow: column;
          align-items: center;

          h3 {
            font-size: 24px;
            color: #ffffff;
            padding: 0 30px;
            box-sizing: border-box;
            background-image: url("../assets/icon-left-bor.png"), url("../assets/icon-right-bor.png");
            background-position: left, right;
            background-repeat: no-repeat;
            background-size: 11px 24px;
            margin: 39px 0 29px;
          }

          p {
            text-align: justify;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }

    .history {
      width: 1128px;
      height: 752px;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-top: 60px;

      .history-mask {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        padding: 0 40px;

        p {
          font-size: 16px;
          color: #666666;
          line-height: 32px;
          text-align: center;
        }

        span {
          display: block;
          margin: 65px 0 60px;
          font-size: 16px;
          color: #c88e45;
        }

        .btn {
          width: 200px;
          height: 60px;
          background-image: url("../assets/bg-home-btn.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 60px;
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }

    .art {
      margin-top: 90px;
      margin-bottom: 30px;

      .minit-title {
        margin-left: 44px;
        margin-right: 44px;
      }

      ul {
        display: flex;
        justify-content: space-between;

        li {
          width: calc(25% - 4px);
          height: 600px;
          background-size: 100%;
          background-repeat: no-repeat;

          .li-mask {
            background-color: rgba(207, 144, 58, 0.8);
            height: 100%;
            color: #ffffff;
            overflow: hidden;
            display: flex;
            flex-flow: column;
            align-items: center;
            padding: 60px 0 40px;
            width: 60px;
            transition: 1s;

            .mask-item {
              width: 100%;
              display: flex;
              flex-grow: 1;
              justify-content: center;
              height: 380px;
              overflow: hidden;

              p {
                font-size: 14px;
                writing-mode: vertical-rl;
                opacity: 0;
                width: 0;
                transition: 1s;
              }

              h3 {
                display: flex;
                align-items: center;
                writing-mode: vertical-rl;
                font-size: 20px;
                font-weight: normal;

                b {
                  height: 20px;
                  display: inline-block;
                }
              }
            }

            .btn {
              opacity: 0;
              transition: 2s;
              flex-shrink: 0;
              width: 200px;
              height: 60px;
              margin-top: 50px;
              background-image: url("../assets/bg-btn-detail.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }
          }

          &:hover {
            .li-mask {
              width: 100%;

              .mask-item {

                p {
                  margin-right: 40px;
                  opacity: 1;
                }
              }

              .btn {
                opacity: 1;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
