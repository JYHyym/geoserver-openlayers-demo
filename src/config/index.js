/*
 * @LastEditors: yym
 * @Date: 2021-02-02 17:30:01
 * @LastEditTime: 2021-02-17 15:36:26
 * @Email: 15764302140@163.com
 * @Description:
 */
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./env.' + process.env.VUE_APP_ENV);
// console.log(process.env.VUE_APP_ENV)
module.exports = config;
