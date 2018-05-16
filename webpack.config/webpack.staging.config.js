const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js',
      'vue-router$': 'vue-router/dist/vue-router.min.js',
      'axios': 'axios/dist/axios.min.js'
    }
  },
  output: {
    publicPath: '/'
  },
  stats: {
    entrypoints: false,
    children: false
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: 4,
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('staging')
    })
  ]
});
