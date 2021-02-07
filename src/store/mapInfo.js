/*
 * @LastEditors: yym
 * @Date: 2021-02-06 15:49:03
 * @LastEditTime: 2021-02-07 14:30:42
 * @Email: 15764302140@163.com
 * @Description:
 */
const mapInfo = {
  namespaced: true, // 这里是解决不同模块命名冲突的问题,但是所有数据都还在一个挂载点上
  state: {
    selectMenu: '1-1'
  },
  actions: {
    setSelectMenu: ({commit}, val) => {
      commit('setSelectMenu', {val: val});
    }
  },
  mutations: {
    setSelectMenu: (state, {val}) => {
      state.selectMenu = val;
    }
  },
  getters: {
    selectMenu: state => state.selectMenu
  }
};
export default mapInfo;
