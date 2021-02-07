<!--
 * @LastEditors: yym
 * @Date: 2021-02-04 11:36:45
 * @LastEditTime: 2021-02-07 16:50:13
 * @Email: 15764302140@163.com
 * @Description: 内容
-->
<template>
  <div class="map-main">
    <p class="title">&gt; &nbsp; {{ selectMenu | getMenu }}</p>
    <location-info :popupInfo="popupInfo" id="popup"></location-info>
    <div id="map" ref="rootmap"></div>
    <!-- <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-title" class="popup-title">
        通过能力瓶颈位置
      </div>
      <div id="popup-content" class="popup-content">
        <div class="map-form-item">
          <label class="map-label">所属时段：</label>
          <el-input
            v-model="mapInfo.timeRange"
            disabled
            class="map-input"
          ></el-input>
        </div>

        <div class="map-form-item">
          <label class="map-label">所属区间：</label>
          <el-input
            v-model="mapInfo.lineRange"
            disabled
            class="map-input"
          ></el-input>
        </div>

        <div class="map-form-item">
          <label class="map-label">非正常事件类型：</label>
          <el-input
            v-model="mapInfo.sceneType"
            disabled
            class="map-input"
          ></el-input>
        </div>

        <div class="map-form-item">
          <label class="map-label">通过能力值：</label>
          <el-input
            v-model="mapInfo.passPower"
            disabled
            class="map-input"
          ></el-input>
        </div>

        <div class="map-button">
          <el-button type="primary" style="height:28px" @click="exportInfo"
            ><i class="el-icon-download"></i>&nbsp;导出</el-button
          >
          <el-button type="primary" style="height:28px" @click="uploadInfo"
            ><i class="el-icon-refresh"></i>&nbsp;同步</el-button
          >
        </div>

        <div
          class="chart-number charts-set"
          :id="`mapChartId${mapInfo.id}`"
        ></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import filters from '@/assets/js/filter';
import {mapState} from 'vuex';
import mapconfig from '@/geoserver/mapconfig';
import 'ol/ol.css';
import {Map, View, Overlay} from 'ol';

// import {transform} from 'ol/proj'
export default {
  filters: filters,
  data() {
    return {
      map: null, // 地图对象
      view: null, // 地图视图
      popupInfo: {
        // 点击位置信息
        isPopup: false
      }
    };
  },
  computed: {
    ...mapState({
      selectMenu: state => state.mapInfo.selectMenu
    })
  },
  watch: {},

  methods: {
    /**
     * @name: 初始化地图
     * @param {*}
     * @return {*}
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
     * @param {*}
     * @return {*}
     */
    getClickInfo() {
      const that = this;

      this.map.on('click', async function(e) {
        var container = document.getElementById('popup');
        console.log(container);
        // var content = document.getElementById('popup-content');
        // var popupCloser = document.getElementById('popup-closer');
        var overlay = new Overlay({
          element: container,
          autoPan: true
        });
        that.$set(that.popupInfo, 'isPopup', true);
        // that.popupInfo.isPopup = true;
        console.log(that.popupInfo);
        // 获取点击geoserver数据
        let viewResolution = /** @type {number} */ (that.view.getResolution());
        let url = that.map
          .getLayers()
          .array_[0].getSource()
          .getFeatureInfoUrl(e.coordinate, viewResolution, 'EPSG:4326', {
            INFO_FORMAT: 'application/json',
            FEATURE_COUNT: 50
          });
        let url2 = that.map
          .getLayers()
          .array_[0].getSource()
          .getFeatureInfoUrl(e.coordinate, viewResolution, 'EPSG:4326', {
            INFO_FORMAT: 'text/html',
            FEATURE_COUNT: 50
          });
        let res2 = await that.axios.get(url2);
        console.log(res2);

        if (url) {
          try {
            let res = await that.axios.get(url);
            console.log(res);
            // for (let i = 0; i < res.data.features.length; i++) {
            //   if (res.data.features[i].id.includes('roadnet')) {
            //     that.roadnetInfo = res.data.features[i].properties;
            //     overlay.setPosition(e.coordinate_);
            //     that.map.addOverlay(overlay);
            //   }
            // }
            console.log(e.coordinate, '\n', e.coordinate_);
            overlay.setPosition(e.coordinate);
            that.map.addOverlay(overlay);
            // console.log(res2.data);
          } catch (e) {
            console.log('error:', e);
          }
        }
      });

      // popupCloser.addEventListener('click', function() {
      //   overlay.setPosition(undefined);
      // });

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
  }
}
</style>
