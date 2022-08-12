'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// 给出正确的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径，所以这里就是/build目录
// path.join的作用是把所有参数依次连接成一个路径
// 所以resolve(dir)返回的结果就是/public/../dir，相当于/dir，dir作为根目录下第一级目录


module.exports = {
  context: path.resolve(__dirname, '../'),

  // 配置webpack编译入口
  entry: {
    app: './src/main.js'
  },

  // 配置webpack输出路径和命名规则
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',

    // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

  // 配置模块resolve的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],   // 自动resolve的扩展名
    alias: {                                // 创建路径别名，有了别名之后引用模块更方便
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },

  // 配置不同类型模块的处理规则
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
