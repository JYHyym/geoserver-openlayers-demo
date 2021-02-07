/*
 * @Descripttion:
 * @version:
 * @Author: zhuLi
 * @Date: 2020-09-08 09:49:52
 * @LastEditors: yym
 * @LastEditTime: 2021-02-05 18:21:59
 */
import TileLayer from 'ol/layer/Tile'
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'
import Image from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'

let maptype = 3 //0表示部署的离线瓦片地图，1表示OSM,2表示使用Arcgis在线午夜蓝地图服务,3表示使用GeoServer发布的服务

var streetmap = function() {
  var maplayer = null
  switch (maptype) {
    case 0:
      maplayer = new TileLayer({
        source: new XYZ({
          url: 'http://xxxxxxxxxx'
        })
      })
      break
    case 1:
      maplayer = new TileLayer({
        source: new OSM()
      })
      break
    case 2:
      maplayer = new TileLayer({
        source: new TileArcGISRest({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
        })
      })
      break
    case 3:
      maplayer = new Image({
        source: new ImageWMS({
          url: '/map/geoserver/wms', //geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=topp%3Astates&TILED=true&WIDTH=256&HEIGHT=256&CRS=EPSG%3A4326&STYLES=&BBOX=33.75%2C-146.25%2C45%2C-135
          ratio: 1,
          params: {
            LAYERS: 'topp:states', // geoserver配置的layers名称，一定要改！！！
            VERSION: '1.3.0',
            FORMAT: 'image/png'
          },
          serverType: 'geoserver'
        })
      })
      break
  }
  return [maplayer]
}

var mapconfig = {
  center: [-101.44058, 39.816105], //中心点经度和纬度
  zoom: 5, //地图缩放级别
  streetmap: streetmap,
  projection: 'EPSG:4326'
}

export default mapconfig
