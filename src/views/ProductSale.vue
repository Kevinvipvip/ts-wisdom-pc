<template>
  <div class="product-sale page">
    <background>
      <crumb/>

      <div class="title"><h3>文创销售</h3></div>

      <div class="tab">
        <div class="tab-item" :class="tab===0?'active':''" @click="tab_click(0)">全部产品</div>
        <div class="tab-item" :class="tab===1?'active':''" @click="tab_click(1)">皮影系列</div>
        <div class="tab-item" :class="tab===2?'active':''" @click="tab_click(2)">文物系列</div>
        <div class="tab-item" :class="tab===3?'active':''" @click="tab_click(3)">临展系列</div>
      </div>
      <ul>
        <li v-for="(item,index) in sale_list" :key="'sale-list'+index" @click="to_product_detail(item.id)">
          <div class="img-box">
            <div class="img" :style="'background-image: url('+item.pic+')'"></div>
          </div>
          <div class="item-cont">
            <h3 class="one-line-ellipsis">{{item.name}}{{item.name}}{{item.name}}</h3>
            <p>{{item.price}}</p>
          </div>
        </li>
      </ul>
      <div class="nodata" v-if="sale_list.length===0"><span>此系列暂无产品</span></div>
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
        tab: 0,

        page: 1,
        perpage: 12,
        count: 0,

        sale_list: []
      };
    },
    mounted() {
      this.getProductList();
    },
    methods: {
      // 切换分类
      tab_click(num) {
        this.tab = num;
        this.page = 1;
        this.getProductList();
      },

      // 点击切换分页
      click_page(page) {
        this.page = page;
        this.getProductList();
      },

      // 点击前往产品详情
      to_product_detail(id) {
        this.$router.push({ name: 'detail_product', query: { id: id } });
      },
      // 获取产品列表
      getProductList() {
        let post = { cate_id: this.tab, page: this.page, perpage: this.perpage };
        this.utils.ajax(this, 'product/productList', post).then(res => {
          this.utils.aliyun_format(res.list);
          this.count = res.count;
          this.sale_list = res.list;
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .product-sale {
    .tab {
      display: flex;
      align-items: center;
      justify-content: center;

      .tab-item {
        padding: 0 37px;
        margin: 0 20px;
        cursor: pointer;
        background-image: url("../assets/icon-tab-left-default.png"), url("../assets/icon-tab-right-default.png");
        background-repeat: no-repeat;
        background-position: left, right;
        background-size: 9px 18px;
        font-size: 16px;
        color: #666666;

        &:hover, &.active {
          color: #c88e45;
          background-image: url("../assets/icon-tab-left.png"), url("../assets/icon-tab-right.png");
        }
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;

      li {
        width: calc(25% - 18px);
        margin-top: 24px;
        margin-right: 24px;
        background-color: #ffffff;
        border: solid 1px #cccccc;
        cursor: pointer;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .img-box {
          width: 264px;
          height: 264px;
          overflow: hidden;

          .img {
            height: 100%;
            width: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: 0.5s;
          }
        }

        .item-cont {
          margin: 20px;
          text-align: justify;

          h3 {
            font-weight: normal;
            color: #333333;
            margin-bottom: 10px;
            font-size: 20px;
          }

          p {
            font-size: 20px;
            color: #d39f56;
            padding-left: 30px;
            background-image: url("../assets/icon-money.png");
            background-repeat: no-repeat;
            background-position: left;
            background-size: 20px 15px;
          }
        }

        &:hover {
          .img-box {
            .img {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
</style>
