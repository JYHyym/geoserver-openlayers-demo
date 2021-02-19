<!--
 * @LastEditors: yym
 * @Date: 2021-02-04 11:36:45
 * @LastEditTime: 2021-02-19 18:31:35
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
import {getVectorContext} from 'ol/render';
import {easeOut} from 'ol/easing';
import {Style, Stroke, Fill, RegularShape, Circle as CircleStyle, Icon} from 'ol/style';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import {fromLonLat, transform} from 'ol/proj';
import data from '@/assets/js/scatter';
import GeoJSON from 'ol/format/GeoJSON';

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
        // center: mapconfig.center,
        center: transform(mapconfig.center, 'EPSG:4326', 'EPSG:3857'),
        // projection: mapconfig.projection,
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

      // 获取点击geoserver数据
      this.map.on('click', async function(e) {
        let viewResolution = /** @type {number} */ (that.view.getResolution());
        let url = that.map
          .getLayers()
          .array_[0].getSource()
          .getFeatureInfoUrl(e.coordinate, viewResolution, 'EPSG:3857', {
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

      this.showPoint();
      // this.showCube();
    },

    /**
     * @name: 动态散点
     */
    scatterPoint(poi, vectorLayer, vectorSource) {
      let that = this;
      let duration = 2000;
      let n = 3;
      let flashGeom = new Array(5 * n);
      vectorLayer.on('postrender', evt => {
        var vc = getVectorContext(evt);
        var frameState = evt.frameState;
        poi.forEach((item, index) => {
          vc.drawFeature(item, item.getStyle());
        });

        // 为值是前五的要素添加扩散动效
        for (var i = 0; i < 5; i++) {
          for (var j = 0; j < n; j++) {
            if (flashGeom[j + i * n] == undefined) flashGeom[j + i * n] = poi[i].clone();
            if (flashGeom[j + i * n].get('start') == undefined)
              flashGeom[j + i * n].set('start', new Date().getTime() + 600 * j);

            var elapsed = frameState.time - flashGeom[j + i * n].get('start');
            if (elapsed >= duration) {
              flashGeom[j + i * n].set('start', flashGeom[j + i * n].get('start') + duration);
              elapsed = 0;
            }

            var elapsedRatio = elapsed / duration;
            elapsedRatio = elapsedRatio > 0 ? elapsedRatio : 0;
            elapsedRatio = elapsedRatio > 1 ? elapsedRatio - 1 : elapsedRatio;

            var radius = (easeOut(elapsedRatio) * flashGeom[j + i * n].get('value')) / 7;
            radius = radius > 0 ? radius : 0;
            var opacity = easeOut(1 - elapsedRatio * 1.3);
            var style = new Style({
              image: new CircleStyle({
                radius: radius,
                stroke: new Stroke({
                  color: 'rgba(128, 0, 128, ' + opacity + ')',
                  width: 0.1 + opacity
                })
              })
            });
            vc.drawFeature(flashGeom[j + i * n], style);
          }
        }
        that.map.render();
      });
    },

    /**
     * @name: 散点图层
     */
    showPoint() {
      //设置icon
      //创建空的矢量容器
      var vectorSource = new VectorSource({});
      //创建图标层
      var vectorLayer = new VectorLayer({
        source: vectorSource
      });
      this.map.addLayer(vectorLayer);
      let poi = [];
      data.data.forEach((item, index) => {
        item.coord = data.geoCoordMap[item.name];
        poi.push(new Feature(new Point(fromLonLat(item.coord))));
        poi[index].set('name', item.name);
        poi[index].set('value', item.value);
        poi[index].set('id', item.id);

        let bdStyle = new Style({
          image: new CircleStyle({
            fill: new Fill({
              color: [128, 0, 128]
            }),
            radius: item.value / 20
          })
        });
        poi[index].setStyle(bdStyle);
      });
      poi.sort(function(a, b) {
        return b.get('value') - a.get('value');
      });
      poi.forEach((item, index) => {
        vectorSource.addFeature(item);
      });
      vectorLayer.setSource(vectorSource);

      this.scatterPoint(poi, vectorLayer, vectorSource);
    },

    /**
     * @name: 柱状图展示
     */
    showCube() {
      let square = [];
      let geojsonObject = {
        type: 'FeatureCollection',
        crs: {
          type: 'name',
          properties: {
            name: 'EPSG:3857'
          }
        },
        features: []
      };
      let styles = [];

      data.cubeData.forEach((item, index) => {
        let left = data.formatNum(item.coord[0], 2);
        let right = data.formatNum(item.coord[1], 2);
        item.coord = [left, right]; // fromLonLat像素点转经纬度
        square.push(new Feature(new Point(fromLonLat(item.coord))));
        let leftCoord = square[index].geometryChangeKey_.target.flatCoordinates[0]; // 经度
        let rightCoord = square[index].geometryChangeKey_.target.flatCoordinates[1]; // 纬度
        let bdStyle = new Style({
          text: new Text({
            text: `预测精度: ${item.rateValue}%`,
            font: 'bold 0.10rem 微软雅黑 ',
            fill: new Fill({
              color: 'rgba(0, 128, 0, 1)'
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 3
            }),
            offsetX: 0,
            offsetY: 0 //调整相对位置
          })
        });
        square[index].setStyle(bdStyle);
        styles.push(
          new Style({
            stroke: new Stroke({
              color: 'rgba(255, 255, 255, 0.6)',
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(0, 128, 0, 0.25)'
            })
          })
        );

        let height = data.formatNum(item.rateValue / 250, 2);
        geojsonObject.features.push({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [leftCoord - 0.05e6, rightCoord],
                [leftCoord - 0.05e6, rightCoord + Number(`${height}e6`)],
                [leftCoord, rightCoord + Number(`${height}e6`)],
                [leftCoord, rightCoord],
                [leftCoord - 0.05e6, rightCoord]
              ]
            ]
          },
          properties: {
            name: item.name,
            value: item.value,
            rateValue: item.rateValue
          }
        });
        square[index].type = 'FeatureCollection';

        // }
      });

      square.sort(function(a, b) {
        return b.get('value') - a.get('value');
      });

      // console.log('square:', square);
      // console.log('geojsonObject:', geojsonObject);
      //创建空的矢量容器(矩形)
      var vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject)
      });

      //创建图标层
      var vectorLayer = new VectorLayer({
        source: vectorSource,
        style: styles
      });

      square.forEach((item, index) => {
        vectorSource.addFeature(item);
      });

      this.map.addLayer(vectorLayer);
      console.log(this.map.getLayers().array_);
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
