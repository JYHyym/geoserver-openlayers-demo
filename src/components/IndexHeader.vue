<!--
 * @LastEditors: yym
 * @Date: 2021-02-04 11:36:06
 * @LastEditTime: 2021-02-05 15:35:26
 * @Email: 15764302140@163.com
 * @Description: 头部
-->
<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    /**
     * @name: 修改主题颜色
     * @param {*} theme
     * @return {*}
     */
    changeTheme(theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 18px;
  height: 0.6rem;
  background: rgb(17, 24, 37);
  .header-right {
    height: 0.6rem;
    width: 0.6rem;
  }
}
</style>
