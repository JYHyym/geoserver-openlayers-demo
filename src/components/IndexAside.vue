<!--
 * @LastEditors: yym
 * @Date: 2021-02-04 11:34:29
 * @LastEditTime: 2021-02-07 10:55:02
 * @Email: 15764302140@163.com
 * @Description: 左侧菜单栏
-->

<template>
  <div class="aside">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#111825"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">地图操作</span>
        </template>
        <el-menu-item-group>
          <span slot="title">地图操作</span>
          <el-menu-item index="1-1">查询点信息</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="地图展示">
          <el-menu-item index="1-2">散点图</el-menu-item>
          <el-menu-item index="1-3">矢量柱状图</el-menu-item>
          <el-menu-item index="1-4">矢量连线</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {isCollapse: true};
  },
  created() {},
  methods: {
    /**
     * @name: 打开菜单
     * @param {*} key
     * @param {*} keyPath
     * @return {*}
     */
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    /**
     * @name: 关闭菜单
     * @param {*} key
     * @param {*} keyPath
     * @return {*}
     */
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /**
     * @name: 选中菜单
     * @param {*} key
     * @param {*} keyPath
     * @return {*}
     */
    handleSelect(key, keyPath) {
      this.$store.dispatch('mapInfo/setSelectMenu', key);
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
// elementUI样式修改
::v-deep .el-menu {
  border: none;
}
::v-deep .el-submenu .el-menu-item:hover,
.el-menu-item.is-active {
  background-color: rgb(40, 50, 70) !important;
}
</style>
