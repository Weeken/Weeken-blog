const prod = require('./webpack.prod.config.js');
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(prod, {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      // runtimeCaching: [{
      //   urlPattern: new RegExp('https://hacker-news.firebaseio.com'),
      //   handler: 'staleWhileRevalidate'
      // }]
    })
  ]
});
