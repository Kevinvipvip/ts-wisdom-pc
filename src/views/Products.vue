<template>
  <div class="products page">
    <background :bg_img="bg_img">
      <crumb/>
      <ul>
        <li>
          <div class="li-item">
            <div class="img" :style="'background-image: url('+imgs[0]+')'">
              <div class="border"></div>
            </div>
          </div>
          <div class="li-item">
            <div class="li-cont">
              <div class="title"><h3>吉祥物中性笔</h3></div>
              <div class="attr">
                <p><span>尺寸</span><span>170毫米</span></p>
                <p><span>材质</span><span>软胶+中性笔</span></p>
              </div>
              <div class="desc">
                <p>灵感</p>
                <p>以唐山博物馆吉祥物元素为设计灵感</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="li-item">
            <div class="li-cont">
              <div class="title"><h3>皮影书签</h3></div>
              <div class="attr">
                <p><span>尺寸</span><span>约130*35*0.5毫米</span></p>
                <p><span>材质</span><span>铜</span></p>
              </div>
              <div class="desc">
                <p>灵感</p>
                <p>以唐山博物馆皮影头茬元素为设计灵感</p>
              </div>
            </div>
          </div>
          <div class="li-item">
            <div class="img" :style="'background-image: url('+imgs[1]+')'">
              <div class="border"></div>
            </div>
          </div>
        </li>
        <li>
          <div class="li-item">
            <div class="img" :style="'background-image: url('+imgs[2]+')'">
              <div class="border"></div>
            </div>
          </div>
          <div class="li-item">
            <div class="li-cont">
              <div class="title"><h3>吉祥物书签</h3></div>
              <div class="attr">
                <p><span>尺寸</span><span>约45*55*0.5毫米</span></p>
                <p><span>材质</span><span>铜</span></p>
              </div>
              <div class="desc">
                <p>灵感</p>
                <p>以唐山博物馆吉祥物元素为设计灵感</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="li-item">
            <div class="li-cont">
              <div class="title"><h3>皮影橡皮擦</h3></div>
              <div class="attr">
                <p><span>尺寸</span><span>约50*55*8毫米</span></p>
                <p><span>材质</span><span>软胶PVC</span></p>
              </div>
              <div class="desc">
                <p>灵感</p>
                <p>以唐山博物馆吉祥物元素为设计灵感</p>
              </div>
            </div>
          </div>
          <div class="li-item">
            <div class="img" :style="'background-image: url('+imgs[3]+')'">
              <div class="border"></div>
            </div>
          </div>
        </li>
        <li>
          <div class="li-item">
            <div class="img" :style="'background-image: url('+imgs[4]+')'">
              <div class="border"></div>
            </div>
          </div>
          <div class="li-item">
            <div class="li-cont">
              <div class="title"><h3>皮影钥匙扣</h3></div>
              <div class="attr">
                <p><span>尺寸</span><span>约40*40*2毫米</span></p>
                <p><span>材质</span><span>合金</span></p>
              </div>
              <div class="desc">
                <p>灵感</p>
                <p>以唐山博物馆馆藏皮影头茬元素为设计灵感</p>
              </div>
            </div>
          </div>
        </li>
        <li class="last">
          <div class="li-item">
            <div class="li-cont">
              <div class="title"><h3>自由自在丝巾</h3></div>
              <div class="attr">
                <p><span>尺寸</span><span>180*44厘米</span></p>
                <p><span>材质</span><span>真丝</span></p>
                <p class="desc"><span>灵感</span><span>源自吴作人先生的书画作品《自由自在》</span></p>
              </div>
            </div>
          </div>
          <div class="li-item">
            <div class="img" :style="'background-image: url('+imgs[5]+')'">
              <div class="border"></div>
            </div>
          </div>
        </li>
      </ul>
    </background>
  </div>
</template>

<script>
  export default {
    name: "Products",
    data() {
      return {
        bg_img: this.config.aliyun + 'ts-static/pc/bg-product.jpg',
        imgs: [
          this.config.aliyun + 'ts-static/pc/product/img-product1.png',
          this.config.aliyun + 'ts-static/pc/product/img-product2.png',
          this.config.aliyun + 'ts-static/pc/product/img-product3.png',
          this.config.aliyun + 'ts-static/pc/product/img-product4.png',
          this.config.aliyun + 'ts-static/pc/product/img-product5.png',
          this.config.aliyun + 'ts-static/pc/product/img-product6.png'
        ],//文创赏析图片数组
      }
    }
  }
</script>

<style scoped lang="scss">
  .products {
    ul {
      li {
        display: flex;
        margin-bottom: 64px;

        .li-item {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          .img {
            width: 482px;
            height: 321px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            position: relative;

            .border {
              position: relative;
              z-index: 3;
              width: 100%;
              height: 100%;
              background-image: url("../assets/border1-left.png");
              background-position: bottom;
              background-size: 100%;
              background-repeat: no-repeat;
            }
          }

          .li-cont {
            .title {
              h3 {
                font-size: 40px;
                color: #cf903a;
              }
            }

            p {
              font-size: 18px;
              color: #333333;
              text-align: center;
              line-height: 40px;
            }

            .attr {
              margin-top: 70px;
              border-left: 1px solid #d7a35d;
              border-right: 1px solid #d7a35d;
              display: flex;

              p {
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 85px;
                border-left: 1px solid #d7a35d;

                &:first-child {
                  border: none;
                }

                span {
                  display: block;
                }
              }
            }

            .desc {
              padding-top: 25px;
              border-left: 1px solid #d7a35d;
              border-right: 1px solid #d7a35d;
            }
          }
        }

        &:nth-child(2n) {
          .li-item {
            .img {
              .border {
                background-image: url("../assets/border1-right.png");
              }
            }
          }
        }

        &.last {
          flex-flow: column;

          .li-item {
            width: 100%;

            .attr {
              .desc {
                width: 400px;
                padding: 0;
              }
            }

            .img {
              margin-top: 40px;
              width: 100%;
              height: 283px;

              .border {
                padding-bottom: 10px;
                background-image: url("../assets/border1-bottom.png");
              }
            }
          }
        }
      }
    }
  }
</style>
