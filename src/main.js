/*
 * @LastEditors: yym
 * @Date: 2021-02-02 16:08:58
 * @LastEditTime: 2021-02-04 11:31:17
 * @Email: 15764302140@163.com
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import '@/assets/css/index.scss'
// 设置 js中可以访问 $cdn
import {$cdn} from '@/config'
Vue.prototype.$cdn = $cdn
Vue.prototype.axios = axios
Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV)
  let ElementUI = require('element-ui')
  require('element-ui/lib/theme-chalk/index.css')
  Vue.use(ElementUI)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
