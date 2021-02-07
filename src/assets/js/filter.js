/*
 * @LastEditors: yym
 * @Date: 2021-02-07 14:25:10
 * @LastEditTime: 2021-02-07 14:30:08
 * @Email: 15764302140@163.com
 * @Description:
 */
export default {
  getMenu: function(val) {
    switch (val) {
      case '1-1':
        return '查询点信息';
      case '1-2':
        return '散点图';
      case '1-3':
        return '矢量图';
      case '1-4':
        return '矢量连线';
      default:
        break;
    }
  }
};
