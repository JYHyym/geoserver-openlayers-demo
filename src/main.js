/*
 * @LastEditors: yym
 * @Date: 2021-02-02 16:08:58
 * @LastEditTime: 2021-02-18 19:13:03
 * @Email: 15764302140@163.com
 * @Description:
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import MyUI from '@/components/common';

// 设置 js中可以访问 $cdn
import {$cdn} from '@/config';
Vue.prototype.$cdn = $cdn;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

// 自定义的公共组件
Vue.mixin(MyUI);

import 'ol/ol.css';
// import {Map, View, Overlay} from 'ol';
// let ol = {Map, View, Overlay};
// Vue.prototype.ol = ol;

// 开发环境引入element组件依赖，生产环境引入cdn
if (process.env.NODE_ENV === 'development') {
  let ElementUI = require('element-ui');
  require('element-ui/lib/theme-chalk/index.css');
  Vue.use(ElementUI);

  // let ol = require('ol');
  // require('ol/ol.css');
  // Vue.prototype.ol = ol;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
