<template>
  <div class="about page">
    <background :bg_num="2">
      <div class="cont">
        <crumb/>
        <div class="title"><h3>唐博概况</h3></div>

        <div class="brief">
          <p>唐山博物馆系地市级综合性博物馆，隶属于唐山市文化广电和旅游局，位于唐山市龙泽南路22号，凤凰山公园内。</p>
          <p>
            唐山博物馆成立于1996年，是在纪念唐山抗震20周年之际，由唐山市展览馆的南馆改建而成。2009年唐山博物馆改扩建，改扩建建筑面积24000多平方米，展厅面积约12000平方米，占地73亩。由老馆和新馆共同组成，是5个互相连接的单体分馆，称之为A、B、C、D、E馆。其中，三座旧馆建于1968年，原为“毛泽东思想万岁展览馆”，建筑非常有特色，仿天安门广场布局，成“品”字形结构，西馆仿天安门、南馆仿人民大会堂、北馆仿中国历史博物馆，当时的浮雕和标语依然保留，具有鲜明的时代特色。同时，老馆还经历过1976年唐山大地震，是至今仍在使用的地震遗址。另外扩建的新馆，外观为玻璃幕墙，与老馆风格上形成对比。</p>
          <p>
            新馆、老馆共同坐落在凤凰山脚下，以山为背景，形成“品”字型建筑群，环抱着10000平方米的文化广场，广场上矗立着建于1968年的毛泽东主席挥手立像。在功能划分上，A馆展示以唐山皮影、评剧、乐亭大鼓为主要内容的《冀东三枝花》陈列；B馆《唐山历史》陈列展示唐山开始出现人类到因煤兴市数万年的发展历程；C馆《馆藏艺术品》陈列展示唐山博物馆接收的书法、绘画、雕塑等捐赠作品；D馆设有学术报告厅、专业图书资料室、公共功能空间、办公区等；E馆为临时场馆，还专门设置了青少年实践厅、乐博学堂。唐山博物馆常设展览主要有《冀东三枝花》《唐山历史》和《馆藏艺术品》。《冀东三枝花》陈列由《唐山皮影》、《评剧百年》《乐亭大鼓》三部分组成。除常设展览外，唐山博物馆每年都会举办一系列类型多样的临时展览并积极开展馆际交流。</p>
          <p> 唐山博物馆目前为国家二级博物馆、河北省爱国主义教育基地、中国博物馆协会理事单位、河北省博物馆协会陈列展览委员会主任委员单位。</p>
        </div>

        <div class="img"><img :src="img"/></div>
      </div>
    </background>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.config.aliyun + 'ts-static/pc/about/img-about.png'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .about {
    .cont {
      .brief {
        p {
          text-align: justify;
          text-indent: 2em;
          line-height: 26px;
          font-size: 16px;
          color: #666666;
          margin-bottom: 10px;
        }
      }

      .img {
        width: 100%;
        height: 305px;
        margin-top: 39px;
      }
    }
  }
</style>
