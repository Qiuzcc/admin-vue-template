'use strict'
require('./check-versions')()         // 检查NodeJS和npm的版本

process.env.NODE_ENV = 'production'

const ora = require('ora')            //ora插件，实现node.js 命令行环境的 loading效果， 和显示各种状态的图标等
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')        // 用于在控制台输出带颜色字体的插件
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// rimraf插件，每次启动编译或者打包之前，先把整个dist文件夹删除，然后再重新生成dist
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
