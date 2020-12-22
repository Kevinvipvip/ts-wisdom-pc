<template>
  <div class="service page">
    <background>
      <crumb/>
      <div class="ticket" ref="ticket">
        <div class="item wide bg_color1">
          <div class="title new-title"><h3>参观须知</h3></div>
          <p class="m-bottom">{{notice}}</p>
        </div>
        <div class="item code-box">
          <div class="title m-20"><h3>参观预约</h3></div>
          <p>开放时间</p>
          <p>周二至周日 <span>9：00开馆 — 16:30停止入馆 — 17：00闭馆</span></p>
          <p>周一闭馆（法定节假日除外）</p>
          <div class="code"><img :src="code"/></div>
          <p class="tip">微信扫二维码即可预约</p>
        </div>
        <div class="item bg_color2 wide explain">
          <div class="title new-title"><h3>讲解预约</h3></div>
          <p>一、电话预约讲解</p>
          <p class="m-98">二、现场预约讲解</p>
        </div>
        <div class="item bg_color1 tel-box">
          <div class="tel">0315-5772269</div>
          <router-link tag="div" to="/explain" class="btn-more">查看更多</router-link>
        </div>
      </div>
      <div class="title" v-if="active.length"><h3>活动预约</h3></div>
      <div class="active" v-if="active.length">
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
      <!--<div class="active" v-if="active.length">-->
        <!--<div class="item" v-for="(item,index) in active" :key="'active'+index" @click="to_active_detail(item.id)">-->
          <!--<div class="img" :style="'background-image: url('+item.pic+')'"></div>-->
          <!--<div class="item-cont">-->
            <!--<h3 class="two-line-ellipsis">{{item.title}}</h3>-->
            <!--<p class="one-line-ellipsis">活动时间：{{item.start_time}}</p>-->
            <!--<p class="hove-right-tip one-line-ellipsis">活动地点：{{item.address}}</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="item" v-if="active.length === 2" style="border: none;background: unset"></div>-->
      <!--</div>-->
      <div class="more">
        <router-link to="/active">查看更多</router-link>
      </div>
      <div class="title" ref="traffic"><h3>交通指南</h3></div>
      <div class="traffic">
        <div class="map">
          <div class="border-map top"></div>
          <div class="border-map bottom"></div>
          <baidu-map class="baidu-map" :zoom="18" :scroll-wheel-zoom="true" :center="location"
                     @ready="map_init"></baidu-map>
        </div>
        <div class="cont">
          <p>唐山博物馆坐落在美丽的凤凰山公园内，东临龙泽路，北临北新道。</p>
          <p>公交线路有5路、15路、16路、27路、37路、77路可达，站点名称：唐山博物馆。</p>
          <p>2020年唐山建成纵贯整个城市的超级绿道，途经唐山博物馆。唐山博物馆设有免费停车场供观众使用。</p>
          <p> 地址：唐山市路北区龙泽南路22号</p>
        </div>
      </div>
    </background>
  </div>
</template>

<script>
  import icon_address from '../assets/icon-map.png'

  export default {
    data() {
      return {
        notice: '',//参观须知
        code: this.config.aliyun + 'ts-static/pc/code-ticket.png',//门票预约的手机网页二维码

        active: [],//活动预约列表

        // 百度地图经纬度坐标
        location: { lng: 118.198793, lat: 39.637367 }
      };
    },
    beforeRouteUpdate(to, from, next) {
      this.my_load(parseInt(to.query.id));
      next();
    },

    mounted() {
      this.my_load(parseInt(this.$route.query.id || 0));
      this.notice = this.config.notice;
      this.getActivityList();
    },
    methods: {
      my_load(index) {
        this.$nextTick(() => {
          // console.log(this.$refs)
          switch (index) {
            case 1:
              window.scrollTo({
                top: this.$refs.ticket.offsetTop,
                behavior: "smooth"
              });
              break;
            case 2:
              window.scrollTo({
                top: this.$refs.traffic.offsetTop,
                behavior: "smooth"
              });
              break;
          }
        });
      },

      // 点击前往活动预约详情
      to_active_detail(id) {
        this.$router.push({ name: 'detail_active', query: { id: id, from_type: 1 } });
      },

      getActivityList() {
        this.utils.ajax(this, 'activity/activityList', { page: 1, perpage: 3 }).then(res => {
          this.utils.aliyun_format(res.list);
          for (let i = 0; i < res.list.length; i++) {
            res.list[i].start_time = this.utils.date_format(res.list[i].start_time, 'yyyy/MM/dd');
          }
          this.active = res.list;
          console.log(res);
        });
      },

      // 地图初始化
      map_init({ BMap, map }) {
        this.$nextTick(() => {
          // 初始化地图,设置中心点坐标
          var point = new BMap.Point(this.location.lng, this.location.lat);
          map.centerAndZoom(point, 18);

          // 添加鼠标滚动缩放
          map.enableScrollWheelZoom();
          // 添加缩略图控件
          // map.addControl(new BMap.OverviewMapControl({ isOpen: false, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));
          // 添加缩放平移控件
          // map.addControl(new BMap.NavigationControl());
          //添加比例尺控件
          // map.addControl(new BMap.ScaleControl());
          //添加地图类型控件
          //map.addControl(new BMap.MapTypeControl());

          //设置标注的图标
          var icon = new BMap.Icon(icon_address, new BMap.Size(32, 43), { anchor: new BMap.Size(16, 43) });
          //设置标注的经纬度
          var marker = new BMap.Marker(new BMap.Point(this.location.lng, this.location.lat), { icon: icon });
          //把标注添加到地图上
          map.addOverlay(marker);
          this.utils.ajax(this, 'api/aboutUs').then(us => {
            var content = "<table>";
            // content = content + "<tr><td> 编号：001</td></tr>";
            content = content + "<tr><td style='text-align: center;line-height: 25px'>" + us.name + "</td></tr>";
            content = content + "<tr><td> 地址：" + us.address + "</td></tr>";
            content = content + "<tr><td style='text-align: center;font-size: 16px;line-height: 40px;'><a style='background: #cf903a;border-radius:5px;color: #ffffff;padding: 5px 10px;' href='http://api.map.baidu.com/marker?location=" + this.location.lat + "," + this.location.lng + "&title=" + us.name + "&content=" + us.address + "&output=html&src=webapp.baidu.openAPIdemo' target='_blank'>到这去</a></td></tr>";
            content += "</table>";
            var infowindow = new BMap.InfoWindow(content);
            // 图标点击的时候显示标注
            marker.addEventListener("click", function () {
              this.openInfoWindow(infowindow);
            });
          });

          // 标注默认显示
          // var infoWindow = new BMap.InfoWindow(content) // 创建信息窗口对象
          // map.openInfoWindow(infoWindow, point)
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .service {
    .ticket {
      margin-top: 40px;
      margin-bottom: 81px;
      display: flex;
      flex-wrap: wrap;

      .new-title {
        justify-content: flex-start;
        margin: 20px 0;

        h3 {
          color: #ffffff;
          background-image: url("../assets/bg-title-white-left.png"), url("../assets/bg-title-white-right.png");
        }
      }

      .item {
        padding: 0 24px;
        box-sizing: border-box;
        background-color: #ffffff;
        flex-grow: 1;

        &.wide {
          flex-shrink: 0;
          width: 622px;
          flex-grow: unset;
        }

        &.bg_color1 {
          background-color: rgb(207, 144, 58);
        }

        &.bg_color2 {
          background-color: rgb(168, 81, 13);
        }

        p {
          white-space: pre-line;
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
          line-height: 32px;

          &.m-bottom {
            margin-bottom: 37px;
          }

          &.m-98 {
            margin-bottom: 98px;
          }
        }

        &.code-box {
          p {
            color: #666666;
            font-size: 16px;
            text-align: center;

            span {
              color: #cf903a;
            }
          }

          .code {
            width: 178px;
            height: 178px;
            margin: 40px auto 0;
          }
        }

        &.explain {
          position: relative;

          &:after {
            content: '';
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            top: 50%;
            right: -10px;
            transform: translateY(-50%);
            border-left: 10px solid rgb(168, 81, 13);
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
          }
        }

        &.tel-box {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;

          .tel {
            font-size: 30px;
            color: #ffffff;
          }

          .btn-more {
            cursor: pointer;
            margin-top: 25px;
            background-image: url("../assets/bg-home-btn.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
            width: 200px;
            height: 60px;
            text-align: center;
            color: #ffffff;
            font-size: 16px;
            line-height: 60px;
          }
        }
      }
    }

    .more {
      margin: 46px 0;
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
      }
    }

    /*.active {*/
      /*display: flex;*/
      /*justify-content: space-between;*/

      /*.item {*/
        /*width: calc(33.33333% - 12px);*/
        /*background-color: #ffffff;*/
        /*border: solid 1px #cccccc;*/
        /*cursor: pointer;*/

        /*.img {*/
          /*width: 100%;*/
          /*height: 240px;*/
          /*background-repeat: no-repeat;*/
          /*background-size: cover;*/
          /*background-position: center;*/
        /*}*/

        /*.item-cont {*/
          /*margin: 20px 20px 15px;*/

          /*h3 {*/
            /*font-size: 20px;*/
            /*text-align: justify;*/
            /*font-weight: normal;*/
            /*color: #333333;*/
            /*margin-bottom: 20px;*/
          /*}*/

          /*p {*/
            /*font-size: 14px;*/
            /*color: #666666;*/

            /*&.hove-right-tip {*/
              /*padding-right: 15px;*/
              /*box-sizing: border-box;*/
              /*background-image: url("../assets/icon-arrows-default.png");*/
              /*background-size: 10px 14px;*/
              /*background-position: right;*/
              /*background-repeat: no-repeat;*/
            /*}*/
          /*}*/
        /*}*/

        /*&:hover {*/
          /*background-color: #cf903a;*/

          /*.item-cont {*/
            /*h3 {*/
              /*color: #ffffff;*/
            /*}*/

            /*p {*/
              /*color: #ffffff;*/

              /*&.hove-right-tip {*/
                /*background-image: url("../assets/icon-arrows-selected.png");*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/

    .traffic {
      display: flex;
      background-color: #cf903a;
      padding: 40px 30px;
      box-sizing: border-box;
      margin-bottom: 30px;

      .map {
        flex-shrink: 0;
        width: 600px;
        height: 400px;
        background-color: #ffffff;
        margin-right: 24px;
        position: relative;

        .border-map {
          position: absolute;
          width: 100%;
          height: 47px;
          left: 0;
          z-index: 99;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;

          &.top {
            top: 0;
            background-image: url("../assets/bg-map-top.png");
          }

          &.bottom {
            bottom: 0;
            background-image: url("../assets/bg-map-bottom.png");
          }
        }

        .baidu-map {
          width: 100%;
          height: 100%;
        }
      }

      .cont {
        flex-grow: 1;
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        p {
          background-image: url("../assets/icon-arrows-selected.png");
          background-size: 10px 14px;
          background-repeat: no-repeat;
          background-position: left 9px;
          padding-left: 21px;
          font-size: 14px;
          color: #ffffff;
          line-height: 32px;
        }
      }
    }
  }
</style>
