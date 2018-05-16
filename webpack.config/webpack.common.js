const path = require('path');
const webpack = require('webpack');
// const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

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
      'api': resolve('src/api'),
      'lib': resolve('src/lib'),
      'prismcss': 'prismjs/themes/prism.css',
      'prismless': 'prismjs/components/prism-less'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['happypack/loader?id=vue']
      },
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        use: ['happypack/loader?id=js']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=css']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['happypack/loader?id=less']
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
    new webpack.DllReferencePlugin({
      //这里写上一步打包出的json路径
      context: __dirname,
      manifest: require('../dist/dll/vue-manifest.json')
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist/css', 'dist/js', 'dist/fonts', 'dist/images', 'dist/index.html'], {root: resolve('/')}),
    new HtmlWebpackPlugin({
      favicon: resolve('src/assets/logo.ico'),
      template: 'index.html',
      inject: true,
      chunks: ['app'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new HappyPack({
      id: 'js',
      loaders: [{
        loader: 'babel-loader',
        options: { babelrc: true, cacheDirectory: true }
      }, 'eslint-loader'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'vue',
      loaders: ['vue-loader', 'eslint-loader'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'css',
      loaders: ['css-loader', 'postcss-loader'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'less',
      loaders: ['css-loader', 'postcss-loader', 'less-loader'],
      threadPool: happyThreadPool
    })
    // new PurifyCSSPlugin({ // 去除无用的css --> 经测试，去除了很多有用的css
    //   // 路径扫描 nodejs内置 路径检查
    //   paths: glob.sync(path.join(__dirname, 'src/*/*.html'))
    // })
  ]
};
