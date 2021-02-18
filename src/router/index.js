/*
 * @LastEditors: yym
 * @Date: 2021-02-02 16:08:58
 * @LastEditTime: 2021-02-04 11:11:13
 * @Email: 15764302140@163.com
 * @Description:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import '@/views/Index';
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Index.vue'),
    meta: {title: '首页'}
  }
];

const router = new VueRouter({
  routes
});

export default router;
