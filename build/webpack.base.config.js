const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: resolve(__dirname, '../src/main.js'),
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  safari: '10',
                  ie: '9',
                  edge: '17',
                }
              }
            ]
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssPresetEnv()
                  ]
                }
              }
            ]
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              esModule: false,
              name: '[hash:10].[ext]',
              outputPath: 'assets/img'
            }
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            include: resolve(__dirname, '../src'),
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      }
    ]
  },
  resolve: {  
    extensions: ['.js', '.css', '.vue'],
    modules: [resolve(__dirname, '../'), 'node_modules'],
    alias: {
      '@': resolve(__dirname, '../src'),
      'components': resolve(__dirname, '../src/components'),
      'network': resolve(__dirname, '../src/network'),
      'assets': resolve(__dirname, '../src/assets'),
      'util': resolve(__dirname, '../src/util'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/base.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html')
    }),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, '../dist/dll/manifest.json')
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, '../dist/dll/vue.js')
    })
  ]
}