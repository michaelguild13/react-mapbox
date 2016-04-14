// https://webpack.github.io/docs/webpack-dev-server.html
var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs');

// Don't include nodeModules
// We need this so that webpack-dev-server doesn't complain when compiling
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
  });
//console.log('Node Modules: '+ JSON.stringify(nodeModules));

module.exports = {
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
