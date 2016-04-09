var webpack = require('webpack'),
    path = require('path');

module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      // Js files use babel loader
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
