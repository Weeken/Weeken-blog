const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    //这地方写你想抽离的包，可以参考你的package.json文件下的dependencies
    vue: [
      'vue/dist/vue.min.js',
      'vue-router/dist/vue-router.min.js',
      'axios/dist/axios.min.js'
    ]
  },
  output: {
    //这地方写你打包后生成文件的路径
    path: path.join(__dirname,"../dist/dll"),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins:[
    //这个插件是重点，用于打包上面entry里配置的包
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname,"../dist/dll",'[name]-manifest.json'),
      name: '[name]',
    })
  ]
}
