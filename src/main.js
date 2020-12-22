import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// 隐秘文件挂载全局使用
import secret from './secret'

require('./style/common.scss');//引入公共样式
// 百度地图
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, { ak: secret.baidu_map_ak });
Vue.use(ViewUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

import config from './config'
import utils from './utils'

Vue.prototype.config = config;
Vue.prototype.utils = utils;

import Bg from './components/Bg'
import Crumb from './components/Crumb'
// 公共组件
Vue.component('background', Bg);
Vue.component('crumb', Crumb);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
