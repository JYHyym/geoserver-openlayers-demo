<!--
 * @LastEditors: yym
 * @Date: 2021-02-04 11:36:45
 * @LastEditTime: 2021-02-18 19:12:50
 * @Email: 15764302140@163.com
 * @Description: 内容
-->
<template>
  <div class="map-main">
    <p class="title">&gt;&nbsp;{{ selectMenu | getMenu }}</p>
    <div id="map" ref="rootmap"></div>

    <!-- 位置信息弹框 -->
    <location-info id="popup" :popupInfo="popupInfo">
      <div class="info" v-if="popupInfo.data && popupInfo.data.features && popupInfo.data.features.length > 0">
        <ul v-for="(item, index) in popupInfo.data.features" :key="index" class="item-info">
          <li v-for="(value, key, e) in item.properties" :key="e">
            <label>{{ key }}:</label>&nbsp;
            <span>{{ value }}</span>
          </li>
        </ul>
      </div>
    </location-info>
  </div>
</template>

<script>
import filters from '@/assets/js/filter';
import {mapState} from 'vuex';
import mapconfig from '@/geoserver/mapconfig';
import {Map, View, Overlay} from 'ol';
// import {transform} from 'ol/proj'
export default {
  filters: filters,
  data() {
    return {
      map: null,
      view: null,
      popupInfo: {
        // 位置信息
      }
    };
  },
  computed: {
    ...mapState({
      selectMenu: state => state.mapInfo.selectMenu
    })
  },
  methods: {
    /**
     * @name: 初始化地图
     */
    initMap() {
      this.view = new View({
        center: mapconfig.center,
        projection: mapconfig.projection,
        zoom: mapconfig.zoom
      });
      this.map = new Map({
        target: 'map',
        layers: mapconfig.streetmap(),
        view: this.view
      });
      this.getClickInfo();
    },

    /**
     * @name: 获取鼠标点击位置信息
     */
    getClickInfo() {
      const that = this;
      let popupCloser = document.getElementById('popup-closer');
      let container = document.getElementById('popup');
      let overlay = new Overlay({
        element: container,
        autoPan: true
      });
      this.map.on('click', async function(e) {
        // 获取点击geoserver数据
        let viewResolution = /** @type {number} */ (that.view.getResolution());
        let url = that.map
          .getLayers()
          .array_[0].getSource()
          .getFeatureInfoUrl(e.coordinate, viewResolution, 'EPSG:4326', {
            INFO_FORMAT: 'application/json', // 'text/html',
            FEATURE_COUNT: 50
          });

        // 请求地图数据
        if (url) {
          try {
            let res = await that.axios.get(url);
            that.popupInfo = res;
            overlay.setPosition(e.coordinate_);
            that.map.addOverlay(overlay);
          } catch (e) {
            console.log('error:', e);
          }
        }
      });

      // 隐藏位置信息弹框
      popupCloser.addEventListener('click', function() {
        overlay.setPosition(undefined);
      });

      //设置icon
      //创建空的矢量容器(point)
      // var vectorSource = new VectorSource({});
      // //创建图标层
      // var vectorLayer = new VectorLayer({
      //   source: vectorSource
      // });
      // this.map.addLayer(vectorLayer);
      // let poi = [];
      // data.data.forEach((item, index) => {
      //   item.coord = item.jwd;
      //   // fromLonLat像素点转经纬度
      //   // console.log(fromLonLat(item.coord));
      //   poi.push(new Feature(new Point(fromLonLat(item.coord))));
      //   poi[index].set('name', item.name);
      //   poi[index].set('value', item.value);
      //   poi[index].set('id', item.id);

      //   let bdStyle = new Style({
      //     image: new CircleStyle({
      //       fill: new Fill({
      //         color: [128, 0, 128]
      //       }),
      //       radius: 6
      //     })
      //   });

      //   poi[index].setStyle(bdStyle);
      // });
      // poi.sort(function(a, b) {
      //   return b.get('value') - a.get('value');
      // });
      // poi.forEach((item, index) => {
      //   vectorSource.addFeature(item);
      // });
    }
  },
  created() {},
  mounted() {
    this.initMap();
  }
};
</script>

<style lang="scss" scoped>
.map-main {
  position: relative;

  .title {
    margin-bottom: 0.2rem;
    @include titleStyle;
  }

  /* 地图 */
  #map {
    position: absolute;
    height: calc(100vh - 1rem);
    width: 100%;

    .info {
      height: 2rem;
      overflow-y: scroll;

      .item-info {
        @include borderStyle;
        margin: 0.1rem 0.2rem 0 0.1rem;

        label {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
