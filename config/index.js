'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  // 开发过程中使用的配置
  dev: {

    // Paths
    assetsSubDirectory: 'static', // webpack编译输出的二级文件夹
    assetsPublicPath: '/',        // webpack编译输出的发布路径
    proxyTable: {},               // 请求代理表，在这里可以配置特定的请求代理到对应的API接口,例如将'/api/xxx'代理到'www.example.com/api/xxx'(并不知道怎么用)

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,  // 启动dev-server之后自动打开浏览器。默认值为false，被我修改为true了
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  // 构建产品时使用的配置
  build: {
    // Template for index.html，编译输入的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), // webpack输出的目标文件夹路径
    assetsSubDirectory: 'static',                   // webpack编译输出的二级文件夹
    assetsPublicPath: '/',                          // webpack编译输出的发布路径

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // 类似于索引表的东西，官方文档是这么解释的：
    // source-map - A full SourceMap is emitted as a separate file. 
    // It adds a reference comment to the bundle so development tools know where to find it.

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认不打开gzip模式，以及该模式下需要压缩的文件名
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
