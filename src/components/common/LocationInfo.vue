<!--
 * @LastEditors: yym
 * @Date: 2021-02-07 14:55:58
 * @LastEditTime: 2021-02-07 18:37:13
 * @Email: 15764302140@163.com
 * @Description: 点击地图展示位置信息框组件
-->
<template>
  <div class="location-info" v-if="popupInfo.isPopup">
    <div class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer" @click="closePopup"></a>
      <div id="popup-title" class="title">
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
  props: {popupInfo: Object},
  data() {
    return {};
  },

  methods: {
    /**
     * @name: 关闭popup
     * @param {*}
     * @return {*}
     */
    closePopup() {
      this.$set(this.popupInfo, 'isPopup', false);
    }
  },
  created() {}
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

  .ol-popup {
    display: block;
    position: absolute;
    background-color: white;
    color: #414b57;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    height: 2.6rem;
    width: 4.5rem;
    .popup-title {
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #cccccc;
      padding: 0.1rem 0.2rem;
    }
    .popup-content {
      position: relative;
      padding: 0.1rem 0.4rem;
      height: 2rem;

      .map-form-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 0.1rem 0;

        .map-label {
          width: 1.7rem;
        }
      }
      .map-button {
        float: right;
        i {
          color: #ffffff;
        }
      }

      .chart-number {
        width: 100%;
        height: 100%;
      }
      .data-show {
        display: inline-block;
        margin-right: 40px;
      }
      i {
        color: #e44323;
      }
    }
    .ol-popup-closer {
      text-decoration: none;
      position: absolute;
      top: 0.06rem;
      right: 0.2rem;
    }
    .ol-popup-closer:after {
      content: '✖';
      color: #4285f4;
      font-size: 0.2rem;
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
