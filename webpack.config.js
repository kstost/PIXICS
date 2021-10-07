const webpack = require('webpack');  
module.exports = {
  devtool: 'source-map',
  entry: './editor.js',
  output: {
    filename: "bundle.js",
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false,
    //   },
    // })
  ],
  module: {
    // loaders: [{
    //   test: /\.js$/,
    //   loader: 'babel',
    //   exclude: /(node_modules|bower_components)/
    // }]
  }
};

