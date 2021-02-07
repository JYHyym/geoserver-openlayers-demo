<!--
 * @LastEditors: yym
 * @Date: 2021-02-04 10:29:14
 * @LastEditTime: 2021-02-05 16:01:47
 * @Email: 15764302140@163.com
 * @Description: 主框架
-->
<template>
  <div class="index">
    <el-container>
      <el-aside><IndexAside></IndexAside></el-aside>
      <el-container>
        <el-header><IndexHeader></IndexHeader></el-header>
        <el-main><IndexMain></IndexMain></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {IndexAside, IndexHeader, IndexMain} from '../components'
export default {
  components: {
    IndexAside,
    IndexHeader,
    IndexMain
  },
  data() {
    return {}
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.el-container {
  height: 100vh;
}
.el-aside {
  background: #111825;
  border-right: solid 1px #e6e6e6;
}
</style>
