<!--
 * @LastEditors: yym
 * @Date: 2021-02-07 14:55:58
 * @LastEditTime: 2021-02-07 15:56:49
 * @Email: 15764302140@163.com
 * @Description: 点击地图展示位置信息框组件
-->
<template>
  <div class="location-info">
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-title" class=" title">
        位置信息
      </div>
      <div id="popup-content" class="popup-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'location-info',
  props: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.location-info {
  position: relative;
  background: #ffffff;

  .ol-popup {
    .title {
      @include titleStyle;
    }
  }
}
</style>
