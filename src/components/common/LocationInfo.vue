<!--
 * @LastEditors: yym
 * @Date: 2021-02-07 14:55:58
 * @LastEditTime: 2021-02-15 16:13:32
 * @Email: 15764302140@163.com
 * @Description: 点击地图展示位置信息框组件
-->
<template>
  <div class="location-info">
    <div class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div class=" title">
        位置信息
      </div>
      <div class="popup-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'location-info',
  props: {popupInfo: Object},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.location-info {
  .ol-popup {
    display: block;
    position: absolute;
    padding: 0.1rem;
    background-color: white;
    color: #414b57;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    width: 3.5rem;

    .title {
      @include titleStyle;
      @include borderStyle;
      padding-bottom: 0.04rem;
    }

    .ol-popup-closer {
      text-decoration: none;
      position: absolute;
      top: 0.04rem;
      right: 0.1rem;
    }

    .ol-popup-closer:after {
      content: '×';
      color: #4285f4;
      font-size: 0.2rem;
      font-weight: 600;
    }
  }

  .ol-popup:after,
  .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }

  .ol-zoom.ol-unselectable.ol-control {
    display: none;
  }
}
</style>
