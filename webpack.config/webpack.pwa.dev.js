const dev = require('./webpack.dev.js');
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(dev, {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ]
});
