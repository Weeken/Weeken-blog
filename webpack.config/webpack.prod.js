const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js',
    }
  }
});
