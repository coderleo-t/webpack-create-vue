const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseConfig, {
  devtool: 'nosource-cheap-module-source-map',
  mode: 'production'
})
