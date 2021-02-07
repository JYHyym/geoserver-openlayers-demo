/*
 * @LastEditors: yym
 * @Date: 2021-02-01 16:23:08
 * @LastEditTime: 2021-02-05 18:09:59
 * @Email: 15764302140@163.com
 * @Description:
 */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const defaultSettings = require('./src/config/index.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// page title
// const name = defaultSettings.title || 'geoserver + openlayer6 + vue2 Demo';
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ElementUI'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/element-ui@2.15.0/lib/theme-chalk/index.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.0/lib/index.js'
    ]
  }
}

//引入gzip插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
//匹配此 {RegExp} 的资源
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  publicPath: './', // 公共路径
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: process.env.NODE_ENV !== 'production',
  //   filenameHashing: true,
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: 'localhost',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      // 配置多个跨域
      '/default': {
        target: 'http://xxxxxxxxxxxx',
        changeOrigin: true,
        // ws: true,//websocket支持
        // secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/default': ''
        }
      },
      '/map': {
        // 地图跨域配置
        target: 'https://ahocevar.com',
        changeOrigin: true,
        logLevel: 'debug',
        // ws: true,//websocket支持
        // secure: false,
        pathRewrite: {
          '^/map': ''
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    extract: IS_PROD, // 是否使用css分离插件 ExtractTextPlugin  IS_PROD
    sourceMap: false,
    requireModuleExtension: true,
    // css预设器配置项
    loaderOptions: {
      css: {
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        // '[path][name]-[local]-[hash:5]'
        modules: {
          localIdentName: '[path][name]-[local]-[hash:5]'
        },
        localsConvention: 'camelCaseOnly'
      }
      // scss: {
      //   // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
      //   // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
      //   additionalData: `
      //     @import "./src/assets/css/index";
      //     @import "./src/assets/css/mixin";
      //     @import "./src/assets/css/variables";
      //     $cdn: "${defaultSettings.$cdn}"
      //   `
      // }
    }
  },

  configureWebpack: config => {
    config.name = 'geoserver + openlayer6 + vue2 Demo'

    // 为生产环境修改配置...
    if (IS_PROD) {
      // externals 生产环境下不需要打包的资源：
      config.externals = externals
    }

    // gzip打包
    const plugins = []
    // start 生成 gzip 压缩文件
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path][base].gz', //目标资源名称
        algorithm: 'gzip',
        test: productionGzipExtensions, //处理所有匹配此 {RegExp} 的资源
        threshold: 10240, //只处理比这个值大的资源。按字节计算(楼主设置10K以上进行压缩)
        minRatio: 0.8 //只有压缩率比这个值小的资源才会被处理
      })
    )

    // End 生成 gzip 压缩文件
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap(args => {
      if (IS_PROD) {
        args[0].cdn = cdn.build //  => htmlWebpackPlugin.options.cdn.css
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
    /**
     * 打包分析
     */
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  },
  // 第三方插件
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: resolve('src/assets/css/index.scss') // 引入全局样式变量
    }
  }
}
