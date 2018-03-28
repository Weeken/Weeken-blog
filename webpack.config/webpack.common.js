const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

process.traceDeprecation = true

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: resolve('dist')
  },
  resolve: {
    modules: [resolve('node_modules')],
    extensions: ['.js', '.vue'],
    mainFields: ['jsnext:main','main'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'src' : resolve('src'),
      '@': resolve('src/'),
      'components': resolve('src/components'),
      'css': resolve('src/css'),
      'pages': resolve('src/pages'),
      'images': resolve('src/assets/images')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'postcss-loader', 'less-loader' ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // 全局使用什么变量 = 自动注入什么模块
    // new webpack.ProvidePlugin({
    //   Vue: ['vue/dist/vue.esm.js', 'default'],
    //   axios: 'axios',
    //   notie: 'notie'
    // }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist'], {root: resolve('/')}), // 清理dist目录
    new HtmlWebpackPlugin({
      favicon: resolve('src/assets/logo.ico'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
