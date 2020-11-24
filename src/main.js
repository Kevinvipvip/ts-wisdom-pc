import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

require('./style/common.scss');//引入公共样式

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

import config from './config'
import utils from './utils'

Vue.prototype.config = config;
Vue.prototype.utils = utils;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
