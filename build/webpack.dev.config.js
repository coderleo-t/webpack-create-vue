const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const {resolve} = require('path')

module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    port: 3306,
    open: true,
    compress: true
  },
  devtool: 'eval-source-map',
  mode: 'development'
})