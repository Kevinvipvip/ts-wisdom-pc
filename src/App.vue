<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    components: {
      Header,
      Footer
    },
    mounted() {
      // //判断是否手机端访问
      // let userAgentInfo = navigator.userAgent.toLowerCase();
      // let Agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
      // let ly = document.referrer;  //返回导航到当前网页的超链接所在网页的URL
      //
      // console.log(userAgentInfo)
      // console.log(Agents)
      // console.log(ly)
      // console.log(userAgentInfo.indexOf(Agents[4]) >= 0)
      //
      // // for (var v = 0; v < Agents.length; v++) {
      // //   if (userAgentInfo.indexOf(Agents[v]) >= 0&&(ly==""||ly==null)) {
      // //     this.location.href='http://m.***.com';  //wap端地址
      // //   }
      // // }
    }
  }
</script>
