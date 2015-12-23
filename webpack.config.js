var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['webpack-dev-server/client?http://localhost:3000','webpack/hot/only-dev-server','./app/main.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: path.join(__dirname, 'app'),
        query: {
          presets: 'es2015',
        },
      }
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'eval!source-map',
};
